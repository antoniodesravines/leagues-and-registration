export interface Sport {
  id: string;
  name: string;
  gender: string;
  season: 'fall' | 'spring';
  teamSize: number;
  maxTeams: number;
  registeredTeams: number;
  registrationOpen: boolean;
  teams: Team[];
}

export interface Team {
  id: string;
  name: string;
  joinType: 'open' | 'invite';
  members: number;
  maxMembers: number;
  isActive: boolean;
  inviteSent?: boolean;
}

export interface Invitation {
  id: string;
  teamName: string;
  invitedBy: string;
  sportId: string;
}