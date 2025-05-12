/**
 * API Types for Morocco Legal Assistant
 * 
 * This file defines TypeScript interfaces for the API endpoints
 * that will be implemented by the backend team.
 */

// API Response Type
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  error?: string;
}

// User Types

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'legal_professional';
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  profession?: string;
  organization?: string;
  bio?: string;
  avatarUrl?: string;
}

// API Response Types
export type UserProfileResponse = ApiResponse<UserProfile>;
// Authentication Types
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role?: 'user' | 'legal_professional';
}

export interface RegisterResponse {
  status: 'success' | 'error';
  user: User;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface AuthResponse {
  user: User | null;
  error?: string;
}

// Chat Types
export interface ChatSession {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
  date: Date;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  content: string;
  role: 'user' | 'assistant';
  createdAt: string;
}

export interface CreateChatSessionRequest {
  title: string;
}

export interface CreateChatSessionResponse {
  session: ChatSession;
}

export interface SendMessageRequest {
  content: string;
}

export interface SendMessageResponse {
  message: ChatMessage;
  assistantMessage: ChatMessage;
}

// API Response Types
export type ChatSessionsResponse = ApiResponse<ChatSession[]>;
export type ChatSessionResponse = ApiResponse<ChatSession>;
export type ChatMessageResponse = ApiResponse<SendMessageResponse>;

// Legal Document Types
export interface LegalDocument {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DocumentCategory {
  id: string;
  name: string;
  description: string;
}

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
  },
  
  // User endpoints
  USERS: {
    PROFILE: '/api/users/profile',
  },
  
  // Chat endpoints
  CHAT: {
    SESSIONS: '/api/chat/sessions',
    SESSION: (id: string) => `/api/chat/sessions/${id}`,
    MESSAGES: (sessionId: string) => `/api/chat/sessions/${sessionId}/messages`,
  },
  
  // Document endpoints
  DOCUMENTS: {
    ALL: '/api/documents',
    DOCUMENT: (id: string) => `/api/documents/${id}`,
    CATEGORIES: '/api/documents/categories',
  },
};
