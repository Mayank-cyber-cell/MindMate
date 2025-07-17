import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Heart, 
  BookOpen, 
  TrendingUp,
  Award,
  Edit3,
  Camera
} from 'lucide-react';

interface ProfileProps {
  onBack?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'January 2024',
    bio: 'Mental health advocate and mindfulness enthusiast. Passionate about personal growth and helping others on their wellness journey.',
    streak: 15,
    totalEntries: 47,
    moodAverage: 4.2
  });

  const stats = [
    {
      icon: Heart,
      label: 'Current Streak',
      value: `${profileData.streak} days`,
      color: 'from-red-400 to-pink-500'
    },
    {
      icon: BookOpen,
      label: 'Journal Entries',
      value: profileData.totalEntries,
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: TrendingUp,
      label: 'Avg Mood',
      value: `${profileData.moodAverage}/5`,
      color: 'from-green-400 to-teal-500'
    },
    {
      icon: Award,
      label: 'Achievements',
      value: '12',
      color: 'from-yellow-400 to-orange-500'
    }
  ];

  const achievements = [
    { name: 'First Entry', description: 'Completed your first journal entry', earned: true },
    { name: 'Week Warrior', description: 'Tracked mood for 7 consecutive days', earned: true },
    { name: 'Mindful Master', description: 'Completed 10 breathing exercises', earned: true },
    { name: 'Positive Vibes', description: 'Maintained positive mood for 5 days', earned: false },
    { name: 'Monthly Milestone', description: 'Used the app for 30 days', earned: false },
    { name: 'Zen Master', description: 'Completed 50 breathing exercises', earned: false }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save to backend/localStorage here
  };

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
          Profile
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info Card */}
        <motion.div 
          className="lg:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <User className="w-10 h-10 text-white" />
                </div>
                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all">
                  <Camera className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="text-2xl font-bold bg-transparent border-b-2 border-purple-500 focus:outline-none text-gray-900 dark:text-white"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {profileData.name}
                  </h2>
                )}
                <p className="text-gray-600 dark:text-gray-400">
                  Member since {profileData.joinDate}
                </p>
              </div>
            </div>
            <motion.button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </motion.button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-500" />
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="flex-1 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 text-gray-700 dark:text-gray-200"
                />
              ) : (
                <span className="text-gray-700 dark:text-gray-200">{profileData.email}</span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-500" />
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  className="flex-1 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 text-gray-700 dark:text-gray-200"
                />
              ) : (
                <span className="text-gray-700 dark:text-gray-200">{profileData.phone}</span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                  className="flex-1 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 text-gray-700 dark:text-gray-200"
                />
              ) : (
                <span className="text-gray-700 dark:text-gray-200">{profileData.location}</span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 dark:text-gray-200">Joined {profileData.joinDate}</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">About</h3>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                rows={3}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white resize-none"
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-400">{profileData.bio}</p>
            )}
          </div>
        </motion.div>

        {/* Stats Card */}
        <motion.div 
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Your Stats</h3>
          <div className="space-y-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl"
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Achievements Section */}
      <motion.div 
        className="mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className={`p-4 rounded-xl border-2 transition-all ${
                achievement.earned
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800'
                  : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`p-2 rounded-lg ${
                  achievement.earned 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}>
                  <Award className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {achievement.name}
                </h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {achievement.description}
              </p>
              {achievement.earned && (
                <div className="mt-2">
                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded-full">
                    Earned
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;