import React, { useState } from 'react';
import { X, Users, UserPlus } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

/**
 * RegistrationModal component
 *
 * Displays a modal where users can choose to register as a free agent
 * or create their own team.
 */
const RegistrationModal = () => {
  const { 
    activeSport, 
    showRegistrationModal, 
    setShowRegistrationModal, 
    setShowCreateTeamForm,
    registerAsFreAgent,
    setCurrentView
  } = useAppContext();
  
  // Track which option the user selected ('free-agent' or 'create-team')
  const [selectedOption, setSelectedOption] = useState(null);
  
  // If modal is not visible or no sport is selected, don't render anything
  if (!showRegistrationModal || !activeSport) return null;
  
  // Handle selecting one of the options
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  
  // Handle confirming the selection
  const handleConfirm = () => {
    if (selectedOption === 'free-agent') {
      registerAsFreAgent(activeSport.id);
      setShowRegistrationModal(false);
      setCurrentView('teams');
    } else if (selectedOption === 'create-team') {
      setShowRegistrationModal(false);
      setShowCreateTeamForm(true);
      setCurrentView('teams');
    }
  };
  
  // Handle closing the modal
  const handleClose = () => {
    setShowRegistrationModal(false);
    setSelectedOption(null);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Modal Header */}
        <div className="bg-[#0021A5] text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
          <h3 className="font-semibold text-lg">Register for {activeSport.name}</h3>
          <button onClick={handleClose} className="text-white hover:text-[#FDB927] transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">How would you like to participate?</p>
          
          {/* Options */}
          <div className="space-y-4">
            {/* Free Agent Option */}
            <div 
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedOption === 'free-agent' 
                  ? 'border-[#0021A5] bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleOptionSelect('free-agent')}
            >
              <div className="flex items-center">
                <UserPlus className="h-6 w-6 text-[#0021A5] mr-3" />
                <div>
                  <h4 className="font-medium text-gray-800">Join as Free Agent</h4>
                  <p className="text-sm text-gray-600">Be placed on a team that needs players</p>
                </div>
              </div>
            </div>
            
            {/* Create Team Option */}
            <div 
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedOption === 'create-team' 
                  ? 'border-[#0021A5] bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleOptionSelect('create-team')}
            >
              <div className="flex items-center">
                <Users className="h-6 w-6 text-[#0021A5] mr-3" />
                <div>
                  <h4 className="font-medium text-gray-800">Create a Team</h4>
                  <p className="text-sm text-gray-600">Start your own team and invite players</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end mt-6 space-x-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedOption}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                selectedOption
                  ? 'bg-[#0021A5] text-white hover:bg-[#001A80]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
