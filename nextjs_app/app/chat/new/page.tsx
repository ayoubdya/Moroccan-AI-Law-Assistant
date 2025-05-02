"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AppHeader from '../../components/layout/AppHeader';

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Use the AppHeader component */}
      <AppHeader />
      
      {/* Main content area with sidebar and chat */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white flex flex-col h-[calc(100vh-64px)]">
          {/* New Chat Button */}
          <div className="p-4">
            <button 
              onClick={startNewChat}
              className="w-full flex items-center justify-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New chat
            </button>
          </div>
          
          {/* Chat History */}
          <div className="flex-1 overflow-y-auto px-3 py-2">
            <h3 className="px-2 mb-2 text-xs font-medium text-gray-400 uppercase">Previous Consultations</h3>
            <div className="space-y-1">
              {chatHistory.map((chat) => (
                <button 
                  key={chat.id}
                  className="w-full text-left px-2 py-2 rounded-md hover:bg-gray-800 text-sm text-white/80 flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  {chat.title}
                </button>
              ))}
            </div>
          </div>
          
          {/* User Profile */}
          <div className="border-t border-white/20 p-3 flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium mr-2">
              U
            </div>
            <div className="text-sm">
              <div className="font-medium">User</div>
              <div className="text-xs text-gray-400">Free Plan</div>
            </div>
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col h-[calc(100vh-64px)]">
          {/* Chat Title */}
          <div className="bg-white border-b">
            <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  {sessionName || 'New Legal Consultation'}
                </h1>
              </div>
              <div>
                <button 
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    // In a real app, this would save the chat session
                    alert('Chat session saved!');
                    router.push('/dashboard');
                  }}
                >
                  Save Chat
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
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium mr-2 mt-1">
                      A
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-4 max-w-md ${message.sender === 'user' ? 'bg-blue-100 text-gray-800' : 'bg-white border border-gray-200 text-gray-800'}`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <div
                      className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-700' : 'text-gray-500'}`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                  {message.sender === 'user' && (
                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-medium ml-2 mt-1">
                      U
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium mr-2">
                    A
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-md">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 bg-white p-4">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a legal question..."
                  className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                  title="Send message"
                  className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
}
