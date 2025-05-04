/**
 * Chat API utility functions for making authenticated requests to the chat backend
 */

import { fetchAPI, get, post } from './api';

// API URL from environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Check if the API server is available
 */
export async function checkApiAvailability() {
  try {
    // Simple ping to check if API is available
    const response = await fetch(`${API_URL}/api/health`, { 
      method: 'HEAD',
      signal: AbortSignal.timeout(2000) // Short timeout to fail fast if API is down
    });
    return response.ok;
  } catch (error) {
    console.error('API server is unreachable:', error);
    return false;
  }
}

/**
 * Get all chat sessions for the current user
 */
export async function getUserSessions() {
  try {
    // First check if the API server is available
    const isApiAvailable = await checkApiAvailability();
    if (!isApiAvailable) {
      throw new Error('API server is unreachable');
    }
    
    // Use the centralized API utility to make the request
    const data = await get('/api/chat/sessions/user/me');
    return data;
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

/**
 * Create a new chat session
 */
export async function createChatSession(sessionName: string) {
  try {
    // Check if API is available
    const isApiAvailable = await checkApiAvailability();
    if (!isApiAvailable) {
      throw new Error('API server is unreachable');
    }
    
    // Use the centralized API utility to make the request
    const data = await post('/api/chat/sessions', { sessionName });
    return data;
  } catch (error) {
    console.error('Error creating chat session:', error);
    return { 
      status: 'error', 
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Load an existing chat session
 */
export async function loadChatSession(sessionId: string) {
  try {
    // Check if API is available
    const isApiAvailable = await checkApiAvailability();
    if (!isApiAvailable) {
      throw new Error('API server is unreachable');
    }
    
    // Use the centralized API utility to make the request
    const data = await get(`/api/chat/sessions/${sessionId}`);
    return data;
  } catch (error) {
    console.error('Error loading chat session:', error);
    return { 
      status: 'error', 
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send a message in a chat session
 */
export async function sendChatMessage(sessionId: string, message: string) {
  try {
    // Check if API is available
    const isApiAvailable = await checkApiAvailability();
    if (!isApiAvailable) {
      throw new Error('API server is unreachable');
    }
    
    // Use the centralized API utility to make the request
    const data = await post(`/api/chat/sessions/${sessionId}/messages`, { message });
    return data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    return { 
      status: 'error', 
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
