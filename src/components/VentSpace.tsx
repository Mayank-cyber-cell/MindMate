import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Clock, Shield } from 'lucide-react';

interface VentPost {
  id: string;
  message: string;
  timestamp: Date;
}

const VentSpace: React.FC<{ initial: any; animate: any; exit: any; transition: any }> = (props) => {
  const [ventMessage, setVentMessage] = useState('');
  const [posts, setPosts] = useState<VentPost[]>([]);

  useEffect(() => {
    // Initialize with some sample posts
    const samplePosts: VentPost[] = [
      {
        id: '1',
        message: 'Feeling overwhelmed with work and personal life. Just need a break.',
        timestamp: new Date(Date.now() - 2 * 60 * 1000)
      },
      {
        id: '2',
        message: 'Why is it so hard to make friends as an adult?',
        timestamp: new Date(Date.now() - 5 * 60 * 1000)
      },
      {
        id: '3',
        message: 'Having one of those days where everything feels like a struggle.',
        timestamp: new Date(Date.now() - 8 * 60 * 1000)
      }
    ];
    setPosts(samplePosts);
  }, []);

  const postVent = () => {
    if (!ventMessage.trim()) {
      alert('Please write something first');
      return;
    }

    const newPost: VentPost = {
      id: Date.now().toString(),
      message: ventMessage,
      timestamp: new Date()
    };

    setPosts([newPost, ...posts]);
    setVentMessage('');

    // Auto-delete after 10 minutes
    setTimeout(() => {
      setPosts(prev => prev.filter(post => post.id !== newPost.id));
    }, 10 * 60 * 1000);
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes === 0) return 'just now';
    if (minutes === 1) return '1 minute ago';
    return `${minutes} minutes ago`;
  };

  return (
    <motion.div className="max-w-4xl mx-auto" {...props}>
      <motion.div 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
              Anonymous Vent Space
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              A safe space to express your feelings anonymously
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 mb-6 border border-amber-200 dark:border-amber-800">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
              All posts are automatically deleted after 10 minutes
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="vent-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            What's on your mind?
          </label>
          <textarea
            id="vent-message"
            value={ventMessage}
            onChange={(e) => setVentMessage(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-colors resize-none"
            placeholder="Let it out... no judgment here. This is your safe space."
          />
          <div className="flex justify-end mt-3">
            <motion.button
              onClick={postVent}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4" />
              <span>Post Anonymously</span>
            </motion.button>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Recent Vents</span>
          </h3>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {posts.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No vents yet. Be the first to share something.</p>
              </div>
            ) : (
              posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-4 rounded-xl border border-gray-200 dark:border-gray-600"
                >
                  <p className="text-gray-700 dark:text-gray-200 mb-2">{post.message}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{getTimeAgo(post.timestamp)}</span>
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Anonymous</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VentSpace;