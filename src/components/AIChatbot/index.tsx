import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMessageCircle, 
  FiX, 
  FiSend, 
  FiMic, 
  FiMicOff, 
  FiUser, 
  FiPhone,
  FiThumbsUp,
  FiThumbsDown,
  FiRefreshCw,
  FiCpu
} from 'react-icons/fi';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AIChatbotProps {
  userProfile?: any;
  onEscalateToHuman?: () => void;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ userProfile: _userProfile, onEscalateToHuman }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickSuggestions = [
    "I need team building activities for 25 people",
    "What are your most popular corporate experiences?",
    "Show me virtual team building options",
    "I want to book a venue in Bangalore",
    "What's the pricing for outdoor activities?",
    "Can you recommend activities for remote teams?"
  ];

  const greetingMessages = [
    "Hi! I'm here to help you find the perfect team building experience. What are you looking for?",
    "Welcome to Trebound! How can I assist you with your team building needs today?",
    "Hello! Ready to discover amazing team building activities for your team?"
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = greetingMessages[Math.floor(Math.random() * greetingMessages.length)];
      setMessages([{
        id: Date.now().toString(),
        type: 'ai',
        content: greeting,
        timestamp: new Date()
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setShowSuggestions(false);

    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse: ChatMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: `Thank you for your question about "${userMessage.content}". I'd be happy to help you find the perfect team building solution! For the best personalized recommendations, please connect with our team at +91-9899906230 or contact@trebound.com.`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setShowFeedback(aiResponse.id);
    } catch (error) {
      console.error('Chatbot error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleFeedback = (messageId: string, isPositive: boolean) => {
    console.log('Feedback:', messageId, isPositive);
    setShowFeedback(null);
  };

  const handleEscalateToHuman = () => {
    if (onEscalateToHuman) {
      onEscalateToHuman();
    } else {
      const escalationMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: 'I\'m connecting you with our team building experts. You can reach us at +91-9899906230 or contact@trebound.com for immediate assistance.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, escalationMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open AI chat assistant"
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all duration-300"
          >
            <FiMessageCircle size={24} />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '60px' : '600px'
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <FiCpu size={18} />
                </div>
                <div>
                  <h3 className="font-semibold">Trebound AI Assistant</h3>
                  <p className="text-xs opacity-90">
                    {isTyping ? 'Typing...' : 'Online • Ready to help'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <FiRefreshCw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <FiX size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Container */}
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === 'user' 
                            ? 'bg-[#FF4C39] text-white' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {message.type === 'user' ? <FiUser size={14} /> : <FiCpu size={14} />}
                        </div>

                        <div className={`relative ${message.type === 'user' ? 'mr-2' : 'ml-2'}`}>
                          <div className={`p-3 rounded-2xl ${
                            message.type === 'user'
                              ? 'bg-[#FF4C39] text-white rounded-br-md'
                              : 'bg-gray-100 text-gray-800 rounded-bl-md'
                          }`}>
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 px-1">
                            {formatMessageTime(message.timestamp)}
                          </p>

                          {message.type === 'ai' && showFeedback === message.id && (
                            <div className="flex items-center space-x-2 mt-2">
                              <button
                                onClick={() => handleFeedback(message.id, true)}
                                className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                              >
                                <FiThumbsUp size={12} />
                              </button>
                              <button
                                onClick={() => handleFeedback(message.id, false)}
                                className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                              >
                                <FiThumbsDown size={12} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-end space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <FiCpu size={14} className="text-gray-600" />
                        </div>
                        <div className="bg-gray-100 rounded-2xl rounded-bl-md p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {showSuggestions && messages.length <= 1 && (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500 font-medium">Quick suggestions:</p>
                      {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleEscalateToHuman}
                        className="flex items-center space-x-1 text-xs text-gray-600 hover:text-[#FF4C39] transition-colors"
                      >
                        <FiPhone size={12} />
                        <span>Talk to Human</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setMessages([]);
                          setShowSuggestions(true);
                        }}
                        className="text-xs text-gray-600 hover:text-[#FF4C39] transition-colors"
                      >
                        Clear Chat
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about team building activities..."
                        className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4C39] focus:border-transparent"
                        disabled={isTyping}
                      />
                      <button
                        onClick={() => setIsListening(!isListening)}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded transition-colors ${
                          isListening 
                            ? 'text-red-500 animate-pulse' 
                            : 'text-gray-400 hover:text-[#FF4C39]'
                        }`}
                      >
                        {isListening ? <FiMicOff size={16} /> : <FiMic size={16} />}
                      </button>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="p-3 bg-[#FF4C39] text-white rounded-lg hover:bg-[#FF6B5A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiSend size={16} />
                    </button>
                  </div>

                  {isListening && (
                    <div className="mt-2 text-xs text-center text-red-500 flex items-center justify-center space-x-1">
                      <FiMic size={12} />
                      <span>Listening... Speak now</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot; 