import React, { createContext, useContext, useState, useCallback, ReactNode, useRef } from 'react';

interface VoiceCommandEventDetail {
  intent: 'navigate' | 'weather' | 'yield' | 'irrigation' | 'market' | 'theme' | 'unknown';
  payload?: any;
}

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
  const recognitionRef = useRef<any | null>(null);

  const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  const ensureRecognition = useCallback(() => {
    if (!isSupported) return null;
    if (recognitionRef.current) return recognitionRef.current;
    const SpeechRecognition: any = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: any) => {
      const phrase = event.results?.[0]?.[0]?.transcript || '';
      setTranscript(phrase);
      handleVoiceCommand(phrase);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    return recognition;
  }, [isSupported]);

  const startListening = useCallback(() => {
    const recognition = ensureRecognition();
    if (!recognition) return;
    try {
      recognition.start();
    } catch {
      // no-op if already started
    }
  }, [ensureRecognition]);

  const stopListening = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      setIsListening(false);
      return;
    }
    try {
      recognition.stop();
    } catch {
      // ignore
    }
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

  const dispatchVoiceEvent = (detail: VoiceCommandEventDetail) => {
    document.dispatchEvent(new CustomEvent<VoiceCommandEventDetail>('voice:command', { detail }));
  };

  const handleVoiceCommand = (command: string) => {
    const lower = command.toLowerCase().trim();

    // Navigation intents
    if (/(go|navigate).*(home)/.test(lower)) {
      dispatchVoiceEvent({ intent: 'navigate', payload: { to: '/' } });
      speak('Navigating to home');
      return;
    }
    if (/(go|navigate).*(dashboard)/.test(lower)) {
      dispatchVoiceEvent({ intent: 'navigate', payload: { to: '/dashboard' } });
      speak('Opening dashboard');
      return;
    }
    if (/predict(or)?|yield.*predict/.test(lower)) {
      dispatchVoiceEvent({ intent: 'navigate', payload: { to: '/yield-predictor' } });
      speak('Opening yield predictor');
      return;
    }
    if (/energy|calculator/.test(lower)) {
      dispatchVoiceEvent({ intent: 'navigate', payload: { to: '/energy-calculator' } });
      speak('Opening energy calculator');
      return;
    }
    if (/market( price| price(s)?)/.test(lower)) {
      dispatchVoiceEvent({ intent: 'navigate', payload: { to: '/market-prices' } });
      speak('Showing market prices');
      return;
    }

    // Feature intents
    if (lower.includes('weather')) {
      dispatchVoiceEvent({ intent: 'weather' });
      speak("Today's weather shows 25 degrees with a chance of rain.");
      return;
    }
    if (lower.includes('yield') || lower.includes('prediction')) {
      dispatchVoiceEvent({ intent: 'yield' });
      speak('Your average predicted yield is 8.5 tons per hectare.');
      return;
    }
    if (lower.includes('irrigation') || lower.includes('water')) {
      dispatchVoiceEvent({ intent: 'irrigation' });
      speak('I recommend irrigating tomorrow morning for 45 minutes.');
      return;
    }
    if (lower.includes('price') || lower.includes('market')) {
      dispatchVoiceEvent({ intent: 'market' });
      speak('Corn is currently at 180 dollars per ton.');
      return;
    }
    if (lower.includes('dark') || lower.includes('light') || lower.includes('theme')) {
      dispatchVoiceEvent({ intent: 'theme', payload: { mode: lower.includes('dark') ? 'dark' : 'light' } });
      speak('Toggling theme');
      return;
    }

    dispatchVoiceEvent({ intent: 'unknown' });
    speak('I can help with navigation, weather, yield, irrigation and market prices.');
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