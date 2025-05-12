/**
 * API Client for Morocco Legal Assistant
 * 
 * This file provides a client for interacting with the backend API.
 * It can be used by the frontend while waiting for the backend team
 * to implement the actual endpoints.
 */

import { API_ENDPOINTS } from '../types/api';
import { ApiResponse, UserProfileResponse } from '../types/api';

/**
 * Base API client for making requests to the backend
 */

/**
 * Base API client for making requests to the backend
 */
export class ApiClient {
  private baseUrl: string;
  private token: string | null;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    this.token = null;
  }

  /**
   * Set the authentication token for subsequent requests
   */
  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  /**
   * Clear the authentication token
   */
  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  /**
   * Get the authentication token
   */
  getToken(): string | null {
    if (!this.token && typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  /**
   * Make a GET request to the API
   */
  async get<T>(endpoint: string): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.getToken()) {
      headers['Authorization'] = `Bearer ${this.getToken()}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  /**
   * Make a POST request to the API
   */
  async post<T>(endpoint: string, data: any): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.getToken()) {
      headers['Authorization'] = `Bearer ${this.getToken()}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  /**
   * Make a PUT request to the API
   */
  async put<T>(endpoint: string, data: any): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.getToken()) {
      headers['Authorization'] = `Bearer ${this.getToken()}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  /**
   * Make a DELETE request to the API
   */
  async delete<T>(endpoint: string): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.getToken()) {
      headers['Authorization'] = `Bearer ${this.getToken()}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }
}

// Create a singleton instance of the API client
export const apiClient = new ApiClient();

// Auth API methods
export const authApi = {
  register: (data: any) => apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data),
  login: (data: any) => apiClient.post(API_ENDPOINTS.AUTH.LOGIN, data),
  logout: () => apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, {}),
  getMe: () => apiClient.get(API_ENDPOINTS.AUTH.ME),
};

// User API methods
export const userApi = {
  getProfile: async () => {
    try {
      const response = await apiClient.get<UserProfileResponse>(API_ENDPOINTS.USERS.PROFILE);
      if (response.status === 'success' && response.data) {
        return response.data; // Return just the user data
      }
      throw new Error(response.error || 'Failed to fetch user profile');
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },
  updateProfile: (data: any) => apiClient.post(API_ENDPOINTS.USERS.PROFILE, data),
};

// Chat API methods
export const chatApi = {
  getSessions: () => apiClient.get(API_ENDPOINTS.CHAT.SESSIONS),
  createSession: (data: any) => apiClient.post(API_ENDPOINTS.CHAT.SESSIONS, data),
  getSession: (id: string) => apiClient.get(API_ENDPOINTS.CHAT.SESSION(id)),
  sendMessage: (sessionId: string, data: any) => 
    apiClient.post(API_ENDPOINTS.CHAT.MESSAGES(sessionId), data),
};

// Document API methods
export const documentApi = {
  getDocuments: () => apiClient.get(API_ENDPOINTS.DOCUMENTS.ALL),
  getDocument: (id: string) => apiClient.get(API_ENDPOINTS.DOCUMENTS.DOCUMENT(id)),
  getCategories: () => apiClient.get(API_ENDPOINTS.DOCUMENTS.CATEGORIES),
};
