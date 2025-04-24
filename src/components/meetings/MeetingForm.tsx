import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Meeting, MeetingInsert, MeetingStatus, Participant } from '../../lib/database.types';
import { Plus, Trash2 } from 'lucide-react';

interface MeetingFormProps {
  initialData?: Meeting;
  onSubmit: (data: MeetingInsert) => Promise<void>;
  isLoading: boolean;
}

export const MeetingForm: React.FC<MeetingFormProps> = ({ 
  initialData, 
  onSubmit, 
  isLoading 
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [arrangedTime, setArrangedTime] = useState(
    initialData?.arranged_time 
      ? new Date(initialData.arranged_time).toISOString().slice(0, 16) 
      : ''
  );
  const [status, setStatus] = useState<MeetingStatus>(initialData?.status || 'scheduled');
  const [participants, setParticipants] = useState<Participant[]>(initialData?.participants || []);
  const [newParticipantName, setNewParticipantName] = useState('');
  const [newParticipantPosition, setNewParticipantPosition] = useState('');

  const handleAddParticipant = () => {
    if (newParticipantName && newParticipantPosition) {
      setParticipants([
        ...participants, 
        { name: newParticipantName, position: newParticipantPosition }
      ]);
      setNewParticipantName('');
      setNewParticipantPosition('');
    }
  };

  const handleRemoveParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await onSubmit({
      title,
      arranged_time: new Date(arrangedTime).toISOString(),
      status,
      participants
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Meeting Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Quarterly Review"
          required
        />
      </div>

      <div>
        <label htmlFor="arrangedTime" className="block text-sm font-medium text-gray-700">
          Meeting Time
        </label>
        <input
          type="datetime-local"
          id="arrangedTime"
          value={arrangedTime}
          onChange={(e) => setArrangedTime(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as MeetingStatus)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="scheduled">Scheduled</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Participants
        </label>

        <div className="space-y-4">
          {participants.map((participant, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <div>
                <p className="font-medium">{participant.name}</p>
                <p className="text-sm text-gray-500">{participant.position}</p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveParticipant(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-3 p-4 border border-gray-200 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <label htmlFor="participantName" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="participantName"
                value={newParticipantName}
                onChange={(e) => setNewParticipantName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="participantPosition" className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <input
                type="text"
                id="participantPosition"
                value={newParticipantPosition}
                onChange={(e) => setNewParticipantPosition(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Product Manager"
              />
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={handleAddParticipant}
            disabled={!newParticipantName || !newParticipantPosition}
          >
            Add Participant
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="submit" isLoading={isLoading}>
          {initialData ? 'Update Meeting' : 'Create Meeting'}
        </Button>
      </div>
    </form>
  );
};