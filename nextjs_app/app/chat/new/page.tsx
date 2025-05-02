"use client";

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
};

export default function NewChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionName, setSessionName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  // Add welcome message when component mounts
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          sender: 'bot',
          text: 'u0645u0631u062du0628u0627! u0623u0646u0627 u0645u0633u0627u0639u062fu0643 u0627u0644u0642u0627u0646u0648u0646u064a u0627u0644u0645u063au0631u0628u064a. u0643u064au0641 u064au0645u0643u0646u0646u064a u0645u0633u0627u0639u062fu062au0643 u0627u0644u064au0648u0645u061f\n\nBonjour! Je suis votre assistant juridique marocain. Comment puis-je vous aider aujourd\'hui?\n\nHello! I\'m your Moroccan legal assistant. How can I help you today?',
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

    // In a real app, this would be an API call to your backend
    // For demo purposes, we'll simulate a response
    setTimeout(() => {
      // Sample responses based on keywords
      let botResponse = '';
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('divorce') || lowerInput.includes('u0637u0644u0627u0642') || lowerInput.includes('divorce')) {
        botResponse = 'In Morocco, divorce can be initiated by either spouse. The Moudawana (Family Code) recognizes several types of divorce including divorce by mutual consent, divorce for irreconcilable differences, and khul (divorce initiated by the wife). Would you like more specific information about a particular type of divorce procedure?';
      } else if (lowerInput.includes('business') || lowerInput.includes('u0634u0631u0643u0629') || lowerInput.includes('entreprise')) {
        botResponse = 'Starting a business in Morocco requires several steps including registering with the Commercial Registry, obtaining tax identification, and registering with social security. The main business structures include SARL (LLC), SA (Corporation), and Auto-entrepreneur (Self-employed). What specific aspect of business law are you interested in?';
      } else if (lowerInput.includes('property') || lowerInput.includes('u0639u0642u0627u0631') || lowerInput.includes('propriu00e9tu00e9')) {
        botResponse = 'Property law in Morocco is governed by both modern law and traditional Islamic principles. Foreign ownership is permitted with some restrictions. Property transactions must be notarized and registered with the Land Registry. Are you looking for information about buying, selling, or inheritance of property?';
      } else {
        botResponse = 'Thank you for your question. To provide you with accurate legal information specific to Moroccan law, I\'d need a bit more context. Could you please provide more details about your legal concern?';
      }

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

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
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
              Save Session
            </button>
          </div>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg px-4 py-2 ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white border text-gray-800'}`}
              >
                <div className="whitespace-pre-wrap">{message.text}</div>
                <div 
                  className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}
                >
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border rounded-lg px-4 py-2 max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-200"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-400"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="bg-white border-t">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your legal question here..."
              className="flex-1 min-w-0 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send message"
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
          <p className="mt-2 text-xs text-gray-500 text-center">
            This is a demo. In a real application, responses would be generated by an AI model trained on Moroccan legal data.
          </p>
        </div>
      </div>
    </div>
  );
}
