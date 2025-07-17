import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  Globe, 
  Smartphone,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Palette,
  Database,
  Lock
} from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack, darkMode, toggleDarkMode }) => {
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [showSensitiveData, setShowSensitiveData] = useState(false);
  const [language, setLanguage] = useState('English');
  const [theme, setTheme] = useState('System');

  const handleExportData = () => {
    // Simulate data export
    const data = {
      moods: JSON.parse(localStorage.getItem('moods') || '[]'),
      journalEntries: JSON.parse(localStorage.getItem('journalEntries') || '[]'),
      affirmations: JSON.parse(localStorage.getItem('affirmationsHistory') || '[]'),
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mindmate-data-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all your data? This action cannot be undone.')) {
      localStorage.removeItem('moods');
      localStorage.removeItem('journalEntries');
      localStorage.removeItem('affirmationsHistory');
      alert('All data has been cleared successfully.');
    }
  };

  const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => (
    <motion.button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
      }`}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
        layout
      />
    </motion.button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center mb-8">
        <motion.button
          onClick={onBack}
          className="p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 shadow-md mr-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </motion.button>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance Settings */}
        <motion.div 
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Appearance</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                )}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark theme</p>
                </div>
              </div>
              <ToggleSwitch enabled={darkMode} onChange={toggleDarkMode} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Language</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Choose your language</p>
                </div>
              </div>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Notifications Settings */}
        <motion.div 
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Daily mood reminders</p>
                </div>
              </div>
              <ToggleSwitch enabled={notifications} onChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {soundEnabled ? <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-400" /> : <VolumeX className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Sound Effects</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">App sounds and alerts</p>
                </div>
              </div>
              <ToggleSwitch enabled={soundEnabled} onChange={setSoundEnabled} />
            </div>
          </div>
        </motion.div>

        {/* Privacy & Security */}
        <motion.div 
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Privacy & Security</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Data Sharing</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Share anonymous analytics</p>
                </div>
              </div>
              <ToggleSwitch enabled={dataSharing} onChange={setDataSharing} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {showSensitiveData ? <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" /> : <EyeOff className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Show Sensitive Data</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Display mood details in previews</p>
                </div>
              </div>
              <ToggleSwitch enabled={showSensitiveData} onChange={setShowSensitiveData} />
            </div>
          </div>
        </motion.div>

        {/* Data Management */}
        <motion.div 
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Data Management</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Auto Backup</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Automatically backup your data</p>
                </div>
              </div>
              <ToggleSwitch enabled={autoBackup} onChange={setAutoBackup} />
            </div>

            <div className="pt-4 space-y-3">
              <motion.button
                onClick={handleExportData}
                className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4" />
                <span>Export My Data</span>
              </motion.button>

              <motion.button
                onClick={handleClearData}
                className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All Data</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* App Information */}
      <motion.div 
        className="mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">About MindMate</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">Version</p>
            <p className="text-gray-500 dark:text-gray-400">2.1.0</p>
          </div>
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">Last Updated</p>
            <p className="text-gray-500 dark:text-gray-400">January 2024</p>
          </div>
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-300">Data Storage</p>
            <p className="text-gray-500 dark:text-gray-400">Local Device Only</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Settings;