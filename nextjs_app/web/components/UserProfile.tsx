"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { get } from '../lib/api';

type User = {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  _count?: {
    chatSessions: number;
  };
};

export default function UserProfile() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to get data from the API
      try {
        console.log('Attempting to fetch user data from API...');
        // Check if the API server is running before making the request
        try {
          // Make a simple ping request to check if the API is available
          const pingResponse = await fetch(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000', { method: 'HEAD' });
          console.log(`API server ping status: ${pingResponse.status}`);
        } catch (pingError) {
          console.error('API server appears to be offline:', pingError);
          throw new Error('API server appears to be offline. Using session data instead.');
        }
        
        const data = await get('/api/users/me');
        console.log('API response:', data);
        
        if (data && data.status === 'success' && data.user) {
          // Standard API response format with user data
          setUser(data.user);
          console.log('Successfully loaded user data from API', data.user);
          return;
        } else if (data && data.id) {
          // Direct user object returned
          setUser(data);
          console.log('Successfully loaded user data from API', data);
          return;
        } else {
          console.log('API returned invalid data format:', data);
          throw new Error('Invalid data format received from API');
        }
      } catch (apiErr) {
        console.log('API error, falling back to session data:', apiErr);
        const errorMessage = apiErr instanceof Error ? apiErr.message : 'Unknown API error';
        setError(`API Error: ${errorMessage}. Using session data instead.`);
      }
      
      // Fall back to session data if API fails or returns invalid data
      if (session?.user) {
        console.log('Using session data as fallback');
        const sessionUser: User = {
          id: session.user.id || 'session-id',
          fullName: session.user.name || 'User',
          email: session.user.email || '',
          createdAt: new Date().toISOString(),
          _count: {
            chatSessions: 0 // Default value since we don't have this from session
          }
        };
        setUser(sessionUser);
      } else {
        throw new Error('No user data available');
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch user data if the user is authenticated
    if (status === 'authenticated' && session) {
      fetchUserData();
    } else if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [status, session, retryCount]);

  const refreshProfile = () => {
    // Trigger a refresh of the profile data
    setRetryCount(retryCount + 1);
  };

  if (status === 'loading') {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="font-medium">Connection Issue</p>
            </div>
            <p className="text-sm">{error.includes('API server') ? 'The API server appears to be offline. Profile data is being shown from your session information instead.' : error}</p>
            <div className="mt-3">
              <button
                onClick={refreshProfile}
                className="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
        <p className="text-gray-600">Loading user profile...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p className="text-red-600">You must be signed in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {error && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-md">
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="font-medium">API Connection Issue</p>
          </div>
          <p className="text-sm">The API server appears to be offline. Profile data is being shown from your session information instead.</p>
          <div className="mt-3">
            <button
              onClick={refreshProfile}
              className="px-3 py-1 text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-[#F5EFD9] flex items-center justify-center text-[#C7A962] font-bold text-2xl mr-4">
          {user?.fullName?.charAt(0).toUpperCase() || session?.user?.name?.charAt(0).toUpperCase() || '?'}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
          <p className="text-[#C7A962]">Morocco Legal Assistant</p>
        </div>
      </div>
      
      {user ? (
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#C7A962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Full Name
            </h3>
            <p className="text-gray-700 text-lg">{user.fullName}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#C7A962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Address
            </h3>
            <p className="text-gray-700 text-lg">{user.email}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-[#C7A962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Member Since
            </h3>
            <p className="text-gray-700 text-lg">{new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          
          {user._count && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#C7A962]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Chat Sessions
              </h3>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-[#C7A962]">{user._count.chatSessions}</span>
                <span className="ml-2 text-gray-600">sessions</span>
              </div>
            </div>
          )}
          
          <div className="md:col-span-2 mt-2 text-right">
            <p className="text-xs text-gray-500 italic">
              {error ? 
                <span className="flex items-center justify-end">
                  <svg className="w-3 h-3 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Using session data (API unavailable)
                </span> : 
                <span className="flex items-center justify-end">
                  <svg className="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Profile data loaded from API
                </span>
              }
            </p>
            <button 
              onClick={refreshProfile}
              className="mt-2 px-4 py-2 bg-[#C7A962] text-white rounded-md hover:bg-[#B09344] transition-colors shadow-sm inline-flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Profile
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-gray-600 mb-4">No user data is currently available.</p>
          <button 
            onClick={refreshProfile}
            className="px-4 py-2 bg-[#C7A962] text-white rounded-md hover:bg-[#B09344] transition-colors shadow-sm inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Profile
          </button>
        </div>
      )}
    </div>
  );
}
