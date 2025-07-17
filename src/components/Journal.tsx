import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Save, Sparkles } from 'lucide-react';

const Journal: React.FC<{ initial: any; animate: any; exit: any; transition: any }> = (props) => {
  const [journalEntry, setJournalEntry] = useState('');
  const [emotionAnalysis, setEmotionAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeEmotion = async () => {
    if (!journalEntry.trim()) {
      alert('Please write something first');
      return;
    }

    setIsAnalyzing(true);
    setEmotionAnalysis(null);

    // Simulate API call
    setTimeout(() => {
      const positiveWords = ['happy', 'joy', 'love', 'great', 'wonderful', 'amazing', 'good', 'excited', 'grateful'];
      const negativeWords = ['sad', 'angry', 'hate', 'bad', 'terrible', 'awful', 'depressed', 'worried', 'anxious'];
      
      let positiveCount = 0;
      let negativeCount = 0;
      
      const words = journalEntry.toLowerCase().split(/\s+/);
      words.forEach(word => {
        if (positiveWords.includes(word)) positiveCount++;
        if (negativeWords.includes(word)) negativeCount++;
      });
      
      let sentiment, emoji, color;
      if (positiveCount > negativeCount) {
        sentiment = 'Positive';
        emoji = '😊';
        color = 'from-green-400 to-green-500';
      } else if (negativeCount > positiveCount) {
        sentiment = 'Negative';
        emoji = '😢';
        color = 'from-red-400 to-red-500';
      } else {
        sentiment = 'Neutral';
        emoji = '😐';
        color = 'from-yellow-400 to-yellow-500';
      }

      setEmotionAnalysis({ sentiment, emoji, color });
      setIsAnalyzing(false);
    }, 1500);
  };

  const saveEntry = () => {
    if (!journalEntry.trim()) {
      alert('Please write something first');
      return;
    }

    const entry = {
      date: new Date().toISOString(),
      text: journalEntry,
      analysis: emotionAnalysis
    };

    const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    entries.push(entry);
    localStorage.setItem('journalEntries', JSON.stringify(entries));

    setJournalEntry('');
    setEmotionAnalysis(null);
    alert('Journal entry saved successfully!');
  };

  return (
    <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8" {...props}>
      {/* Journal Entry Card */}
      <motion.div 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            Daily Journal
          </h2>
        </div>

        <div className="mb-6">
          <label htmlFor="journal-entry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Write your thoughts
          </label>
          <textarea
            id="journal-entry"
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-colors resize-none"
            placeholder="How was your day? What are you grateful for? What's on your mind?"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            onClick={analyzeEmotion}
            disabled={isAnalyzing}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Brain className="w-5 h-5" />
            <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Emotions'}</span>
          </motion.button>
          
          <motion.button
            onClick={saveEntry}
            className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Save className="w-5 h-5" />
            <span>Save Entry</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Emotion Analysis Card */}
      <motion.div 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            Emotion Analysis
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center h-64 lg:h-80 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl mb-4">
          {isAnalyzing ? (
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Analyzing your emotions...</p>
            </motion.div>
          ) : emotionAnalysis ? (
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`w-20 h-20 bg-gradient-to-r ${emotionAnalysis.color} rounded-full flex items-center justify-center mb-4 shadow-lg`}>
                <span className="text-3xl">{emotionAnalysis.emoji}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {emotionAnalysis.sentiment} Sentiment
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                {emotionAnalysis.sentiment === 'Positive' 
                  ? "Your writing radiates positivity! Keep focusing on the good things."
                  : emotionAnalysis.sentiment === 'Negative'
                  ? "It's okay to feel this way. Writing about it is a great first step."
                  : "Your writing shows a balanced perspective on things."
                }
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <div className="text-5xl mb-4">📝</div>
              <p className="text-gray-500 dark:text-gray-400">
                Your emotional analysis will appear here
              </p>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Our AI analyzes your writing to detect emotional patterns and provide insights into your mental state.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Journal;