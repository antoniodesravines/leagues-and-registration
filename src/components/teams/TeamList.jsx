import React from 'react';
import TeamCard from './TeamCard';

/**
 * TeamList component
 * Renders a titled list of TeamCard components.
 *
 * Props:
 * - title: String representing the heading for the list.
 * - teams: Array of team objects to display.
 * - isRegistered: Boolean indicating whether the current user is registered
 *   (used to determine button states in TeamCard).
 */
const TeamList = ({ title, teams, isRegistered }) => {
  /**
   * If there are no teams to display, render nothing.
   */
  if (teams.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* List Title */}
      <h3 className="font-semibold text-lg mb-3">{title}</h3>

      {/* List of TeamCard components */}
      <div className="space-y-2">
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            isRegistered={isRegistered}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamList;
