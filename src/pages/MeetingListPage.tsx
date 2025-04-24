import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { MeetingList } from '../components/meetings/MeetingList';
import { getMeetings, deleteMeeting } from '../lib/api';
import { Meeting } from '../lib/database.types';
import toast from 'react-hot-toast';

export const MeetingListPage: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchMeetings();
  }, []);
  
  const fetchMeetings = async () => {
    try {
      const data = await getMeetings();
      setMeetings(data);
    } catch (error) {
      console.error('Error fetching meetings:', error);
      toast.error('Failed to load meetings');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this meeting?')) return;
    
    try {
      await deleteMeeting(id);
      setMeetings(meetings.filter(meeting => meeting.id !== id));
      toast.success('Meeting deleted successfully');
    } catch (error) {
      console.error('Error deleting meeting:', error);
      toast.error('Failed to delete meeting');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Meetings</h1>
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
        <MeetingList meetings={meetings} onDelete={handleDelete} />
      )}
    </div>
  );
};