import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { MeetingForm } from '../components/meetings/MeetingForm';
import { createMeeting } from '../lib/api';
import { MeetingInsert } from '../lib/database.types';
import toast from 'react-hot-toast';

export const MeetingNewPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (data: MeetingInsert) => {
    setIsSubmitting(true);
    
    try {
      const newMeeting = await createMeeting(data);
      toast.success('Meeting created successfully');
      navigate(`/meetings/${newMeeting.id}`);
    } catch (error) {
      console.error('Error creating meeting:', error);
      toast.error('Failed to create meeting');
      setIsSubmitting(false);
    }
  };
  
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
        <h1 className="text-2xl font-bold text-gray-900 ml-2">New Meeting</h1>
      </div>
      
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-gray-900">Meeting Information</h2>
        </CardHeader>
        <CardContent>
          <MeetingForm 
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  );
};