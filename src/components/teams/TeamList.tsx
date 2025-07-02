import React from 'react';
import { Team } from '../../types';
import TeamCard from './TeamCard';

interface TeamListProps {
  title: string;
  teams: Team[];
  isRegistered: boolean;
}

const TeamList: React.FC<TeamListProps> = ({ title, teams, isRegistered }) => {
  if (teams.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-semibold text-lg mb-3">{title}</h3>
      <div className="space-y-2">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} isRegistered={isRegistered} />
        ))}
      </div>
    </div>
  );
};

export default TeamList;