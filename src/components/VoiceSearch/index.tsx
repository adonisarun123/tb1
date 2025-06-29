import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMic, 
  FiMicOff, 
  FiCheck,
  FiAlertCircle
} from 'react-icons/fi';

interface VoiceSearchResult {
  transcript: string;
  confidence: number;
  intent: string;
  entities: Array<{
    type: string;
    value: string;
    confidence: number;
  }>;
  suggestions: string[];
}

interface SearchResult {
  id: string;
  type: 'activity' | 'venue' | 'location';
  name: string;
  description: string;
  confidence: number;
  matchReason: string;
}

interface VoiceSearchProps {
  onSearch?: (query: string) => void;
  onResultSelect?: (result: SearchResult) => void;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ onSearch, onResultSelect: _onResultSelect }) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [_confidence, _setConfidence] = useState(0);
  const [_voiceResult, _setVoiceResult] = useState<VoiceSearchResult | null>(null);
  const [_searchResults, _setSearchResults] = useState<SearchResult[]>([]);
  const [isSupported, setIsSupported] = useState(false);
  const [_showSettings, _setShowSettings] = useState(false);
  const [_volume, _setVolume] = useState(1);
  const [language, _setLanguage] = useState('en-US');
  const [error, setError] = useState<string | null>(null);
  const [_isExpanded, _setIsExpanded] = useState(false);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<any>(null);

  // const _languages = [
  //   { code: 'en-US', name: 'English (US)' },
  //   { code: 'en-IN', name: 'English (India)' },
  //   { code: 'hi-IN', name: 'Hindi' },
  //   { code: 'te-IN', name: 'Telugu' },
  //   { code: 'ta-IN', name: 'Tamil' },
  //   { code: 'kn-IN', name: 'Kannada' }
  // ];

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      initializeSpeechRecognition(SpeechRecognition);
      synthRef.current = SpeechSynthesis;
    } else {
      setError('Speech recognition is not supported in your browser');
    }
  }, []);

  const initializeSpeechRecognition = (SpeechRecognition: any) => {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      setTranscript('');
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (transcript.trim()) {
        processVoiceInput(transcript);
      }
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      setError(`Speech recognition error: ${event.error}`);
    };

    recognitionRef.current = recognition;
  };

  const startListening = () => {
    if (!isSupported || !recognitionRef.current) {
      setError('Speech recognition is not available');
      return;
    }

    try {
      recognitionRef.current.start();
    } catch (error) {
      setError('Could not start speech recognition');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const processVoiceInput = async (input: string) => {
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSearch) {
        onSearch(input);
      }
      
    } catch (error) {
      setError('Failed to process voice input');
    } finally {
      setIsProcessing(false);
    }
  };

  // const extractIntent = (input: string): string => {
  //   // Implementation for future use
  //   return 'general';
  // };

  // const _extractEntities = (input: string): Array<{ type: string; value: string; confidence: number }> => {
  //   // Implementation for future use
  //   return [];
  // };

  // const _generateSuggestions = (input: string): string[] => {
  //   // Implementation for future use
  //   return [];
  // };

  // const _performSearch = async (_query: string, voiceResult: VoiceSearchResult): Promise<SearchResult[]> => {
  //   // Implementation for future use
  //   return [];
  // };

  // const speak = (text: string) => {
  //   // Implementation for future use
  // };

  // const _handleResultSelect = (result: SearchResult) => {
  //   // Implementation for future use
  // };

  // const _getIntentColor = (intent: string) => {
  //   // Implementation for future use
  //   return 'text-gray-600 bg-gray-100';
  // };

  // const _getResultIcon = (type: string) => {
  //   // Implementation for future use
  //   return <FiSearch className="text-gray-500" />;
  // };

  if (!isSupported) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <FiAlertCircle className="text-red-500" />
          <p className="text-red-700">
            Voice search is not supported in your browser.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <FiMic className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-white font-semibold">AI Voice Search</h3>
              <p className="text-white/80 text-sm">Speak naturally to find team building activities</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center space-y-4">
            <div className="relative">
              <button
                onClick={isListening ? stopListening : startListening}
                disabled={isProcessing}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse shadow-lg scale-110'
                    : isProcessing
                    ? 'bg-yellow-500 text-white'
                    : 'bg-[#FF4C39] text-white hover:bg-[#FF6B5A] hover:scale-105'
                } disabled:opacity-50 disabled:cursor-not-allowed shadow-xl`}
              >
                {isProcessing ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
                ) : isListening ? (
                  <FiMicOff size={32} />
                ) : (
                  <FiMic size={32} />
                )}
              </button>
              
              {isListening && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex items-end space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-red-400 rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 20 + 10}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="min-h-[2rem]">
              {isListening && (
                <p className="text-red-600 font-medium animate-pulse">Listening... Speak now</p>
              )}
              {isProcessing && (
                <p className="text-yellow-600 font-medium">Processing your request...</p>
              )}
              {!isListening && !isProcessing && (
                <p className="text-gray-600">
                  {transcript ? 'Click the microphone to search again' : 'Click the microphone and speak your request'}
                </p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <FiAlertCircle className="text-red-500" size={16} />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {transcript && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex items-start space-x-3">
              <FiCheck className="text-green-500 mt-1" size={16} />
              <div className="flex-1">
                <p className="text-gray-900 font-medium">"{transcript}"</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceSearch; 