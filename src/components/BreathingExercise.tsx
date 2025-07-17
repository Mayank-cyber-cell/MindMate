import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Wind, Play, Square, Volume2, Info } from 'lucide-react';

const BreathingExercise: React.FC<{ initial: any; animate: any; exit: any; transition: any }> = (props) => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [selectedSound, setSelectedSound] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const breathingTechniques = [
    {
      name: '4-7-8 Breathing',
      description: 'Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Repeat 4 times.',
      icon: '🌙',
      benefit: 'Great for relaxation and sleep'
    },
    {
      name: 'Box Breathing',
      description: 'Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds.',
      icon: '📦',
      benefit: 'Helps with focus and stress relief'
    },
    {
      name: 'Equal Breathing',
      description: 'Inhale and exhale for equal counts (e.g., 5 seconds each).',
      icon: '⚖️',
      benefit: 'Balances the nervous system'
    }
  ];

  const backgroundSounds = [
    { name: 'Ocean Waves', icon: '🌊' },
    { name: 'Forest Rain', icon: '🌲' },
    { name: 'White Noise', icon: '🔊' },
    { name: 'Tibetan Bowl', icon: '🎵' }
  ];

  useEffect(() => {
    if (isBreathing) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          const newSeconds = prev + 1;
          
          // Simple breathing cycle: 4 seconds inhale, 4 seconds exhale
          const cyclePosition = newSeconds % 8;
          if (cyclePosition < 4) {
            setBreathPhase('inhale');
          } else {
            setBreathPhase('exhale');
          }
          
          return newSeconds;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isBreathing]);

  const startBreathing = () => {
    setIsBreathing(true);
    setSeconds(0);
    setBreathPhase('inhale');
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    setSeconds(0);
    setBreathPhase('inhale');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const getBreathingInstruction = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'Breathe in slowly through your nose';
      case 'exhale':
        return 'Breathe out slowly through your mouth';
      default:
        return 'Focus on your breath';
    }
  };

  const getBreathingText = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'Breathe In';
      case 'exhale':
        return 'Breathe Out';
      default:
        return 'Breathe';
    }
  };

  return (
    <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8" {...props}>
      {/* Breathing Exercise Card */}
      <motion.div 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl">
            <Wind className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            Guided Breathing
          </h2>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="relative w-48 h-48 lg:w-64 lg:h-64 mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-r from-blue-400 to-teal-400"
                animate={{
                  scale: breathPhase === 'inhale' ? 1.2 : 0.8,
                  opacity: breathPhase === 'inhale' ? 1 : 0.7
                }}
                transition={{
                  duration: 4,
                  repeat: isBreathing ? Infinity : 0,
                  ease: "easeInOut"
                }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-lg lg:text-xl font-bold text-center">
                {getBreathingText()}
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {getBreathingInstruction()}
            </p>
            <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              {formatTime(seconds)}
            </div>
          </div>

          <div className="flex space-x-4">
            <motion.button
              onClick={startBreathing}
              disabled={isBreathing}
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-5 h-5" />
              <span>Start</span>
            </motion.button>
            
            <motion.button
              onClick={stopBreathing}
              disabled={!isBreathing}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 dark:text-gray-200 font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Square className="w-5 h-5" />
              <span>Stop</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Techniques and Sounds Card */}
      <motion.div 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
            <Info className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            Breathing Techniques
          </h2>
        </div>

        <div className="space-y-4 mb-8">
          {breathingTechniques.map((technique, index) => (
            <motion.div
              key={technique.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-4 rounded-xl border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{technique.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {technique.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {technique.description}
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                    {technique.benefit}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Background Sounds
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {backgroundSounds.map((sound) => (
              <motion.button
                key={sound.name}
                onClick={() => setSelectedSound(selectedSound === sound.name ? null : sound.name)}
                className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  selectedSound === sound.name
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{sound.icon}</span>
                <span>{sound.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BreathingExercise;