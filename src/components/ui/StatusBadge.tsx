import React from 'react';
import type { MeetingStatus } from '../../lib/database.types';

interface StatusBadgeProps {
  status: MeetingStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const statusConfig = {
    scheduled: {
      label: 'Scheduled',
      className: 'bg-blue-100 text-blue-800',
    },
    'in-progress': {
      label: 'In Progress',
      className: 'bg-yellow-100 text-yellow-800',
    },
    completed: {
      label: 'Completed',
      className: 'bg-green-100 text-green-800',
    },
    canceled: {
      label: 'Canceled',
      className: 'bg-red-100 text-red-800',
    },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className} ${className}`}>
      {config.label}
    </span>
  );
};