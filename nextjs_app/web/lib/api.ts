/**
 * API utility functions for making authenticated requests to the backend
 */

import { getSession } from 'next-auth/react';

// API URL from environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Make an authenticated API request to the backend
 */
export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  try {
    // Get session to retrieve the API token
    const session = await getSession();
    
    // Set default headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };
    
    // Debug session content to see where the token is stored
    console.log('Session content:', JSON.stringify(session, null, 2));
    
    // Add authorization header if session exists
    if (session?.user?.token) {
      console.log('Using token from session.user.token');
      headers['Authorization'] = `Bearer ${session.user.token}`;
    } else if (session?.apiToken) {
      console.log('Using token from session.apiToken');
      headers['Authorization'] = `Bearer ${session.apiToken}`;
    } else if ((session as any)?.token) {
      console.log('Using token from session.token');
      headers['Authorization'] = `Bearer ${(session as any).token}`;
    } else {
      // If we don't have a token but have a user, create a temporary token for testing
      // This is just for development and should be removed in production
      if (session?.user?.email) {
        console.log('No token found, creating temporary token for testing');
        const tempToken = btoa(JSON.stringify({
          id: session.user.id || '1',
          email: session.user.email
        }));
        headers['Authorization'] = `Bearer ${tempToken}`;
      }
    }
    
    // Log the headers for debugging
    console.log('Request headers:', headers);
    
    // Construct the full URL
    const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    console.log(`Making API request to: ${url}`);
    
    // Make the request
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    // Log response status for debugging
    console.log(`API response status: ${response.status} ${response.statusText}`);
    
    // Check if the response is JSON before parsing
    const contentType = response.headers.get('content-type');
    console.log(`Response content type: ${contentType}`);
    
    // Only try to parse as JSON if the content type is application/json
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      // Handle API errors
      if (!response.ok) {
        console.error('API error response:', data);
        // Check if data is empty and provide a more specific error message
        if (Object.keys(data).length === 0) {
          throw new Error(`API request failed with status ${response.status}: Empty response`);
        } else {
          throw new Error(data.message || `API request failed with status ${response.status}`);
        }
      }
      
      return data;
    } else {
      // For non-JSON responses
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Could not read response body');
        console.error('Non-JSON error response:', errorText);
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
      }
      
      // If it's not JSON but the request was successful, return a simple object
      return { 
        status: 'success', 
        message: 'Operation completed successfully',
        responseText: await response.text().catch(() => '')
      };
    }
  } catch (error) {
    // Log the full error for debugging
    console.error('API request error:', error);
    
    // Rethrow the error with more context
    if (error instanceof Error) {
      throw new Error(`API request to ${endpoint} failed: ${error.message}`);
    } else {
      throw new Error(`API request to ${endpoint} failed with an unknown error`);
    }
  }

}

/**
 * Make a GET request to the API
 */
export async function get(endpoint: string) {
  return fetchAPI(endpoint, { method: 'GET' });
}

/**
 * Make a POST request to the API
 */
export async function post(endpoint: string, data: any) {
  return fetchAPI(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Make a PUT request to the API
 */
export async function put(endpoint: string, data: any) {
  return fetchAPI(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * Make a DELETE request to the API
 */
export async function del(endpoint: string) {
  return fetchAPI(endpoint, { method: 'DELETE' });
}
