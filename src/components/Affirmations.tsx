import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Heart, History } from 'lucide-react';

interface Affirmation {
  id: string;
  text: string;
  timestamp: Date;
}

const Affirmations: React.FC<{ initial: any; animate: any; exit: any; transition: any }> = (props) => {
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const [currentEmoji, setCurrentEmoji] = useState('💖');
  const [history, setHistory] = useState<Affirmation[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const affirmations = [
    "I am worthy of love and respect.",
    "I choose to focus on what I can control.",
    "My challenges help me grow stronger every day.",
    "I am enough just as I am.",
    "I release what no longer serves me.",
    "I trust in my ability to figure things out.",
    "My mind is calm and my heart is at peace.",
    "I am open to the joy and abundance around me.",
    "I forgive myself and set myself free.",
    "I am creating a life I love.",
    "My potential is limitless.",
    "I choose to see the good in myself and others.",
    "I am resilient and can handle whatever comes my way.",
    "I am proud of how far I've come.",
    "I deserve happiness and fulfillment.",
    "I am grateful for this moment and all it offers.",
    "I trust the process of my journey.",
    "I am becoming the person I'm meant to be.",
    "My voice matters and my story is important.",
    "I choose peace over worry, love over fear."
  ];

  const positiveEmojis = ['💖', '🌟', '✨', '🌻', '🌈', '🌞', '🌸', '💫', '🦋', '🌺'];

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const savedHistory = JSON.parse(localStorage.getItem('affirmationsHistory') || '[]');
    const parsedHistory = savedHistory.map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp)
    }));
    setHistory(parsedHistory.sort((a: Affirmation, b: Affirmation) => b.timestamp.getTime() - a.timestamp.getTime()));
  };

  const generateAffirmation = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
      const randomEmoji = positiveEmojis[Math.floor(Math.random() * positiveEmojis.length)];
      
      setCurrentAffirmation(randomAffirmation);
      setCurrentEmoji(randomEmoji);
      setIsGenerating(false);

      // Save to history
      const newAffirmation: Affirmation = {
        id: Date.now().toString(),
        text: randomAffirmation,
        timestamp: new Date()
      };

      const updatedHistory = [newAffirmation, ...history].slice(0, 10);
      setHistory(updatedHistory);
      
      localStorage.setItem('affirmationsHistory', JSON.stringify(updatedHistory));
    }, 800);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8" {...props}>
      {/* Affirmation Generator Card */}
      <motion.div 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            Daily Affirmation
          </h2>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-8 mb-6 min-h-[300px]">
          {isGenerating ? (
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Generating your affirmation...</p>
            </motion.div>
          ) : currentAffirmation ? (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-6">{currentEmoji}</div>
              <p className="text-lg lg:text-xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                {currentAffirmation}
              </p>
            </motion.div>
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-6">💖</div>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Click the button below to generate your daily affirmation
              </p>
            </div>
          )}
        </div>

        <motion.button
          onClick={generateAffirmation}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Generating...' : 'Generate Affirmation'}</span>
        </motion.button>
      </motion.div>

      {/* Affirmation History Card */}
      <motion.div 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
            <History className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            Your Affirmations
          </h2>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {history.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Heart className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No affirmations yet. Generate your first one!</p>
            </div>
          ) : (
            history.map((affirmation, index) => (
              <motion.div
                key={affirmation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-4 rounded-xl border border-gray-200 dark:border-gray-600"
              >
                <p className="text-gray-700 dark:text-gray-200 mb-2 font-medium">
                  {affirmation.text}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(affirmation.timestamp)}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Affirmations;