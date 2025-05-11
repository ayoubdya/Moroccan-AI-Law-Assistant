import axios from 'axios';
import { getToken, getUser } from './auth';
import { Session, ChatMessage, ChatResponse } from '../types';

// Base API URL
const API_URL = '/api';

// Get or create a session
export const getSession = async (title: string = 'Legal Consultation'): Promise<Session> => {
  try {
    // Get the user information from session storage
    const user = getUser();
    
    if (!user || !user.userId) {
      throw new Error('User not authenticated. Please log in.');
    }
    
    // Create a new session with the real user ID
    const response = await axios.post(`${API_URL}/sessions`, { 
      userId: user.userId,
      prompt: title
    });
    
    return response.data;
  } catch (error) {
    console.error('Create session error:', error);
    throw error;
  }
};

// Get messages for a session
export const getMessages = async (sessionId: string): Promise<ChatMessage[]> => {
  try {
    // Get the authentication token
    const token = getToken();
    
    // Get session details including chat messages with authentication
    const response = await axios.get(`${API_URL}/sessions/${sessionId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Return the Chat array from the session or an empty array if it doesn't exist
    return response.data?.Chat || [];
  } catch (error) {
    console.error(`Get messages for session ${sessionId} error:`, error);
    throw error;
  }
};

// Send a message to the chatbot
export const sendMessage = async (sessionId: string, message: string): Promise<ChatResponse> => {
  try {
    // Get the user information and token from session storage
    const user = getUser();
    const token = getToken();
    
    if (!user || !user.userId) {
      throw new Error('User not authenticated. Please log in.');
    }
    
    // Send message to the chatbot API with real user ID and authentication
    const response = await axios.post(`${API_URL}/chatbot`, { 
      userId: user.userId,
      sessionId: sessionId,
      message: message
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Transform the response to match the expected ChatResponse format
    return {
      id: response.data.id || `msg-${Date.now()}`,
      content: response.data.message || response.data.content || '',
      sender: 'model',
      timestamp: response.data.sentAt || new Date().toISOString(),
      sessionId: sessionId
    };
  } catch (error) {
    console.error('Send message error:', error);
    throw error;
  }
};
