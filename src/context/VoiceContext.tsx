import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface VoiceContextType {
  isListening: boolean;
  isSupported: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string, lang?: string) => void;
  isSpeaking: boolean;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function VoiceProvider({ children }: { children: ReactNode }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  const startListening = useCallback(() => {
    if (!isSupported) return;

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTranscript(transcript);
      handleVoiceCommand(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }, [isSupported]);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  const speak = useCallback((text: string, lang: string = 'en-US') => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  }, []);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('weather')) {
      speak('Today\'s weather shows 25 degrees Celsius with 60% chance of rain. Perfect conditions for your corn crop.');
    } else if (lowerCommand.includes('yield') || lowerCommand.includes('prediction')) {
      speak('Your corn yield prediction is 8.5 tons per hectare this season, which is 15% above average.');
    } else if (lowerCommand.includes('irrigation') || lowerCommand.includes('water')) {
      speak('Based on soil moisture levels, I recommend irrigating your north field tomorrow morning for 45 minutes.');
    } else if (lowerCommand.includes('price') || lowerCommand.includes('market')) {
      speak('Current corn prices are $180 per ton. This is a good time to consider selling your harvest.');
    } else {
      speak('I can help you with weather forecasts, yield predictions, irrigation advice, and market prices. What would you like to know?');
    }
  };

  return (
    <VoiceContext.Provider
      value={{
        isListening,
        isSupported,
        transcript,
        startListening,
        stopListening,
        speak,
        isSpeaking,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
}