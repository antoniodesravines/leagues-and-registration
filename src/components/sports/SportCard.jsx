import React from 'react';
import { useAppContext } from '../../context/AppContext';

/**
 * SportCard component
 *
 * Displays a card for a single sport, including:
 * - sport name and gender
 * - registration status and team counts
 * - Register button (if applicable)
 */
const SportCard = ({ sport }) => {
  const { setActiveSport, registerAsFreAgent, userRegistrations, setCurrentView } = useAppContext();
  
  // Determine if the user is already registered for this sport
  const isRegistered = userRegistrations.includes(sport.id);

  /**
   * Handle clicking the Register button
   * Stops propagation so the card click does not also fire.
   */
  const handleRegisterClick = (e) => {
    e.stopPropagation();
    if (!isRegistered && sport.registrationOpen) {
      registerAsFreAgent(sport.id);
      setActiveSport(sport);
      setCurrentView('teams');
    }
  };

  /**
   * Handle clicking anywhere on the card
   * Navigates to the teams page for this sport.
   */
  const handleCardClick = () => {
    setActiveSport(sport);
    setCurrentView('teams');
  };

  /**
   * Determine the text to show on the Register button
   */
  const getRegisterButtonText = () => {
    if (isRegistered) return 'Registered';
    if (!sport.registrationOpen) return 'Closed';
    return 'Register';
  };

  /**
   * Determine the styling for the Register button
   */
  const getRegisterButtonClass = () => {
    if (isRegistered || !sport.registrationOpen) {
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
          {/* Sport Details */}
          <div className="flex-1">
            <h3 className="font-bold text-xl text-[#194A8D] mb-2">{sport.name}</h3>
            <p className="text-gray-600 text-lg">{sport.gender}</p>
          </div>
          
          {/* Registration Info */}
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
      
      {/* Colored bar indicating registration status */}
      <div 
        className={`h-2 w-full ${sport.registrationOpen ? 'bg-[#194A8D]' : 'bg-gray-400'}`}
      ></div>
    </div>
  );
};

export default SportCard;
