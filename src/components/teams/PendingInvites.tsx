import React from 'react';
import { Mail, CheckCircle, XCircle } from 'lucide-react';
import { Invitation } from '../../types';

interface PendingInvitesProps {
  invitations: Invitation[];
}

const PendingInvites: React.FC<PendingInvitesProps> = ({ invitations }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        <Mail className="h-5 w-5 text-[#0021A5] mr-2" />
        <h3 className="font-semibold text-lg">Pending Invitations</h3>
      </div>
      
      <div className="space-y-3">
        {invitations.map((invitation) => (
          <div 
            key={invitation.id} 
            className="border border-gray-200 rounded p-3 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{invitation.teamName}</p>
                <p className="text-sm text-gray-600">Invited by: {invitation.invitedBy}</p>
              </div>
              
              <div className="flex space-x-2">
                <button className="p-1.5 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors duration-200">
                  <CheckCircle className="h-5 w-5" />
                </button>
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