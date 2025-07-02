import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Team } from '../../types';
import TeamCard from './TeamCard';

interface CollapsibleTeamListProps {
  title: string;
  teams: Team[];
  isRegistered: boolean;
  defaultExpanded?: boolean;
}

const CollapsibleTeamList: React.FC<CollapsibleTeamListProps> = ({ 
  title, 
  teams, 
  isRegistered, 
  defaultExpanded = true 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  if (teams.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
      >
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">
            {teams.length} team{teams.length !== 1 ? 's' : ''}
          </span>
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </button>
      
      {isExpanded && (
        <div className="p-4 space-y-2">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} isRegistered={isRegistered} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollapsibleTeamList;