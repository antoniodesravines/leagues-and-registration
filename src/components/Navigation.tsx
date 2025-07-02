import React from 'react';
import { useAppContext } from '../context/AppContext';
import NotificationBadge from './ui/NotificationBadge';

const Navigation: React.FC = () => {
  const { currentView, setCurrentView, pendingInvitations } = useAppContext();
  
  return (
    <nav className="bg-gray-200 text-gray-800">
      <div className="flex">
        <button
          className={`flex-1 py-3 px-4 font-medium transition duration-200 border-b-2 ${
            currentView === 'sports'
              ? 'border-[#194A8D] bg-white'
              : 'border-transparent hover:bg-gray-100'
          }`}
          onClick={() => setCurrentView('sports')}
        >
          Offered Sports
        </button>
        <button
          className={`flex-1 py-3 px-4 font-medium transition duration-200 border-b-2 relative ${
            currentView === 'teams'
              ? 'border-[#194A8D] bg-white'
              : 'border-transparent hover:bg-gray-100'
          }`}
          onClick={() => setCurrentView('teams')}
        >
          My Teams
          {pendingInvitations.length > 0 && (
            <NotificationBadge count={pendingInvitations.length} />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;