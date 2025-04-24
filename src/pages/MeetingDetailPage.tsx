import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Users, Edit, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { getMeetingById, deleteMeeting } from '../lib/api';
import { Meeting } from '../lib/database.types';
import { formatDate } from '../utils/formatters';
import toast from 'react-hot-toast';

export const MeetingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const fetchMeeting = async () => {
      if (!id) return;
      
      try {
        const data = await getMeetingById(id);
        setMeeting(data);
      } catch (error) {
        console.error('Error fetching meeting:', error);
        toast.error('Failed to load meeting details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMeeting();
  }, [id]);
  
  const handleDelete = async () => {
    if (!id || !confirm('Are you sure you want to delete this meeting?')) return;
    
    setIsDeleting(true);
    
    try {
      await deleteMeeting(id);
      toast.success('Meeting deleted successfully');
      navigate('/meetings');
    } catch (error) {
      console.error('Error deleting meeting:', error);
      toast.error('Failed to delete meeting');
      setIsDeleting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!meeting) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Meeting not found</h3>
        <p className="mt-1 text-sm text-gray-500">
          The meeting you're looking for doesn't exist or has been deleted.
        </p>
        <div className="mt-6">
          <Link to="/meetings">
            <Button>Back to Meetings</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="h-4 w-4" />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 ml-2">{meeting.title}</h1>
        </div>
        
        <div className="flex space-x-2">
          <Link to={`/meetings/${meeting.id}/edit`}>
            <Button leftIcon={<Edit className="h-4 w-4" />}>
              Edit
            </Button>
          </Link>
          <Button 
            variant="danger" 
            leftIcon={<Trash2 className="h-4 w-4" />}
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-gray-700">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm">{formatDate(meeting.arranged_time)}</span>
        </div>
        <StatusBadge status={meeting.status} className="px-3 py-1" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Meeting Details</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Created</h3>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(meeting.created_at)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(meeting.updated_at)}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Meeting ID</h3>
                <p className="mt-1 text-sm text-gray-900">{meeting.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">
              Participants ({meeting.participants.length})
            </h2>
          </CardHeader>
          <CardContent>
            {meeting.participants.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {meeting.participants.map((participant, index) => (
                  <div key={index} className="py-3">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{participant.name}</h3>
                        <p className="text-sm text-gray-500">{participant.position}</p>
                      </div>
                      <div 
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 border-2 border-white"
                      >
                        <span className="text-xs font-medium text-blue-800">
                          {participant.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No participants added yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};