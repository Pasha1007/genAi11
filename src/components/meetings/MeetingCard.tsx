import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { Meeting } from '../../lib/database.types';
import { formatDate } from '../../utils/formatters';
import { Link } from 'react-router-dom';
import { Clock, Users, Edit, Trash2 } from 'lucide-react';

interface MeetingCardProps {
  meeting: Meeting;
  onDelete: (id: string) => void;
}

export const MeetingCard: React.FC<MeetingCardProps> = ({ meeting, onDelete }) => {
  return (
    <Card className="h-full transition-transform duration-300 hover:translate-y-[-4px] hover:shadow-lg">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{meeting.title}</h3>
          <StatusBadge status={meeting.status} />
        </div>
        
        <div className="space-y-3 mt-4">
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>{formatDate(meeting.arranged_time)}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span>{meeting.participants.length} participants</span>
          </div>
        </div>
        
        {meeting.participants.length > 0 && (
          <div className="mt-4">
            <div className="flex -space-x-2 overflow-hidden">
              {meeting.participants.slice(0, 3).map((participant, index) => (
                <div 
                  key={index} 
                  className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 border-2 border-white"
                  title={`${participant.name} (${participant.position})`}
                >
                  <span className="text-xs font-medium text-blue-800">
                    {participant.name.charAt(0)}
                  </span>
                </div>
              ))}
              {meeting.participants.length > 3 && (
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 border-2 border-white">
                  <span className="text-xs font-medium text-gray-500">
                    +{meeting.participants.length - 3}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Link to={`/meetings/${meeting.id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
        
        <div className="flex space-x-2">
          <Link to={`/meetings/${meeting.id}/edit`}>
            <Button variant="ghost" size="sm" leftIcon={<Edit className="h-4 w-4" />} />
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            leftIcon={<Trash2 className="h-4 w-4 text-red-500" />}
            onClick={() => onDelete(meeting.id)} 
          />
        </div>
      </CardFooter>
    </Card>
  );
};