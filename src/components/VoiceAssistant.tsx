import React, { useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useVoice } from '../context/VoiceContext';
import { motion, AnimatePresence } from 'framer-motion';

const VoiceAssistant = () => {
  const { isListening, isSupported, transcript, startListening, stopListening, speak, isSpeaking } = useVoice();
  const [isOpen, setIsOpen] = useState(false);

  if (!isSupported) {
    return null;
  }

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <>
      {/* Voice Assistant Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-all duration-200"
        aria-label="Voice Assistant"
      >
        <Mic className="h-5 w-5" />
        {(isListening || isSpeaking) && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        )}
      </button>

      {/* Voice Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 w-full max-w-md transition-colors duration-300"
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Voice Assistant
                </h3>
                
                {/* Voice Visualization */}
                <div className="mb-6">
                  <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                    isListening ? 'bg-red-100 dark:bg-red-900/20' : 
                    isSpeaking ? 'bg-blue-100 dark:bg-blue-900/20' : 
                    'bg-emerald-100 dark:bg-emerald-900/20'
                  }`}>
                    {isListening ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        <Mic className="h-8 w-8 text-red-600 dark:text-red-400" />
                      </motion.div>
                    ) : isSpeaking ? (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                      >
                        <Volume2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                    ) : (
                      <Mic className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    )}
                  </div>
                </div>

                {/* Status Text */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {isListening ? 'Listening... Speak now' :
                   isSpeaking ? 'Speaking...' :
                   'Click to start voice command'}
                </p>

                {/* Transcript */}
                {transcript && (
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-3 mb-4 transition-colors duration-300">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      "{transcript}"
                    </p>
                  </div>
                )}

                {/* Control Buttons */}
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleToggleListening}
                    disabled={isSpeaking}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isListening
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isListening ? (
                      <>
                        <MicOff className="h-4 w-4 inline mr-2" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4 inline mr-2" />
                        Start
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>

                {/* Quick Commands */}
                <div className="mt-6 text-left">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Try saying:
                  </h4>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• "What's the weather forecast?"</li>
                    <li>• "Show me yield predictions"</li>
                    <li>• "When should I irrigate?"</li>
                    <li>• "What are current crop prices?"</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceAssistant;