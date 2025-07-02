import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import TeamCard from './TeamCard';

/**
 * CollapsibleTeamList component
 *
 * Displays a collapsible section containing a list of teams.
 * Allows users to expand or collapse the section.
 *
 * Props:
 * - title: The section heading text.
 * - teams: Array of team objects to display.
 * - isRegistered: Boolean indicating whether the user is registered.
 * - defaultExpanded: Whether the section starts expanded by default (default true).
 */
const CollapsibleTeamList = ({ 
  title, 
  teams, 
  isRegistered, 
  defaultExpanded = true 
}) => {
  // State to track whether the list is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  // Don't render anything if there are no teams
  if (teams.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
      >
        {/* Section title */}
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="flex items-center">
          {/* Team count */}
          <span className="text-sm text-gray-500 mr-2">
            {teams.length} team{teams.length !== 1 ? 's' : ''}
          </span>
          {/* Chevron icon indicating open/closed */}
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </button>
      
      {/* Render the list of teams if expanded */}
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
