import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone, 
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Heart,
  Shield,
  Book,
  Users,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface HelpSupportProps {
  onBack: () => void;
}

const HelpSupport: React.FC<HelpSupportProps> = ({ onBack }) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      question: "How do I track my mood effectively?",
      answer: "To track your mood effectively, try to log your mood at the same time each day. Be honest about how you're feeling and add notes about what might be influencing your mood. Look for patterns over time to better understand your emotional wellbeing."
    },
    {
      question: "Is my data private and secure?",
      answer: "Yes, all your data is stored locally on your device and is never shared with third parties. We take your privacy seriously and don't collect any personal information without your explicit consent."
    },
    {
      question: "How often should I use the breathing exercises?",
      answer: "You can use breathing exercises as often as you like. Many users find it helpful to do a 5-10 minute session in the morning and evening, or whenever they feel stressed or anxious."
    },
    {
      question: "Can I export my mood data?",
      answer: "Yes! You can export all your data from the Settings page. This includes your mood history, journal entries, and affirmations. The data is exported in JSON format."
    },
    {
      question: "What should I do if I'm having thoughts of self-harm?",
      answer: "If you're having thoughts of self-harm, please reach out for immediate help. Contact a crisis helpline, go to your nearest emergency room, or call emergency services. MindMate is a wellness tool and not a substitute for professional mental health care."
    },
    {
      question: "How do I reset my data?",
      answer: "You can clear all your data from the Settings page under Data Management. Please note that this action cannot be undone, so make sure to export your data first if you want to keep it."
    }
  ];

  const emergencyContacts = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "24/7 text-based crisis support"
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Mental health and substance abuse"
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
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
          Help & Support
        </h1>
      </div>

      {/* Emergency Support Banner */}
      <motion.div 
        className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-red-800 dark:text-red-200 mb-2">Need Immediate Help?</h3>
            <p className="text-red-700 dark:text-red-300 text-sm mb-3">
              If you're experiencing a mental health crisis or having thoughts of self-harm, please reach out for immediate professional help.
            </p>
            <div className="space-y-2">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                  <div>
                    <p className="font-medium text-red-800 dark:text-red-200">{contact.name}</p>
                    <p className="text-sm text-red-600 dark:text-red-400">{contact.description}</p>
                  </div>
                  <span className="font-bold text-red-800 dark:text-red-200">{contact.number}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQ Section */}
        <motion.div 
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 pb-4"
                  >
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <select
                id="subject"
                value={contactForm.subject}
                onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">Select a subject</option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="support">General Support</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white resize-none"
                placeholder="Describe your issue or question..."
                required
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Resources Section */}
      <motion.div 
        className="mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
            <Book className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Mental Health Resources</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-2 mb-2">
              <Heart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-medium text-blue-800 dark:text-blue-200">Mental Health America</h3>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
              Comprehensive mental health resources and support
            </p>
            <a href="#" className="text-blue-600 dark:text-blue-400 text-sm flex items-center hover:underline">
              Visit Website <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h3 className="font-medium text-green-800 dark:text-green-200">NAMI</h3>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300 mb-2">
              National Alliance on Mental Illness support groups
            </p>
            <a href="#" className="text-green-600 dark:text-green-400 text-sm flex items-center hover:underline">
              Find Support <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="font-medium text-purple-800 dark:text-purple-200">Crisis Resources</h3>
            </div>
            <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">
              24/7 crisis intervention and suicide prevention
            </p>
            <a href="#" className="text-purple-600 dark:text-purple-400 text-sm flex items-center hover:underline">
              Get Help Now <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div 
        className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-center">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Need More Help?</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Our support team is here to help you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">support@mindmate.app</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">1-800-MINDMATE</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HelpSupport;