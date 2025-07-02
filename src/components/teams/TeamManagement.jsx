import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import CreateTeamForm from './CreateTeamForm';
import PendingInvites from './PendingInvites';
import CollapsibleTeamList from './CollapsibleTeamList';
import TeamStatusLegend from './TeamStatusLegend';

/**
 * TeamManagement component
 *
 * Displays the management interface for teams within the currently active sport.
 * Features:
 * - Displays a back button to return to the Offered Sports view.
 * - Shows sport details (name, gender, registered teams).
 * - Allows registered users to create a team (if slots remain).
 * - Displays pending invitations for the active sport.
 * - Shows lists of open and invite-only teams.
 * - Shows a legend explaining team statuses.
 *
 * Context:
 * - activeSport: the currently selected sport object (or undefined/null if none selected).
 * - pendingInvitations: array of all pending invitations across sports.
 * - showCreateTeamForm: boolean indicating whether the CreateTeamForm is visible.
 * - setShowCreateTeamForm: function to toggle the CreateTeamForm.
 * - setCurrentView: function to navigate between views.
 * - userRegistrations: array of sport IDs the user is registered in.
 */
const TeamManagement = () => {
  const {
    activeSport,
    pendingInvitations,
    showCreateTeamForm,
    setShowCreateTeamForm,
    setCurrentView,
    userRegistrations
  } = useAppContext();

  /**
   * If no sport is selected, show a placeholder message.
   */
  if (!activeSport) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">No Sport Selected</h2>
        <p className="text-gray-600 text-center mb-4">
          Please select a sport from the "Offered Sports" tab to view and manage teams.
        </p>
      </div>
    );
  }

  // Determine whether the user is registered in this sport
  const isRegistered = userRegistrations.includes(activeSport.id);

  // Filter pending invitations for this specific sport
  const sportPendingInvitations = pendingInvitations.filter(
    (inv) => inv.sportId === activeSport.id
  );

  return (
    <div className="space-y-6">
      {/* Navigation Back Button and Create Team Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('sports')}
          className="flex items-center text-[#194A8D] hover:text-[#3366AA] transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Offered Sports
        </button>

        {isRegistered && (
          <button
            onClick={() => setShowCreateTeamForm(true)}
            disabled={activeSport.registeredTeams >= activeSport.maxTeams}
            className={`px-4 py-2 rounded font-medium transition-colors duration-200 ${
              activeSport.registeredTeams >= activeSport.maxTeams
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#194A8D] text-white hover:bg-[#3366AA]'
            }`}
          >
            Create a Team
          </button>
        )}
      </div>

      {/* Sport Name and Stats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          {activeSport.name} ({activeSport.gender})
        </h2>
        <div className="flex items-center mt-2 md:mt-0">
          <span className="text-gray-600">
            Teams: {activeSport.registeredTeams}/{activeSport.maxTeams}
          </span>
        </div>
      </div>

      {/* Team Status Legend */}
      <TeamStatusLegend />

      {/* Create Team Form */}
      {showCreateTeamForm && (
        <CreateTeamForm onClose={() => setShowCreateTeamForm(false)} />
      )}

      {/* Pending Invitations */}
      {isRegistered && sportPendingInvitations.length > 0 && (
        <PendingInvites invitations={sportPendingInvitations} />
      )}

      {/* Team Lists */}
      <div className="space-y-4">
        {isRegistered && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="w-full py-3 px-4 text-left bg-green-100 border border-green-300 rounded font-medium text-green-800">
              ✓ Registered as Free Agent
            </div>
          </div>
        )}

        <CollapsibleTeamList
          title="Open Teams - Anyone Can Join"
          teams={activeSport.teams.filter((team) => team.joinType === 'open')}
          isRegistered={isRegistered}
          defaultExpanded={true}
        />

        <CollapsibleTeamList
          title="Invite Only Teams"
          teams={activeSport.teams.filter((team) => team.joinType === 'invite')}
          isRegistered={isRegistered}
          defaultExpanded={true}
        />
      </div>
    </div>
  );
};

export default TeamManagement;
