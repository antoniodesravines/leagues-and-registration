import React from 'react';
import { Mail, CheckCircle, XCircle } from 'lucide-react';

/**
 * PendingInvites component
 *
 * Renders a list of pending team invitations.
 * Each invitation shows the team name, who invited the user,
 * and action buttons to accept or decline (buttons currently unhooked).
 *
 * Props:
 * - invitations: Array of invitation objects:
 *   - id: unique identifier
 *   - teamName: name of the inviting team
 *   - invitedBy: name of the person who invited
 */
const PendingInvites = ({ invitations }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center mb-3">
        <Mail className="h-5 w-5 text-[#0021A5] mr-2" />
        <h3 className="font-semibold text-lg">Pending Invitations</h3>
      </div>
      
      {/* List of Invitations */}
      <div className="space-y-3">
        {invitations.map((invitation) => (
          <div 
            key={invitation.id} 
            className="border border-gray-200 rounded p-3 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex justify-between items-center">
              {/* Invitation Details */}
              <div>
                <p className="font-medium">{invitation.teamName}</p>
                <p className="text-sm text-gray-600">
                  Invited by: {invitation.invitedBy}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-2">
                {/* Accept Button */}
                <button className="p-1.5 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors duration-200">
                  <CheckCircle className="h-5 w-5" />
                </button>
                
                {/* Decline Button */}
                <button className="p-1.5 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors duration-200">
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingInvites;
