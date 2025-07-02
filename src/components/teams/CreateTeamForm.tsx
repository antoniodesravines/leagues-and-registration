import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface CreateTeamFormProps {
  onClose: () => void;
}

const CreateTeamForm: React.FC<CreateTeamFormProps> = ({ onClose }) => {
  const [teamName, setTeamName] = useState('');
  const [joinType, setJoinType] = useState<'open' | 'invite'>('open');
  const { createTeam, activeSport } = useAppContext();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim() && activeSport) {
      createTeam({
        name: teamName.trim(),
        joinType,
        sportId: activeSport.id,
      });
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="bg-[#194A8D] text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
          <h3 className="font-semibold text-lg">Create a New Team</h3>
          <button onClick={onClose} className="text-white hover:text-[#FDB927] transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label htmlFor="teamName" className="block text-gray-700 font-medium mb-2">
              Team Name
            </label>
            <input
              type="text"
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#194A8D]"
              placeholder="Enter team name"
              required
            />
          </div>
          
          <div className="mb-6">
            <span className="block text-gray-700 font-medium mb-2">Team Visibility</span>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="joinType"
                  checked={joinType === 'open'}
                  onChange={() => setJoinType('open')}
                  className="h-4 w-4 text-[#194A8D] focus:ring-[#194A8D]"
                />
                <span className="ml-2">Open (Anyone can join)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="joinType"
                  checked={joinType === 'invite'}
                  onChange={() => setJoinType('invite')}
                  className="h-4 w-4 text-[#194A8D] focus:ring-[#194A8D]"
                />
                <span className="ml-2">Invite Only</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#194A8D] text-white rounded font-medium hover:bg-[#3366AA] transition-colors duration-200"
            >
              Create Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamForm;