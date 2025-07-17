import React, { useState, useEffect } from 'react';
import { Moon, Sun, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import MoodTracker from './components/MoodTracker';
import Journal from './components/Journal';
import VentSpace from './components/VentSpace';
import Affirmations from './components/Affirmations';
import BreathingExercise from './components/BreathingExercise';
import Profile from './components/Profile';
import Settings from './components/Settings';
import HelpSupport from './components/HelpSupport';

export type TabType = 'mood' | 'journal' | 'vent' | 'affirmations' | 'breathing';
export type ViewType = 'main' | 'profile' | 'settings' | 'help';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('mood');
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved dark mode preference or system preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      return savedDarkMode === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('main');

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      // Clear any stored data
      localStorage.removeItem('moods');
      localStorage.removeItem('journalEntries');
      localStorage.removeItem('affirmationsHistory');
      // In a real app, you would redirect to login page
      alert('You have been signed out successfully!');
      setCurrentView('main');
    }
  };

  const renderTabContent = () => {
    const tabProps = {
      key: activeTab,
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
      transition: { duration: 0.3 }
    };

    switch (activeTab) {
      case 'mood':
        return <MoodTracker {...tabProps} />;
      case 'journal':
        return <Journal {...tabProps} />;
      case 'vent':
        return <VentSpace {...tabProps} />;
      case 'affirmations':
        return <Affirmations {...tabProps} />;
      case 'breathing':
        return <BreathingExercise {...tabProps} />;
      default:
        return <MoodTracker {...tabProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          currentView={currentView}
          setCurrentView={setCurrentView}
          onSignOut={handleSignOut}
        />
        
        <main className="mt-8">
          {currentView === 'profile' ? (
            <Profile onBack={() => setCurrentView('main')} />
          ) : currentView === 'settings' ? (
            <Settings onBack={() => setCurrentView('main')} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          ) : currentView === 'help' ? (
            <HelpSupport onBack={() => setCurrentView('main')} />
          ) : (
            <>
              <TabNavigation 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
              />
              
              <div className="mt-6 sm:mt-8">
                <AnimatePresence mode="wait">
                  <motion.div>
                    {renderTabContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          )}
        </main>

        {/* Made with love by Mayank */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Made with <span className="text-red-500 animate-pulse">❤️</span> by{' '}
              <span className="font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mayank
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;