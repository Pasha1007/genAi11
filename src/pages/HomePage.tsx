import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Plus, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { getMeetings } from '../lib/api';
import { Meeting, MeetingStatus } from '../lib/database.types';
import { formatDate } from '../utils/formatters';

export const HomePage: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const data = await getMeetings();
        setMeetings(data);
      } catch (error) {
        console.error('Error fetching meetings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMeetings();
  }, []);
  
  // Calculate some metrics
  const todayMeetings = meetings.filter(m => {
    const meetingDate = new Date(m.arranged_time);
    const today = new Date();
    return meetingDate.toDateString() === today.toDateString();
  });
  
  const upcomingMeetings = meetings.filter(m => {
    const meetingDate = new Date(m.arranged_time);
    const today = new Date();
    return meetingDate > today && m.status === 'scheduled';
  }).sort((a, b) => new Date(a.arranged_time).getTime() - new Date(b.arranged_time).getTime());
  
  const totalParticipants = meetings.reduce((total, meeting) => total + meeting.participants.length, 0);
  
  const statusCounts: Record<MeetingStatus, number> = {
    scheduled: meetings.filter(m => m.status === 'scheduled').length,
    'in-progress': meetings.filter(m => m.status === 'in-progress').length,
    completed: meetings.filter(m => m.status === 'completed').length,
    canceled: meetings.filter(m => m.status === 'canceled').length,
  };
  
  const getStatusColorClass = (status: MeetingStatus): string => {
    switch (status) {
      case 'scheduled': return 'text-blue-600';
      case 'in-progress': return 'text-yellow-600';
      case 'completed': return 'text-green-600';
      case 'canceled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Link to="/meetings/new">
          <Button leftIcon={<Plus className="h-4 w-4" />}>
            New Meeting
          </Button>
        </Link>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="py-5">
                <div className="flex items-center">
                  <div className="p-3 rounded-md bg-blue-100 text-blue-600">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Total Meetings</p>
                    <p className="text-3xl font-semibold text-gray-900">{meetings.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="py-5">
                <div className="flex items-center">
                  <div className="p-3 rounded-md bg-green-100 text-green-600">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Today's Meetings</p>
                    <p className="text-3xl font-semibold text-gray-900">{todayMeetings.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="py-5">
                <div className="flex items-center">
                  <div className="p-3 rounded-md bg-yellow-100 text-yellow-600">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Upcoming Meetings</p>
                    <p className="text-3xl font-semibold text-gray-900">{upcomingMeetings.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="py-5">
                <div className="flex items-center">
                  <div className="p-3 rounded-md bg-purple-100 text-purple-600">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Total Participants</p>
                    <p className="text-3xl font-semibold text-gray-900">{totalParticipants}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Status Breakdown */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Meeting Status</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(statusCounts).map(([status, count]) => (
                    <div key={status} className="flex items-center">
                      <div className={`flex-grow h-2 rounded-full overflow-hidden bg-gray-200`}>
                        <div 
                          className={`h-full ${status === 'scheduled' ? 'bg-blue-500' : 
                            status === 'in-progress' ? 'bg-yellow-500' : 
                            status === 'completed' ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${meetings.length > 0 ? (count / meetings.length) * 100 : 0}%` }}
                        />
                      </div>
                      <div className="ml-4 flex items-center min-w-[100px]">
                        <StatusBadge status={status as MeetingStatus} />
                        <span className={`ml-2 font-medium ${getStatusColorClass(status as MeetingStatus)}`}>
                          {count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Upcoming Meetings */}
            <Card>
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Upcoming Meetings</h2>
                <Link to="/meetings" className="text-sm text-blue-600 hover:text-blue-500">
                  View all
                </Link>
              </CardHeader>
              <CardContent>
                {upcomingMeetings.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingMeetings.slice(0, 5).map((meeting) => (
                      <Link 
                        key={meeting.id}
                        to={`/meetings/${meeting.id}`}
                        className="block p-3 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{meeting.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {formatDate(meeting.arranged_time)}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {meeting.participants.length} participants
                            </p>
                          </div>
                          <StatusBadge status={meeting.status} />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No upcoming meetings</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};