import React from 'react';
import { useAppContext } from '../context/AppContext';
import NotificationBadge from './ui/NotificationBadge';

/**
 * Navigation component
 *
 * Displays the primary navigation bar for switching between views:
 * - Offered Sports
 * - My Teams (with notification badge if there are pending invitations)
 *
 * Context:
 * - currentView: the currently selected view ('sports' or 'teams')
 * - setCurrentView: function to change the current view
 * - pendingInvitations: array of invitations (used to display notification count)
 *
 * Usage:
 * Typically rendered at the top of the page under the header.
 */
const Navigation = () => {
  const { currentView, setCurrentView, pendingInvitations } = useAppContext();

  return (
    <nav className="bg-gray-200 text-gray-800">
      <div className="flex">
        {/* Offered Sports Tab */}
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

        {/* My Teams Tab */}
        <button
          className={`flex-1 py-3 px-4 font-medium transition duration-200 border-b-2 relative ${
            currentView === 'teams'
              ? 'border-[#194A8D] bg-white'
              : 'border-transparent hover:bg-gray-100'
          }`}
          onClick={() => setCurrentView('teams')}
        >
          My Teams
          {/* Notification badge if there are pending invitations */}
          {pendingInvitations.length > 0 && (
            <NotificationBadge count={pendingInvitations.length} />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
