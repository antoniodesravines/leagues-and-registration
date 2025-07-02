import { Sport, Invitation } from '../types';

// Sports data
export const allSports: Sport[] = [
  {
    id: 'fall-3v3-boys',
    name: '3v3 Basketball',
    gender: 'Boys',
    season: 'fall',
    teamSize: 3,
    maxTeams: 12,
    registeredTeams: 5,
    registrationOpen: true,
    teams: [
      {
        id: 'team-1',
        name: 'Court Kings',
        joinType: 'open',
        members: 2,
        maxMembers: 3,
        isActive: true,
      },
      {
        id: 'team-2',
        name: 'Triple Threat',
        joinType: 'open',
        members: 1,
        maxMembers: 3,
        isActive: true,
      },
      {
        id: 'team-3',
        name: 'Slam Dunkers',
        joinType: 'invite',
        members: 2,
        maxMembers: 3,
        isActive: true,
        inviteSent: true,
      },
      {
        id: 'team-4',
        name: 'Aggie Ballers',
        joinType: 'invite',
        members: 3,
        maxMembers: 3,
        isActive: false,
      },
    ],
  },
  {
    id: 'fall-5v5-boys',
    name: '5v5 Preseason Basketball',
    gender: 'Boys',
    season: 'fall',
    teamSize: 5,
    maxTeams: 8,
    registeredTeams: 3,
    registrationOpen: true,
    teams: [
      {
        id: 'team-5',
        name: 'Aggie Pride',
        joinType: 'open',
        members: 3,
        maxMembers: 5,
        isActive: true,
      },
      {
        id: 'team-6',
        name: 'Blue & Gold',
        joinType: 'invite',
        members: 4,
        maxMembers: 5,
        isActive: true,
      },
    ],
  },
  {
    id: 'spring-3v3-girls',
    name: '3v3 Basketball',
    gender: 'Girls',
    season: 'spring',
    teamSize: 3,
    maxTeams: 10,
    registeredTeams: 0,
    registrationOpen: false,
    teams: [],
  },
  {
    id: 'spring-5v5-boys',
    name: '5v5 Basketball',
    gender: 'Boys',
    season: 'spring',
    teamSize: 5,
    maxTeams: 10,
    registeredTeams: 0,
    registrationOpen: false,
    teams: [],
  },
];

// Group sports by season
export const seasons = {
  fall: allSports.filter(sport => sport.season === 'fall'),
  spring: allSports.filter(sport => sport.season === 'spring'),
};

export const seasonLabels = {
  fall: 'Fall',
  spring: 'Spring',
};

// Mock invitations
export const mockInvitations: Invitation[] = [
  {
    id: 'inv-1',
    teamName: 'Slam Dunkers',
    invitedBy: 'John Smith',
    sportId: 'fall-3v3-boys',
  },
  {
    id: 'inv-2',
    teamName: 'Blue & Gold',
    invitedBy: 'Mike Johnson',
    sportId: 'fall-5v5-boys',
  },
];