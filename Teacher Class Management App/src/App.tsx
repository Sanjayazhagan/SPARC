import React, { useState } from 'react';
import { LoginScreen } from './components/login-screen';
import { Dashboard } from './components/dashboard';
import { ClassroomView } from './components/classroom-view';
import { AssignmentCreation } from './components/assignment-creation';
import { StudentSubmissions } from './components/student-submissions';
import { Analytics } from './components/analytics';
import { Settings } from './components/settings';

export type ViewType = 'login' | 'dashboard' | 'classroom' | 'assignment-create' | 'submissions' | 'analytics' | 'settings';

export interface AppState {
  currentView: ViewType;
  isLoggedIn: boolean;
  selectedClassId?: string;
  selectedAssignmentId?: string;
  offlineMode: boolean;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentView: 'login',
    isLoggedIn: false,
    selectedClassId: undefined,
    selectedAssignmentId: undefined,
    offlineMode: true
  });

  const navigateTo = (view: ViewType, classId?: string, assignmentId?: string) => {
    setAppState(prev => ({
      ...prev,
      currentView: view,
      selectedClassId: classId || prev.selectedClassId,
      selectedAssignmentId: assignmentId || prev.selectedAssignmentId
    }));
  };

  const handleLogin = () => {
    setAppState(prev => ({
      ...prev,
      isLoggedIn: true,
      currentView: 'dashboard'
    }));
  };

  const handleLogout = () => {
    setAppState({
      currentView: 'login',
      isLoggedIn: false,
      selectedClassId: undefined,
      selectedAssignmentId: undefined,
      offlineMode: true
    });
  };

  if (!appState.isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderCurrentView = () => {
    switch (appState.currentView) {
      case 'dashboard':
        return <Dashboard navigateTo={navigateTo} />;
      case 'classroom':
        return <ClassroomView classId={appState.selectedClassId} navigateTo={navigateTo} />;
      case 'assignment-create':
        return <AssignmentCreation classId={appState.selectedClassId} navigateTo={navigateTo} />;
      case 'submissions':
        return <StudentSubmissions assignmentId={appState.selectedAssignmentId} navigateTo={navigateTo} />;
      case 'analytics':
        return <Analytics navigateTo={navigateTo} />;
      case 'settings':
        return <Settings navigateTo={navigateTo} onLogout={handleLogout} />;
      default:
        return <Dashboard navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {appState.offlineMode && (
        <div className="bg-orange-500 text-white px-4 py-2 text-center">
          <span className="text-sm">🔌 Offline Mode Active - Changes will sync when connected</span>
        </div>
      )}
      {renderCurrentView()}
    </div>
  );
}