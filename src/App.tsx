import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import OfferedSports from './components/sports/OfferedSports';
import TeamManagement from './components/teams/TeamManagement';
import CreateTeamForm from './components/teams/CreateTeamForm';
import { AppProvider, useAppContext } from './context/AppContext';

function AppContent() {
  const { currentView, showCreateTeamForm, setShowCreateTeamForm } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Navigation />
      <main className="flex-1 p-4 md:p-6">
        {currentView === 'sports' ? <OfferedSports /> : <TeamManagement />}
      </main>
      {showCreateTeamForm && (
        <CreateTeamForm onClose={() => setShowCreateTeamForm(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;