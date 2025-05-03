"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import ProtectedRoute from '../../../components/ProtectedRoute';

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
};

type ChatHistoryItem = {
  id: number;
  title: string;
  date: Date;
};

export default function NewChatPage() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionName, setSessionName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Mock chat history
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([
    { id: 1, title: 'Property Law Questions', date: new Date(Date.now() - 86400000) },
    { id: 2, title: 'Business Registration', date: new Date(Date.now() - 172800000) },
    { id: 3, title: 'Employment Contract', date: new Date(Date.now() - 259200000) },
  ]);

  // Add welcome message when component mounts
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          sender: 'bot',
          text: 'مرحبا! أنا مساعدك القانوني المغربي. كيف يمكنني مساعدتك اليوم؟\n\nBonjour! Je suis votre assistant juridique marocain. Comment puis-je vous aider aujourd\'hui?\n\nHello! I\'m your Moroccan legal assistant. How can I help you today?',
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      // In a real app, this would be an API call to your AI backend
      const botResponse = generateMockResponse(input);
      
      const botMessageObj: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessageObj]);
      setIsLoading(false);

      // If this is the first user message, suggest a session name
      if (messages.length === 1 && !sessionName) {
        // Extract a session name from the user's first message
        let suggestedName = input.split(' ').slice(0, 3).join(' ');
        if (suggestedName.length > 30) {
          suggestedName = suggestedName.substring(0, 27) + '...';
        }
        setSessionName(suggestedName);
      }
    }, 1500);
  };

  // Mock response generator
  const generateMockResponse = (query: string): string => {
    const legalResponses = [
      "According to Moroccan law, specifically Article 19 of the Constitution, men and women have equal civil, political, economic, social, cultural, and environmental rights and freedoms.",
      "In Morocco, the legal age of majority is 18 years, as stipulated in the Moroccan Family Code (Moudawana).",
      "For property disputes in Morocco, you should first consult the Land Registry (Conservation Foncière) to verify ownership details before proceeding with any legal action.",
      "The Moroccan Labor Code guarantees employees a minimum of 18 days of paid annual leave after six months of continuous service with the same employer.",
      "Under Moroccan business law, a Limited Liability Company (SARL) requires a minimum capital of 1 MAD, while a Public Limited Company (SA) requires at least 300,000 MAD."
    ];
    
    return legalResponses[Math.floor(Math.random() * legalResponses.length)];
  };

  const startNewChat = () => {
    setMessages([
      {
        id: '1',
        sender: 'bot',
        text: 'مرحبا! أنا مساعدك القانوني المغربي. كيف يمكنني مساعدتك اليوم؟\n\nBonjour! Je suis votre assistant juridique marocain. Comment puis-je vous aider aujourd\'hui?\n\nHello! I\'m your Moroccan legal assistant. How can I help you today?',
        timestamp: new Date(),
      },
    ]);
    setSessionName('');
  };

  const { data: session } = useSession();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Main content area with sidebar and chat - full width */}
        <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <div className="w-64 bg-[#F9F5E3] text-gray-800 flex flex-col h-[calc(100vh-64px)] border-r border-[#E5D9B0] shadow-sm">
          {/* New Chat Button */}
          <div className="p-4">
            <button 
              onClick={startNewChat}
              className="w-full flex items-center justify-center gap-2 rounded-md bg-[#C7A962] text-white px-3 py-2 text-sm font-medium hover:bg-[#B09344] transition-colors shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Consultation
            </button>
          </div>
          
          {/* Chat History */}
          <div className="flex-1 overflow-y-auto px-3 py-2">
            <h3 className="px-2 mb-2 text-xs font-medium text-[#B09344] uppercase">Previous Consultations</h3>
            <div className="space-y-1">
              {chatHistory.map((chat) => (
                <button 
                  key={chat.id}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-[#EAE3C9] text-sm text-gray-700 flex items-center transition-colors"
                  onClick={() => {
                    // In a real app, this would load the chat history
                    alert(`Loading chat: ${chat.title}`);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#C7A962]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <div className="flex-1 truncate">
                    <span className="block truncate font-medium">{chat.title}</span>
                    <span className="block text-xs text-gray-500 truncate">{chat.date.toLocaleDateString()}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* User Profile */}
          <div className="border-t border-[#E5D9B0] p-3 flex items-center">
            <div className="h-8 w-8 rounded-full bg-[#C7A962] flex items-center justify-center text-white font-medium mr-2">
              {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="text-sm">
              <div className="font-medium text-gray-800">{session?.user?.name || 'User'}</div>
              <div className="text-xs text-gray-500">Legal Consultant</div>
            </div>
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col h-[calc(100vh-64px)] bg-white shadow-sm">
          {/* Chat Title */}
          <div className="border-b border-[#E5D9B0]">
            <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-800">
                  {sessionName || 'New Legal Consultation'}
                </h1>
              </div>
              <div>
                <button 
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#C7A962] hover:bg-[#B09344] transition-colors"
                  onClick={() => {
                    // In a real app, this would save the chat session
                    alert('Chat session saved!');
                    router.push('/dashboard');
                  }}
                >
                  Save Consultation
                </button>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="h-8 w-8 rounded-full bg-[#C7A962] flex items-center justify-center text-white font-medium mr-2 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-4 max-w-md ${message.sender === 'user' ? 'bg-[#F5EFD9] text-gray-800' : 'bg-white border border-[#E5D9B0] text-gray-800 shadow-sm'}`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <div
                      className={`text-xs mt-1 ${message.sender === 'user' ? 'text-[#B09344]' : 'text-gray-500'}`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                  {message.sender === 'user' && (
                    <div className="h-8 w-8 rounded-full bg-[#C7A962] flex items-center justify-center text-white font-medium ml-2 mt-1">
                      {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="h-8 w-8 rounded-full bg-[#C7A962] flex items-center justify-center text-white font-medium mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div className="bg-white border border-[#E5D9B0] rounded-lg p-4 max-w-md shadow-sm">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 bg-[#C7A962] rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-[#C7A962] rounded-full animate-bounce delay-100"></div>
                      <div className="h-2 w-2 bg-[#C7A962] rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-[#E5D9B0] bg-white p-4">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a legal question..."
                  className="flex-1 border border-[#E5D9B0] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C7A962] focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                  title="Send message"
                  className="bg-[#C7A962] text-white rounded-md p-2 hover:bg-[#B09344] focus:outline-none focus:ring-2 focus:ring-[#C7A962] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
