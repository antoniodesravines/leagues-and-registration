import React from 'react';
import { UsersRound, Check } from 'lucide-react';
import { Team } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface TeamCardProps {
  team: Team;
  isRegistered: boolean;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, isRegistered }) => {
  const { joinTeam, userTeamMemberships } = useAppContext();
  
  const isJoined = userTeamMemberships.includes(team.id);
  
  const handleJoinClick = () => {
    if (isRegistered && !isJoined && team.joinType === 'open') {
      joinTeam(team.id);
    }
  };
  
  const getButtonContent = () => {
    if (isJoined) {
      return <Check className="h-5 w-5" />;
    }
    
    if (team.joinType === 'open') {
      return 'Join';
    }
    
    return team.inviteSent ? 'Pending' : 'Request Invite';
  };
  
  const getButtonClass = () => {
    if (isJoined) {
      return 'bg-green-500 text-white cursor-default';
    }
    
    if (!isRegistered) {
      return 'bg-gray-400 text-gray-600 cursor-not-allowed';
    }
    
    if (team.joinType === 'invite' && !team.inviteSent) {
      return 'bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200';
    }
    
    if (team.joinType === 'invite' && team.inviteSent) {
      return 'bg-gray-200 text-gray-700 cursor-not-allowed';
    }
    
    return 'bg-[#194A8D] text-white hover:bg-[#3366AA] transition-colors duration-200';
  };
  
  return (
    <div className={`border-l-4 ${
      team.isActive ? 'border-[#194A8D]' : 'border-gray-400'
    } bg-white rounded-r-lg shadow-md p-4 mb-3 hover:shadow-lg transition-all duration-300 ${
      isJoined ? 'bg-green-50' : ''
    }`}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className={`font-semibold ${team.isActive ? 'text-gray-800' : 'text-gray-600'}`}>
            {team.name}
          </h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <UsersRound className="h-4 w-4 mr-1" />
            <span>{team.members}/{team.maxMembers} members</span>
          </div>
        </div>
        
        <button
          onClick={handleJoinClick}
          disabled={!isRegistered || isJoined || (team.joinType === 'invite' && team.inviteSent)}
          className={`px-3 py-1.5 rounded text-sm font-medium ${getButtonClass()}`}
        >
          {getButtonContent()}
        </button>
      </div>
    </div>
  );
};

export default TeamCard;