import React from 'react';
import { UsersRound, Check } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

/**
 * TeamCard component
 * Renders a card representing a team, including team info and a join/request button.
 *
 * Props:
 * - team: Object representing the team.
 *   - id: unique identifier for the team.
 *   - name: team name.
 *   - members: current number of members.
 *   - maxMembers: maximum number of members allowed.
 *   - isActive: whether the team is currently active.
 *   - joinType: 'open' or 'invite' specifying how users can join.
 *   - inviteSent: whether an invite request has already been sent.
 * - isRegistered: boolean indicating if the user is registered and allowed to join teams.
 */
const TeamCard = ({ team, isRegistered }) => {
  const { joinTeam, userTeamMemberships } = useAppContext();

  /**
   * Determines whether the current user has already joined this team.
   */
  const isJoined = userTeamMemberships.includes(team.id);

  /**
   * Handles click event for joining the team.
   * Only allows joining if:
   * - The user is registered
   * - The user hasn't joined yet
   * - The team is open to join
   */
  const handleJoinClick = () => {
    if (isRegistered && !isJoined && team.joinType === 'open') {
      joinTeam(team.id);
    }
  };

  /**
   * Returns the button label or icon depending on the user's status.
   */
  const getButtonContent = () => {
    if (isJoined) {
      return <Check className="h-5 w-5" />;
    }

    if (team.joinType === 'open') {
      return 'Join';
    }

    return team.inviteSent ? 'Pending' : 'Request Invite';
  };

  /**
   * Determines the CSS classes for the button, based on:
   * - Whether the user has joined
   * - Whether the user is registered
   * - Whether an invite is pending
   * - Whether the team is open
   */
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

    // Default case for open teams
    return 'bg-[#194A8D] text-white hover:bg-[#3366AA] transition-colors duration-200';
  };

  return (
    <div
      className={`border-l-4 ${
        team.isActive ? 'border-[#194A8D]' : 'border-gray-400'
      } bg-white rounded-r-lg shadow-md p-4 mb-3 hover:shadow-lg transition-all duration-300 ${
        isJoined ? 'bg-green-50' : ''
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          {/* Team Name */}
          <h3
            className={`font-semibold ${
              team.isActive ? 'text-gray-800' : 'text-gray-600'
            }`}
          >
            {team.name}
          </h3>

          {/* Member count */}
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <UsersRound className="h-4 w-4 mr-1" />
            <span>
              {team.members}/{team.maxMembers} members
            </span>
          </div>
        </div>

        {/* Join/Request button */}
        <button
          onClick={handleJoinClick}
          disabled={
            !isRegistered ||
            isJoined ||
            (team.joinType === 'invite' && team.inviteSent)
          }
          className={`px-3 py-1.5 rounded text-sm font-medium ${getButtonClass()}`}
        >
          {getButtonContent()}
        </button>
      </div>
    </div>
  );
};

export default TeamCard;
