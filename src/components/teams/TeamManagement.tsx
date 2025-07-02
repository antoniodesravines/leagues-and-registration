import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import CreateTeamForm from './CreateTeamForm';
import PendingInvites from './PendingInvites';
import CollapsibleTeamList from './CollapsibleTeamList';
import TeamStatusLegend from './TeamStatusLegend';

const TeamManagement: React.FC = () => {
  const { 
    activeSport, 
    pendingInvitations, 
    showCreateTeamForm,
    setShowCreateTeamForm,
    setCurrentView,
    userRegistrations
  } = useAppContext();
  
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
  
  const isRegistered = userRegistrations.includes(activeSport.id);
  const sportPendingInvitations = pendingInvitations.filter(inv => inv.sportId === activeSport.id);
  
  return (
    <div className="space-y-6">
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
      
      <TeamStatusLegend />
      
      {showCreateTeamForm && (
        <CreateTeamForm onClose={() => setShowCreateTeamForm(false)} />
      )}
      
      {isRegistered && sportPendingInvitations.length > 0 && (
        <PendingInvites invitations={sportPendingInvitations} />
      )}
      
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
          teams={activeSport.teams.filter(team => team.joinType === 'open')}
          isRegistered={isRegistered}
          defaultExpanded={true}
        />
        
        <CollapsibleTeamList 
          title="Invite Only Teams" 
          teams={activeSport.teams.filter(team => team.joinType === 'invite')}
          isRegistered={isRegistered}
          defaultExpanded={true}
        />
      </div>
    </div>
  );
};

export default TeamManagement;