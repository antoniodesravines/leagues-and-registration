import React, { createContext, useContext, useState, useEffect } from 'react';
import { allSports, mockInvitations } from '../data/sportsData';

/**
 * AppContext
 * Provides global state and actions for managing:
 * - Current view (sports or teams)
 * - Active sport
 * - User registrations and team memberships
 * - Team creation and joining
 */
const AppContext = createContext(undefined);

/**
 * Custom hook to consume the AppContext.
 * Throws an error if used outside the AppProvider.
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

/**
 * AppProvider component
 *
 * Wraps the application and provides shared state and actions
 * to all children components.
 *
 * Provides:
 * - currentView: string ("sports" or "teams")
 * - activeSport: the currently selected sport
 * - pendingInvitations: array of pending invites
 * - userRegistrations: array of sport IDs the user is registered in
 * - userTeamMemberships: array of team IDs the user belongs to
 * - showRegistrationModal: modal visibility
 * - showCreateTeamForm: create team form visibility
 * - createTeam: function to create a team
 * - joinTeam: function to join a team
 * - registerAsFreAgent: function to register as a free agent
 */
export const AppProvider = ({ children }) => {
  // Current view: 'sports' or 'teams'
  const [currentView, setCurrentView] = useState('sports');

  // Active sport object or null
  const [activeSport, setActiveSport] = useState(null);

  // List of pending invitations
  const [pendingInvitations] = useState(mockInvitations);

  // Modal and form visibility
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showCreateTeamForm, setShowCreateTeamForm] = useState(false);

  // User state
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [userTeamMemberships, setUserTeamMemberships] = useState([]);

  // All sports data
  const [sports, setSports] = useState(allSports);

  /**
   * createTeam
   * Creates a new team within the specified sport.
   * Also updates userTeamMemberships and userRegistrations.
   *
   * @param {Object} teamData - { sportId, name, joinType }
   */
  const createTeam = (teamData) => {
    const sport = sports.find(s => s.id === teamData.sportId);
    if (!sport) return;

    const newTeam = {
      id: `team-${Date.now()}`,
      name: teamData.name,
      joinType: teamData.joinType,
      members: 1,
      maxMembers: sport.teamSize,
      isActive: true,
      inviteSent: false,
    };

    // Update sports list
    const updatedSports = sports.map(s =>
      s.id === teamData.sportId
        ? {
            ...s,
            teams: [...s.teams, newTeam],
            registeredTeams: s.registeredTeams + 1,
          }
        : s
    );

    setSports(updatedSports);

    // Update activeSport if it's the same sport
    if (activeSport && activeSport.id === teamData.sportId) {
      setActiveSport({
        ...activeSport,
        teams: [...activeSport.teams, newTeam],
        registeredTeams: activeSport.registeredTeams + 1,
      });
    }

    // Add to user memberships
    setUserTeamMemberships(prev => [...prev, newTeam.id]);

    // Register user if not already registered
    if (!userRegistrations.includes(teamData.sportId)) {
      setUserRegistrations(prev => [...prev, teamData.sportId]);
    }
  };

  /**
   * registerAsFreAgent
   * Registers the user as a free agent in a sport.
   *
   * @param {string} sportId
   */
  const registerAsFreAgent = (sportId) => {
    if (!userRegistrations.includes(sportId)) {
      setUserRegistrations(prev => [...prev, sportId]);
    }
  };

  /**
   * joinTeam
   * Adds the user to a team and updates team membership counts.
   *
   * @param {string} teamId
   */
  const joinTeam = (teamId) => {
    if (!userTeamMemberships.includes(teamId)) {
      setUserTeamMemberships(prev => [...prev, teamId]);

      // Update sports list with incremented member count
      const updatedSports = sports.map(sport => ({
        ...sport,
        teams: sport.teams.map(team =>
          team.id === teamId
            ? { ...team, members: team.members + 1 }
            : team
        )
      }));
      setSports(updatedSports);

      // Update activeSport teams if needed
      if (activeSport) {
        setActiveSport({
          ...activeSport,
          teams: activeSport.teams.map(team =>
            team.id === teamId
              ? { ...team, members: team.members + 1 }
              : team
          )
        });
      }
    }
  };

  /**
   * Keep activeSport in sync if sports data changes.
   */
  useEffect(() => {
    if (activeSport) {
      const updatedSport = sports.find(s => s.id === activeSport.id);
      if (updatedSport) {
        setActiveSport(updatedSport);
      }
    }
  }, [sports]);

  // Context value to be provided to children
  const value = {
    currentView,
    setCurrentView,
    activeSport,
    setActiveSport,
    pendingInvitations,
    showRegistrationModal,
    setShowRegistrationModal,
    showCreateTeamForm,
    setShowCreateTeamForm,
    userRegistrations,
    userTeamMemberships,
    createTeam,
    registerAsFreAgent,
    joinTeam,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
