import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Save, TrendingUp, Calendar } from 'lucide-react';
import Chart from 'chart.js/auto';

const MoodTracker: React.FC<{ initial: any; animate: any; exit: any; transition: any }> = (props) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodNote, setMoodNote] = useState('');
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const moods = [
    { value: 1, emoji: '😢', label: 'Very Sad', color: 'from-red-400 to-red-500' },
    { value: 2, emoji: '😞', label: 'Sad', color: 'from-orange-400 to-orange-500' },
    { value: 3, emoji: '😐', label: 'Neutral', color: 'from-yellow-400 to-yellow-500' },
    { value: 4, emoji: '😊', label: 'Happy', color: 'from-green-400 to-green-500' },
    { value: 5, emoji: '😁', label: 'Very Happy', color: 'from-blue-400 to-blue-500' },
  ];

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Destroy existing chart
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        // Create new chart
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
              label: 'Mood Level',
              data: [3, 4, 3, 5, 4, 2, 4],
              borderColor: '#8b5cf6',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              tension: 0.4,
              fill: true,
              pointBackgroundColor: '#8b5cf6',
              pointBorderColor: '#ffffff',
              pointBorderWidth: 2,
              pointRadius: 6,
              pointHoverRadius: 8,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: false,
                min: 1,
                max: 5,
                ticks: {
                  stepSize: 1,
                  callback: function(value) {
                    const emojis = ['😢', '😞', '😐', '😊', '😁'];
                    return emojis[Number(value) - 1];
                  }
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)'
                }
              },
              x: {
                grid: {
                  display: false
                }
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const handleMoodSelect = (mood: number) => {
    setSelectedMood(mood);
  };

  const handleSaveMood = () => {
    if (!selectedMood) {
      alert('Please select a mood first');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const moodData = {
      date: today,
      mood: selectedMood,
      note: moodNote
    };

    const moods = JSON.parse(localStorage.getItem('moods') || '[]');
    const existingIndex = moods.findIndex((entry: any) => entry.date === today);
    
    if (existingIndex >= 0) {
      moods[existingIndex] = moodData;
    } else {
      moods.push(moodData);
    }

    localStorage.setItem('moods', JSON.stringify(moods));
    
    // Reset form
    setSelectedMood(null);
    setMoodNote('');
    
    // Show success message
    alert('Mood saved successfully!');
  };

  return (
    <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8" {...props}>
      {/* Mood Input Card */}
      <motion.div 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            How are you feeling today?
          </h2>
        </div>

        <div className="grid grid-cols-5 gap-3 mb-6">
          {moods.map((mood) => (
            <motion.button
              key={mood.value}
              onClick={() => handleMoodSelect(mood.value)}
              className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-200 ${
                selectedMood === mood.value
                  ? `bg-gradient-to-r ${mood.color} shadow-lg scale-105`
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl lg:text-3xl mb-1">{mood.emoji}</span>
              <span className={`text-xs font-medium ${
                selectedMood === mood.value ? 'text-white' : 'text-gray-600 dark:text-gray-400'
              }`}>
                {mood.label}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="mb-6">
          <label htmlFor="mood-note" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Add a note (optional)
          </label>
          <textarea
            id="mood-note"
            value={moodNote}
            onChange={(e) => setMoodNote(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-colors resize-none"
            placeholder="What's influencing your mood today?"
          />
        </div>

        <motion.button
          onClick={handleSaveMood}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Save className="w-5 h-5" />
          <span>Save Mood</span>
        </motion.button>
      </motion.div>

      {/* Mood Chart Card */}
      <motion.div 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            Your Mood History
          </h2>
        </div>

        <div className="h-64 lg:h-80 mb-4">
          <canvas ref={chartRef}></canvas>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Track your emotional patterns over time to gain insights into your mental wellbeing.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MoodTracker;