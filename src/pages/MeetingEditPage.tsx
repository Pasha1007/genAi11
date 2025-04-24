import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { MeetingForm } from '../components/meetings/MeetingForm';
import { getMeetingById, updateMeeting } from '../lib/api';
import { Meeting, MeetingInsert } from '../lib/database.types';
import toast from 'react-hot-toast';

export const MeetingEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
  
  const handleSubmit = async (data: MeetingInsert) => {
    if (!id) return;
    
    setIsSubmitting(true);
    
    try {
      await updateMeeting(id, data);
      toast.success('Meeting updated successfully');
      navigate(`/meetings/${id}`);
    } catch (error) {
      console.error('Error updating meeting:', error);
      toast.error('Failed to update meeting');
    } finally {
      setIsSubmitting(false);
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
          The meeting you're trying to edit doesn't exist or has been deleted.
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
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 ml-2">Edit Meeting</h1>
      </div>
      
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-gray-900">Meeting Information</h2>
        </CardHeader>
        <CardContent>
          <MeetingForm 
            initialData={meeting}
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  );
};