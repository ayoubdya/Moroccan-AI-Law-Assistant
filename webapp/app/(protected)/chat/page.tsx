"use client";

import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from '../../components/chat/ChatMessage';
import ChatInput from '../../components/chat/ChatInput';
import { getSession, getMessages, sendMessage } from '../../utils/chat';
import { Session, ChatResponse } from '../../types';
import styles from '../../components/chat/chat.module.css';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'model';
  timestamp: Date;
}

export default function ChatPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat session
  useEffect(() => {
    const initSession = async () => {
      try {
        // Create a new session with a descriptive title
        const session: Session = await getSession('Legal Consultation');
        setSessionId(session.id);
        
        // Add welcome message
        setMessages([
          {
            id: 'welcome',
            content: 'Welcome to Morocco Legal Assistant. How can I help you with your legal question today?',
            sender: 'model',
            timestamp: new Date(),
          },
        ]);
        
        // Try to load existing messages if any
        try {
          const existingMessages = await getMessages(session.id);
          if (existingMessages && existingMessages.length > 0) {
            // Transform messages to the expected format
            const formattedMessages = existingMessages.map(msg => ({
              id: msg.id,
              content: msg.message,
              sender: msg.sender,
              timestamp: new Date(msg.sentAt),
            }));
            
            // Add existing messages to the chat
            setMessages(prev => [
              prev[0], // Keep the welcome message
              ...formattedMessages
            ]);
          }
        } catch (msgError) {
          console.error('Failed to load messages:', msgError);
          // Continue with empty chat if messages can't be loaded
        }
      } catch (error: any) {
        console.error('Failed to initialize session:', error);
        
        // Display error message if session initialization fails
        setMessages([
          {
            id: 'error',
            content: 'There was an error connecting to the legal assistant. Please try again later or contact support.',
            sender: 'model',
            timestamp: new Date(),
          },
        ]);
      } finally {
        setInitializing(false);
      }
    };

    initSession();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!sessionId) return;

    // Add user message to the chat
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Send message to API and get response
      const response: ChatResponse = await sendMessage(sessionId, content);
      
      // Add AI response to the chat
      const aiMessage: Message = {
        id: response.id || `ai-${Date.now()}`,
        content: response.content || 'I apologize, but I could not process your request at this time.',
        sender: 'model',
        timestamp: new Date(response.timestamp || Date.now()),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error('Failed to send message:', error);
      
      // Add error message to chat
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: 'Sorry, there was an error processing your request. Please try again later.',
        sender: 'model',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleStartNewChat = async () => {
    setInitializing(true);
    setMessages([]);
    
    try {
      const session: Session = await getSession('Legal Consultation');
      setSessionId(session.id);
      
      // Add welcome message
      setMessages([
        {
          id: 'welcome',
          content: 'Welcome to Morocco Legal Assistant. How can I help you with your legal question today?',
          sender: 'model',
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Failed to initialize new session:', error);
    } finally {
      setInitializing(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Chat header */}
      <div className="bg-white p-4 border-b border-amber-200 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-xl font-semibold text-amber-900">Legal Consultation</h1>
          <p className="text-sm text-amber-700">Ask your legal questions about Moroccan law</p>
        </div>
        <button 
          onClick={handleStartNewChat}
          className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-md transition-colors"
        >
          New Consultation
        </button>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-amber-50">
        {initializing ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-700 mx-auto mb-3"></div>
              <p className="text-amber-800">Initializing chat...</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {loading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white border border-amber-200 rounded-lg px-4 py-3 shadow-sm">
                  <div className={styles.typingIndicator}>
                    <div className={`${styles.typingDot} bg-amber-600`}></div>
                    <div className={`${styles.typingDot} bg-amber-600`}></div>
                    <div className={`${styles.typingDot} bg-amber-600`}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Chat input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={initializing || loading} />
    </div>
  );
}
