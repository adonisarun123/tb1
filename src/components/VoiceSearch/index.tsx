import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMic, 
  FiMicOff, 
  FiSearch, 
  FiVolumeX, 
  FiVolume2,
  FiSettings,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiActivity,
  FiMapPin,
  FiUsers,
  FiClock,
  FiStar
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

const VoiceSearch: React.FC<VoiceSearchProps> = ({ onSearch, onResultSelect }) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [voiceResult, setVoiceResult] = useState<VoiceSearchResult | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSupported, setIsSupported] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(1);
  const [language, setLanguage] = useState('en-US');
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<any>(null);

  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-IN', name: 'English (India)' },
    { code: 'hi-IN', name: 'Hindi' },
    { code: 'te-IN', name: 'Telugu' },
    { code: 'ta-IN', name: 'Tamil' },
    { code: 'kn-IN', name: 'Kannada' }
  ];

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

  const extractIntent = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (/find|search|looking for|show me|need/.test(lowerInput)) return 'search';
    if (/book|reserve|schedule/.test(lowerInput)) return 'booking';
    if (/price|cost|budget/.test(lowerInput)) return 'pricing';
    if (/location|where|near/.test(lowerInput)) return 'location';
    if (/help|support|contact/.test(lowerInput)) return 'help';
    
    return 'general';
  };

  const extractEntities = (input: string): Array<{ type: string; value: string; confidence: number }> => {
    const entities = [];
    const lowerInput = input.toLowerCase();
    
    // Extract numbers (likely group sizes)
    const numbers = input.match(/\d+/g);
    if (numbers) {
      entities.push({
        type: 'group_size',
        value: numbers[0],
        confidence: 0.9
      });
    }
    
    // Extract locations
    const locations = ['bangalore', 'mumbai', 'delhi', 'hyderabad', 'chennai', 'pune'];
    for (const location of locations) {
      if (lowerInput.includes(location)) {
        entities.push({
          type: 'location',
          value: location,
          confidence: 0.85
        });
      }
    }
    
    // Extract activity types
    const activityTypes = ['virtual', 'outdoor', 'indoor', 'cooking', 'sports', 'creative'];
    for (const type of activityTypes) {
      if (lowerInput.includes(type)) {
        entities.push({
          type: 'activity_type',
          value: type,
          confidence: 0.8
        });
      }
    }
    
    return entities;
  };

  const generateSuggestions = (input: string): string[] => {
    const intent = extractIntent(input);
    
    switch (intent) {
      case 'search':
        return [
          'Try: "Find virtual team building activities"',
          'Try: "Show outdoor activities for 25 people"',
          'Try: "Search cooking workshops in Bangalore"'
        ];
      case 'booking':
        return [
          'Try: "Book escape room for next Friday"',
          'Try: "Reserve venue for 50 people"'
        ];
      case 'pricing':
        return [
          'Try: "What\'s the price for virtual activities"',
          'Try: "Budget for team of 30 people"'
        ];
      default:
        return [
          'Try speaking more clearly',
          'Use specific terms like "virtual", "outdoor", or location names'
        ];
    }
  };

  const performSearch = async (query: string, voiceResult: VoiceSearchResult): Promise<SearchResult[]> => {
    // Mock search implementation
    const mockResults: SearchResult[] = [
      {
        id: 'virtual-escape-room',
        type: 'activity',
        name: 'Virtual Escape Room Challenge',
        description: 'Immersive online puzzle-solving experience',
        confidence: 0.92,
        matchReason: 'Matches "virtual" keyword and team activity intent'
      },
      {
        id: 'cooking-workshop',
        type: 'activity',
        name: 'Corporate Cooking Workshop',
        description: 'Interactive culinary team building experience',
        confidence: 0.78,
        matchReason: 'Relevant team building activity'
      },
      {
        id: 'bangalore-venues',
        type: 'location',
        name: 'Bangalore Team Outing Venues',
        description: 'Best venues for corporate team outings in Bangalore',
        confidence: 0.85,
        matchReason: 'Location-based match'
      }
    ];
    
    // Filter based on entities
    const locationEntity = voiceResult.entities.find(e => e.type === 'location');
    const activityTypeEntity = voiceResult.entities.find(e => e.type === 'activity_type');
    
    return mockResults.filter(result => {
      if (locationEntity && result.type === 'location') {
        return result.name.toLowerCase().includes(locationEntity.value);
      }
      if (activityTypeEntity && result.type === 'activity') {
        return result.description.toLowerCase().includes(activityTypeEntity.value);
      }
      return true;
    }).slice(0, 5);
  };

  const speak = (text: string) => {
    if (synthRef.current && volume > 0) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = volume;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      synthRef.current.speak(utterance);
    }
  };

  const handleResultSelect = (result: SearchResult) => {
    if (onResultSelect) {
      onResultSelect(result);
    }
    
    // Provide voice feedback
    if (volume > 0) {
      speak(`Selected ${result.name}`);
    }
  };

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case 'search': return 'text-blue-600 bg-blue-100';
      case 'booking': return 'text-green-600 bg-green-100';
      case 'pricing': return 'text-purple-600 bg-purple-100';
      case 'location': return 'text-orange-600 bg-orange-100';
      case 'help': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'activity': return <FiActivity className="text-blue-500" />;
      case 'venue': return <FiMapPin className="text-green-500" />;
      case 'location': return <FiMapPin className="text-orange-500" />;
      default: return <FiSearch className="text-gray-500" />;
    }
  };

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