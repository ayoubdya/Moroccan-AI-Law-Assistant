/**
 * Chat API utility functions for making authenticated requests to the chat backend
 * Updated to use the new api-client.ts implementation for better compatibility with Bun
 */

import { chatApi as apiClient } from './api-client';
import { ChatSession, ChatMessage, SendMessageResponse, CreateChatSessionResponse } from '../types/api';

// API URL from environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Type definitions for chat API responses
// API Response Types
interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  error?: string;
}

interface ChatSessionsResponse {
  sessions: ChatSession[];
}

interface ChatSessionResponse {
  session: ChatSession;
}

interface ChatMessageResponse {
  message: ChatMessage;
  assistantMessage: ChatMessage;
}

export const chatApi = {
  /**
   * Check if the API server is available
   */
  async checkApiAvailability(): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/api/health`, { 
        method: 'HEAD',
        signal: AbortSignal.timeout(2000) // Short timeout to fail fast if API is down
      });
      return response.ok;
    } catch (error) {
      console.error('API server is unreachable:', error);
      return false;
    }
  },

  /**
   * Get all chat sessions for the current user
   */
  getUserSessions: async () => {
    try {
      const response = await apiClient.getSessions();
      return {
        status: 'success',
        data: response as ChatSessionsResponse
      };
    } catch (error) {
      console.error('Error fetching user sessions:', error);
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Failed to fetch sessions'
      };
    }
  },

  /**
   * Create a new chat session
   */
  createChatSession: async (sessionName: string) => {
    try {
      const response = await apiClient.createSession({
        title: sessionName || 'New Conversation',
      });
      return {
        status: 'success',
        data: response as CreateChatSessionResponse
      };
    } catch (error) {
      console.error('Error creating session:', error);
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Failed to create session'
      };
    }
  },

  /**
   * Load an existing chat session
   */
  loadChatSession: async (sessionId: string) => {
    try {
      const response = await apiClient.getSession(sessionId);
      return {
        status: 'success',
        data: response as ChatSessionResponse
      };
    } catch (error) {
      console.error(`Error loading session ${sessionId}:`, error);
      return {
        status: 'error',
        error: error instanceof Error ? error.message : `Failed to load session ${sessionId}`
      };
    }
  },

  /**
   * Send a message in a chat session
   */
  sendChatMessage: async (sessionId: string, message: string) => {
    try {
      const response = await apiClient.sendMessage(sessionId, {
        content: message,
      });
      return {
        status: 'success',
        data: response as ChatMessageResponse
      };
    } catch (error) {
      console.error(`Error sending message in session ${sessionId}:`, error);
      return {
        status: 'error',
        error: error instanceof Error ? error.message : `Failed to send message in session ${sessionId}`
      };
    }
  },

  /**
   * Get messages for a chat session
   */
  getMessages: async (sessionId: string) => {
    try {
      const response = await apiClient.getMessages(sessionId);
      return {
        status: 'success',
        data: response as ChatMessage[]
      };
    } catch (error) {
      console.error(`Error getting messages for session ${sessionId}:`, error);
      return {
        status: 'error',
        error: error instanceof Error ? error.message : `Failed to get messages for session ${sessionId}`
      };
      return [];
    }
  }
};
