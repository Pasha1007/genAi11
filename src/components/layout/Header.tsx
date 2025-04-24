import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <CalendarClock className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">MeetFlow</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link 
              to="/meetings" 
              className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              Meetings
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};