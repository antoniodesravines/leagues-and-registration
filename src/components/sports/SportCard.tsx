import React from 'react';
import { Sport } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface SportCardProps {
  sport: Sport;
}

const SportCard: React.FC<SportCardProps> = ({ sport }) => {
  const { setActiveSport, registerAsFreAgent, userRegistrations, setCurrentView } = useAppContext();
  
  const isRegistered = userRegistrations.includes(sport.id);
  
  const handleRegisterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isRegistered && sport.registrationOpen) {
      // Register as free agent and redirect to teams page
      registerAsFreAgent(sport.id);
      setActiveSport(sport);
      setCurrentView('teams');
    }
  };
  
  const handleCardClick = () => {
    setActiveSport(sport);
    setCurrentView('teams');
  };
  
  const getRegisterButtonText = () => {
    if (isRegistered) return 'Registered';
    if (!sport.registrationOpen) return 'Closed';
    return 'Register';
  };
  
  const getRegisterButtonClass = () => {
    if (isRegistered) {
      return 'bg-gray-300 text-gray-500 cursor-not-allowed';
    }
    if (!sport.registrationOpen) {
      return 'bg-gray-300 text-gray-500 cursor-not-allowed';
    }
    return 'bg-[#194A8D] text-white hover:bg-[#3366AA] transition-colors duration-200';
  };
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-xl text-[#194A8D] mb-2">{sport.name}</h3>
            <p className="text-gray-600 text-lg">{sport.gender}</p>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500 block mb-2">
              Teams: {sport.registeredTeams}/{sport.maxTeams}
            </span>
            <button 
              onClick={handleRegisterClick}
              disabled={isRegistered || !sport.registrationOpen}
              className={`px-4 py-2 rounded font-medium ${getRegisterButtonClass()}`}
            >
              {getRegisterButtonText()}
            </button>
          </div>
        </div>
      </div>
      <div 
        className={`h-2 w-full ${sport.registrationOpen ? 'bg-[#194A8D]' : 'bg-gray-400'}`}
      ></div>
    </div>
  );
};

export default SportCard;