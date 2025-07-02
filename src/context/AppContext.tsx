import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Sport, Team, Invitation } from '../types';
import { allSports, mockInvitations } from '../data/sportsData';

interface AppContextType {
  currentView: 'sports' | 'teams';
  setCurrentView: (view: 'sports' | 'teams') => void;
  activeSport: Sport | null;
  setActiveSport: (sport: Sport | null) => void;
  pendingInvitations: Invitation[];
  showRegistrationModal: boolean;
  setShowRegistrationModal: (show: boolean) => void;
  showCreateTeamForm: boolean;
  setShowCreateTeamForm: (show: boolean) => void;
  userRegistrations: string[];
  userTeamMemberships: string[];
  createTeam: (teamData: { name: string; joinType: 'open' | 'invite'; sportId: string }) => void;
  registerAsFreAgent: (sportId: string) => void;
  joinTeam: (teamId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'sports' | 'teams'>('sports');
  const [activeSport, setActiveSport] = useState<Sport | null>(null);
  const [pendingInvitations] = useState<Invitation[]>(mockInvitations);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showCreateTeamForm, setShowCreateTeamForm] = useState(false);
  const [userRegistrations, setUserRegistrations] = useState<string[]>([]);
  const [userTeamMemberships, setUserTeamMemberships] = useState<string[]>([]);
  const [sports, setSports] = useState<Sport[]>(allSports);
  
  const createTeam = (teamData: { name: string; joinType: 'open' | 'invite'; sportId: string }) => {
    const sport = sports.find(s => s.id === teamData.sportId);
    if (!sport) return;
    
    const newTeam: Team = {
      id: `team-${Date.now()}`,
      name: teamData.name,
      joinType: teamData.joinType,
      members: 1,
      maxMembers: sport.teamSize,
      isActive: true,
      inviteSent: false,
    };
    
    // Update sports data
    const updatedSports = sports.map(s => {
      if (s.id === teamData.sportId) {
        return {
          ...s,
          teams: [...s.teams, newTeam],
          registeredTeams: s.registeredTeams + 1,
        };
      }
      return s;
    });
    
    setSports(updatedSports);
    
    // Update active sport if it's the same
    if (activeSport && activeSport.id === teamData.sportId) {
      setActiveSport({
        ...activeSport,
        teams: [...activeSport.teams, newTeam],
        registeredTeams: activeSport.registeredTeams + 1,
      });
    }
    
    // Add user to team memberships
    setUserTeamMemberships(prev => [...prev, newTeam.id]);
    
    // Register user for the sport if not already registered
    if (!userRegistrations.includes(teamData.sportId)) {
      setUserRegistrations(prev => [...prev, teamData.sportId]);
    }
  };
  
  const registerAsFreAgent = (sportId: string) => {
    if (!userRegistrations.includes(sportId)) {
      setUserRegistrations(prev => [...prev, sportId]);
    }
  };
  
  const joinTeam = (teamId: string) => {
    if (!userTeamMemberships.includes(teamId)) {
      setUserTeamMemberships(prev => [...prev, teamId]);
      
      // Update team member count
      const updatedSports = sports.map(sport => ({
        ...sport,
        teams: sport.teams.map(team => 
          team.id === teamId 
            ? { ...team, members: team.members + 1 }
            : team
        )
      }));
      
      setSports(updatedSports);
      
      // Update active sport if needed
      if (activeSport) {
        const updatedActiveSport = {
          ...activeSport,
          teams: activeSport.teams.map(team => 
            team.id === teamId 
              ? { ...team, members: team.members + 1 }
              : team
          )
        };
        setActiveSport(updatedActiveSport);
      }
    }
  };
  
  // Update activeSport when sports data changes
  React.useEffect(() => {
    if (activeSport) {
      const updatedSport = sports.find(s => s.id === activeSport.id);
      if (updatedSport) {
        setActiveSport(updatedSport);
      }
    }
  }, [sports]);
  
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