import React, { useState } from 'react';
import { Meeting, MeetingStatus } from '../../lib/database.types';
import { MeetingCard } from './MeetingCard';
import { Button } from '../ui/Button';
import { Search, Filter } from 'lucide-react';

interface MeetingListProps {
  meetings: Meeting[];
  onDelete: (id: string) => void;
}

export const MeetingList: React.FC<MeetingListProps> = ({ meetings, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<MeetingStatus | 'all'>('all');

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || meeting.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search meetings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as MeetingStatus | 'all')}
          >
            <option value="all">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      {filteredMeetings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeetings.map((meeting) => (
            <MeetingCard 
              key={meeting.id} 
              meeting={meeting} 
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="mt-2 text-lg font-medium text-gray-900">No meetings found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.' 
              : 'Create your first meeting to get started.'}
          </p>
        </div>
      )}
    </div>
  );
};