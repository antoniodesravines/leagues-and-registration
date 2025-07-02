import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import OfferedSports from './components/sports/OfferedSports';
import TeamManagement from './components/teams/TeamManagement';
import CreateTeamForm from './components/teams/CreateTeamForm';
import { AppProvider, useAppContext } from './context/AppContext';

/**
 * AppContent component
 *
 * This component renders the main application UI inside the AppProvider context.
 * It displays:
 * - The header
 * - The navigation tabs
 * - The main content area (either OfferedSports or TeamManagement depending on currentView)
 * - The CreateTeamForm modal if it is open
 *
 * Context:
 * - currentView: which main view is active ('sports' or 'teams')
 * - showCreateTeamForm: whether the create team modal is visible
 * - setShowCreateTeamForm: function to toggle the create team modal
 */
function AppContent() {
  const { currentView, showCreateTeamForm, setShowCreateTeamForm } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Site header */}
      <Header />

      {/* Navigation tabs */}
      <Navigation />

      {/* Main content area */}
      <main className="flex-1 p-4 md:p-6">
        {currentView === 'sports' ? <OfferedSports /> : <TeamManagement />}
      </main>

      {/* Create team modal */}
      {showCreateTeamForm && (
        <CreateTeamForm onClose={() => setShowCreateTeamForm(false)} />
      )}
    </div>
  );
}

/**
 * App component
 *
 * The root component that wraps AppContent in AppProvider context.
 * Provides global state to all children components.
 */
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
