"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { getUserSessions, createChatSession, loadChatSession as fetchChatSession, sendChatMessage, checkApiAvailability } from '../../../lib/chatApi';

// Define types for messages and chat history
type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

type ChatSession = {
  id: string;
  title: string;
  date: Date;
  category?: string;
};

// Using centralized API utility functions from lib/chatApi.ts
// All API-related functions are imported from chatApi.ts

// This wrapper is no longer needed as we're using the imported functions directly
// Keeping this commented out for reference
/*
async function createChatSessionWrapper(userId: string) {
  try {
    // The imported createChatSession doesn't need userId as it's handled by the API utility
    const result = await createChatSession(sessionName);
    return result;
  } catch (error) {
    console.error('Error creating chat session:', error);
    throw error;
  }
}
*/

// Note: We're using the imported getUserSessions function from chatApi.ts
// This wrapper is for backward compatibility
async function getUserSessionsWrapper(userId: string) {
  try {
    // The imported getUserSessions doesn't need userId as it's handled by the API utility
    console.log(`Fetching sessions for user ${userId} using centralized API utility`);
    const result = await getUserSessions();
    return result;
  } catch (error) {
    console.error('Error fetching user sessions:', error);
    // Return a default structure to prevent UI errors
    return { 
      status: 'error', 
      message: error instanceof Error ? error.message : 'Unknown error', 
      sessions: [] 
    };
  }
}

// Note: We're using the imported sendChatMessage function from chatApi.ts
// This wrapper is for backward compatibility
async function sendMessage(sessionId: string, message: string) {
  try {
    console.log(`Sending message to session ${sessionId} using centralized API utility`);
    const result = await sendChatMessage(sessionId, message);
    console.log('Message sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

export default function AIConsultantPage() {
  const router = useRouter();
  const { data: session } = useSession();
  
  // State management
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionTitle, setSessionTitle] = useState('New Consultation');
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [userSessions, setUserSessions] = useState<ChatSession[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Set up authentication for API requests
  useEffect(() => {
    if (session?.user) {
      // For NextAuth.js, we'll use cookies for authentication which are automatically sent with requests
      // when using credentials: 'include'
      console.log('User authenticated, session available for API requests');
    }
  }, [session]);
  
  // Function to use mock data when API is unavailable
  const useMockSessionsAsFallback = () => {
    console.log('Using mock sessions as fallback');
    // Create some sample sessions for demo purposes
    const mockSessions: ChatSession[] = [
      {
        id: '1',
        title: 'Property Law Inquiry',
        date: new Date(),
        category: 'Property'
      },
      {
        id: '2',
        title: 'Business Registration',
        date: new Date(Date.now() - 86400000), // Yesterday
        category: 'Business'
      },
      {
        id: '3',
        title: 'Employment Contract',
        date: new Date(Date.now() - 172800000), // 2 days ago
        category: 'Employment'
      }
    ];
    setUserSessions(mockSessions);
  };
  
  // Fetch user sessions when component mounts
  useEffect(() => {
    const fetchUserSessions = async () => {
      if (session?.user?.id) {
        try {
          // First check if API is available before attempting to fetch data
          const isApiAvailable = await checkApiAvailability();
          
          if (!isApiAvailable) {
            console.warn('API server is not available, using mock data');
            useMockSessionsAsFallback();
            return;
          }
          
          // API is available, attempt to fetch user sessions
          const data = await getUserSessions();
          console.log('Fetched user sessions response:', data);
          
          if (data.status === 'success' && Array.isArray(data.sessions)) {
            // Convert API sessions to our ChatSession format
            const formattedSessions = data.sessions.map((apiSession: any) => ({
              id: apiSession.id.toString(),
              title: apiSession.sessionName || 'Untitled Consultation',
              date: new Date(apiSession.startedAt),
              category: apiSession.category || 'General'
            }));
            setUserSessions(formattedSessions);
          } else {
            // API returned error or unexpected format
            console.error('API error or unexpected format:', data);
            // Use mock data as fallback
            useMockSessionsAsFallback();
          }
        } catch (error) {
          console.error('Failed to fetch user sessions:', error);
          // Fallback to sample data if API fails
          useMockSessionsAsFallback();
        }
      } else {
        // No user session, use mock data for demonstration
        console.log('No user session available, using mock data for demonstration');
        useMockSessionsAsFallback();
      }
    };
    
    // Call the function
    fetchUserSessions();
  }, [session]);
  
  // Add initial welcome message when component mounts
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: "Welcome to Morocco Legal Assistant. I'm your AI legal consultant specialized in Moroccan law. How can I assist you today?",
          timestamp: new Date(),
        }
      ]);
    }
  }, []);
  
  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle sending a message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || isProcessing) return;
    
    // Add user message to UI immediately for better UX
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    // Update UI with user message
    setMessages((prevMessages: Message[]) => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsProcessing(true);
    
    try {
      // Check if API is reachable before attempting to send message
      const apiAvailable = await checkApiAvailability();
      
      if (!apiAvailable) {
        throw new Error('API server is unreachable');
      }
      
      // Create a new session if none exists
      if (!currentSessionId && session?.user?.id) {
        try {
          console.log('Creating new chat session for user:', session.user.id);
          const result = await createChatSession('New Consultation');
          console.log('New session created:', result);
          
          if (result.status === 'success' && result.session) {
            setCurrentSessionId(result.session.id.toString());
            setSessionTitle(result.session.sessionName || 'New Consultation');
          } else {
            throw new Error('Failed to create session: ' + (result.message || 'Unknown error'));
          }
        } catch (sessionError) {
          console.error('Failed to create new session:', sessionError);
          // Fall through to local handling
          throw sessionError;
        }
      }
      
      // If we have a session ID, send message to API
      if (currentSessionId) {
        const response = await sendMessage(currentSessionId, inputMessage);
        console.log('API response:', response);
        
        if (response.status === 'success' && response.botResponse) {
          const botResponse: Message = {
            id: `msg-${Date.now()}`,
            role: 'assistant',
            content: response.botResponse.message,
            timestamp: new Date()
          };
          
          setMessages((prevMessages: Message[]) => [...prevMessages, botResponse]);
        } else {
          throw new Error('Invalid API response: ' + JSON.stringify(response));
        }
      } else {
        throw new Error('No session ID available');
      }
    } catch (error) {
      console.error('Error in chat flow:', error);
      // Fallback to client-side handling if anything fails
      handleMessageLocally(inputMessage);
    }
  };
  
  // Fallback function for handling messages locally when API is unavailable
  const handleMessageLocally = (message: string) => {
    // Simulate API delay for better UX
    setTimeout(() => {
      // Create a mock bot response
      const botResponse: Message = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: generateMockResponse(message),
        timestamp: new Date()
      };
      
      // Update UI with bot response
      setMessages((prevMessages: Message[]) => [...prevMessages, botResponse]);
      setIsProcessing(false);
      
      // Update session title based on first user message if not already set
      if (sessionTitle === 'New Consultation' && messages.length === 1) {
        // Create a title from the first few words of the user's message
        const newTitle = message.split(' ').slice(0, 4).join(' ');
        // Truncate if too long
        setSessionTitle(newTitle.length > 30 ? newTitle.substring(0, 27) + '...' : newTitle);
        
        // Also update the session in the sidebar if we have a session ID
        if (currentSessionId) {
          setUserSessions(prev => {
            const updated = prev.map(s => 
              s.id === currentSessionId ? { ...s, title: newTitle } : s
            );
            return updated;
          });
        }
      }
    }, 1500);
  };
  
  // This function is already defined above, so we're removing this duplicate

  // Generate a mock response when API is unavailable
  const generateMockResponse = (query: string): string => {
    // Convert query to lowercase for easier matching
    const queryLower = query.toLowerCase();
    
    // Try to match the query to relevant legal topics
    if (queryLower.includes('property') || queryLower.includes('land') || queryLower.includes('real estate')) {
      return "According to Moroccan property law, all real estate transactions must be registered with the Land Registry (Conservation Foncière). The 2011 Constitution strengthened property rights, and Law 39-08 provides a framework for property rights and transactions. For disputes, you should first verify ownership details before proceeding with legal action.";
    } 
    else if (queryLower.includes('business') || queryLower.includes('company') || queryLower.includes('startup')) {
      return "Under Moroccan business law, you have several options for company formation. A Limited Liability Company (SARL) requires a minimum capital of 1 MAD, while a Public Limited Company (SA) requires at least 300,000 MAD. The Investment Charter (Law 18-95) provides incentives for new businesses, and the 2019 amendments to Law 17-95 simplified many corporate procedures.";
    }
    else if (queryLower.includes('family') || queryLower.includes('marriage') || queryLower.includes('divorce')) {
      return "The Moroccan Family Code (Moudawana) was significantly reformed in 2004 to enhance women's rights. It governs marriage, divorce, child custody, and inheritance. For marriage, both parties must be at least 18 years old (though exceptions exist), and divorce can be initiated by either spouse. Child custody typically favors the mother until children reach the age of legal choice.";
    }
    else if (queryLower.includes('work') || queryLower.includes('employment') || queryLower.includes('labor')) {
      return "The Moroccan Labor Code (Law 65-99) governs employment relationships. It guarantees employees a minimum of 18 days of paid annual leave after six months of service, sets the standard workweek at 44 hours, and requires written contracts for fixed-term employment. Termination requires notice periods based on seniority, and severance pay is mandatory for unjustified dismissals.";
    }
    else if (queryLower.includes('criminal') || queryLower.includes('crime') || queryLower.includes('penalty')) {
      return "Morocco's Criminal Code (Law 1-59-413) and Criminal Procedure Code govern criminal matters. The legal system combines elements of French civil law and Islamic law. Serious crimes are tried before the Court of First Instance's criminal division, with rights to appeal to the Court of Appeals and potentially the Court of Cassation. Legal representation is mandatory for serious offenses.";
    }
    else {
      // Default responses for general legal questions
      const generalResponses = [
        "According to Moroccan law, specifically Article 19 of the Constitution, men and women have equal civil, political, economic, social, cultural, and environmental rights and freedoms.",
        "In Morocco, the legal age of majority is 18 years, as stipulated in the Moroccan Family Code (Moudawana).",
        "For civil cases in Morocco, the statute of limitations typically ranges from 2 to 15 years, depending on the nature of the case. For most commercial disputes, it's 5 years.",
        "The Moroccan legal system is based on Islamic law and French civil law. The court system includes Courts of First Instance, Courts of Appeal, and the Court of Cassation (Supreme Court).",
        "Legal aid in Morocco is available through the Ministry of Justice for those who cannot afford legal representation. Applications can be submitted to the court where your case is being heard.",
      ];
      return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }
  };
  
  // Load an existing chat session
  const loadChatSessionUI = async (sessionId: string) => {
    setIsProcessing(true);
    setShowSidebar(false);
    
    try {
      console.log(`Loading chat session ${sessionId} using centralized API utility`);
      
      // Use the imported fetchChatSession function from chatApi.ts
      const data = await fetchChatSession(sessionId);
      
      if (data.status === 'success' && data.session) {
        // Set the current session ID and title
        setCurrentSessionId(sessionId);
        setSessionTitle(data.session.sessionName || 'Untitled Consultation');
        
        // Convert API messages to our Message format
        if (Array.isArray(data.session.messages) && data.session.messages.length > 0) {
          const formattedMessages: Message[] = data.session.messages.map((apiMessage: any) => ({
            id: apiMessage.id.toString(),
            role: apiMessage.role as 'user' | 'assistant',
            content: apiMessage.content,
            timestamp: new Date(apiMessage.createdAt)
          }));
          setMessages(formattedMessages);
        } else {
          // If no messages, start with welcome message
          setMessages([
            {
              id: 'welcome',
              role: 'assistant',
              content: 'Welcome to your legal consultation. How can I assist you today?',
              timestamp: new Date()
            }
          ]);
        }
        
        // Update session in sidebar if needed
        setUserSessions(prev => {
          // Check if session already exists in sidebar
          const exists = prev.some(s => s.id === sessionId);
          if (!exists) {
            // Add session to sidebar if it doesn't exist
            return [...prev, {
              id: sessionId,
              title: data.session.sessionName || 'Untitled Consultation',
              date: new Date(data.session.startedAt || Date.now()),
              category: data.session.category || 'General'
            }];
          }
          return prev;
        });
      } else {
        throw new Error('Invalid session data received from API');
      }
    } catch (error) {
      console.error('Error loading chat session:', error);
      // Fallback to a new session if loading fails
      setCurrentSessionId('');
      setSessionTitle('New Consultation');
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: 'Welcome to your legal consultation. I was unable to load your previous session, but we can start a new one. How can I assist you today?',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Start a new chat
  const startNewChat = async () => {
    // Reset current chat state
    setCurrentSessionId('');
    setSessionTitle('New Consultation');
    setIsProcessing(true);
    setShowSidebar(false);
    
    // Add welcome message immediately for better UX
    setMessages([{
      id: Date.now().toString(),
      role: 'assistant',
      content: 'Hello! I\'m your Moroccan Legal Assistant. How can I help you today?',
      timestamp: new Date(),
    }]);
    
    if (session?.user?.id) {
      try {
        // Check if API is available before attempting to create a session
        const isApiAvailable = await checkApiAvailability();
        if (!isApiAvailable) {
          console.warn('API server is not available, using client-side only mode');
          // We already added the welcome message, so just return
          setIsProcessing(false);
          return;
        }
        
        // Create a new session via API using the centralized API utility
        console.log('Creating new chat session for user:', session.user.id);
        const result = await createChatSession('New Consultation');
        console.log('New session created:', result);
        
        if (result.status === 'success' && result.session) {
          setCurrentSessionId(result.session.id.toString());
          setSessionTitle(result.session.sessionName || 'New Consultation');
          
          // Refresh the user sessions list
          try {
            const sessionsData = await getUserSessions();
            if (sessionsData.status === 'success' && Array.isArray(sessionsData.sessions)) {
              const formattedSessions = sessionsData.sessions.map((apiSession: any) => ({
                id: apiSession.id.toString(),
                title: apiSession.sessionName || 'Untitled Consultation',
                date: new Date(apiSession.startedAt),
                category: apiSession.category || 'General'
              }));
              setUserSessions(formattedSessions);
            }
          } catch (refreshError) {
            console.error('Failed to refresh sessions list:', refreshError);
            // Continue without refreshing the sessions list
          }
        } else {
          throw new Error('Failed to create session: ' + (result.message || 'Unknown error'));
        }
      } catch (error) {
        console.error('Failed to create new session:', error);
        // We already added the welcome message above, so just continue
        // The session will be created when the user sends their first message
      }
    } else {
      console.log('No user session available, using client-side only mode');
    }
    
    // We already added the welcome message at the beginning of this function
    
    setIsProcessing(false);
    setShowSidebar(false);
  };
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Chat Title */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 border-b border-[#E5D9B0]">
          <h1 className="text-3xl font-bold text-gray-900">AI Consultant</h1>
        </div>
      
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Overlay for mobile sidebar */}
        {showSidebar && (
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 md:hidden" 
            onClick={() => setShowSidebar(false)}
            aria-hidden="true"
          ></div>
        )}
        
        {/* Sidebar - History */}
        <div className={`
          fixed md:static inset-y-0 left-0 transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transition-transform duration-300 ease-in-out z-50
          w-72 bg-white border-r border-[#E5D9B0] flex flex-col h-[calc(100vh-64px)] md:h-[calc(100vh-64px)] top-[64px] pt-2
        `}>
          {/* New chat button */}
          <div className="p-4 border-b border-[#E5D9B0]">
            <button
              onClick={startNewChat}
              className="w-full flex items-center justify-center gap-2 bg-[#C7A962] hover:bg-[#B09344] text-white rounded-md py-2 px-4 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              New Consultation
            </button>
          </div>
          
          {/* Chat history */}
          <div className="flex-1 overflow-y-auto p-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Recent Consultations</h3>
            <div className="space-y-1">
              {userSessions.map((session: ChatSession) => (
                <button
                  key={session.id}
                  onClick={() => loadChatSessionUI(session.id)}
                  className="w-full flex items-start p-3 rounded-md hover:bg-gray-100 text-left transition-colors"
                >
                  <div className="flex-shrink-0 h-9 w-9 rounded-full bg-[#F5EFD9] text-[#C7A962] flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{session.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {session.category && <span className="inline-block bg-[#F5EFD9] text-[#B09344] text-xs px-2 py-0.5 rounded mr-2">{session.category}</span>}
                      {session.date.toLocaleDateString()}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Sidebar footer */}
          <div className="p-4 border-t border-[#E5D9B0]">
            <Link 
              href="/dashboard" 
              className="flex items-center text-sm text-gray-600 hover:text-[#C7A962]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
        
        {/* Chat area */}
        <div className="flex-1 flex flex-col h-[calc(100vh-64px)]">
          {/* Chat header */}
          <div className="bg-white border-b border-[#E5D9B0] py-4 px-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* Mobile menu button */}
                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="md:hidden mr-4 text-gray-500 hover:text-gray-600"
                  title="Toggle sidebar"
                  aria-label="Toggle sidebar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                
                <h1 className="text-xl font-semibold text-gray-900">{sessionTitle}</h1>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  className="inline-flex items-center px-3 py-1.5 border border-[#E5D9B0] text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-[#F5EFD9]"
                  onClick={() => {
                    // In a real app, this would save the chat as a PDF
                    alert('Exporting chat as PDF...');
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export
                </button>
                
                <button
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-[#C7A962] hover:bg-[#B09344]"
                  onClick={() => {
                    // In a real app, this would save the chat session
                    alert('Chat session saved!');
                    router.push('/dashboard');
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save
                </button>
              </div>
            </div>
          </div>
          
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 h-9 w-9 rounded-full bg-[#C7A962] flex items-center justify-center text-white mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  
                  <div 
                    className={`
                      rounded-lg px-4 py-3 max-w-md shadow-sm
                      ${message.role === 'user' 
                        ? 'bg-[#C7A962] text-white' 
                        : 'bg-white border border-[#E5D9B0] text-gray-800'
                      }
                    `}
                  >
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    <div className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  
                  {message.role === 'user' && (
                    <div className="flex-shrink-0 h-9 w-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 ml-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Loading indicator */}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="flex-shrink-0 h-9 w-9 rounded-full bg-[#C7A962] flex items-center justify-center text-white mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <div className="rounded-lg px-4 py-3 max-w-md shadow-sm bg-white border border-[#E5D9B0]">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 bg-[#C7A962] rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-[#C7A962] rounded-full animate-bounce delay-150"></div>
                      <div className="h-2 w-2 bg-[#C7A962] rounded-full animate-bounce delay-300"></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Input area */}
          <div className="bg-white border-t border-[#E5D9B0] p-4">
            <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
              <div className="flex items-center rounded-lg border border-[#E5D9B0] bg-white overflow-hidden focus-within:ring-2 focus-within:ring-[#C7A962] focus-within:border-[#C7A962]">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your legal question..."
                  className="flex-1 px-4 py-2 text-sm focus:outline-none"
                  disabled={isProcessing}
                />
                
                <div className="flex-shrink-0 pr-2">
                  <button
                    type="submit"
                    disabled={isProcessing || !inputMessage.trim()}
                    className="inline-flex items-center justify-center p-2 rounded-full text-[#C7A962] hover:bg-[#F5EFD9] disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Send message"
                    aria-label="Send message"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="mt-2 text-xs text-gray-500 flex justify-between items-center">
                <span>Ask any legal question related to Moroccan law</span>
                <button 
                  type="button"
                  className="text-[#C7A962] hover:text-[#B09344]"
                  onClick={() => {
                    // In a real app, this would show suggested questions
                    alert('Showing suggested questions...');
                  }}
                >
                  Suggested questions
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
