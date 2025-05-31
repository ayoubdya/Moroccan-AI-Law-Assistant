"use client";

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    
    // Redirect to login page
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-amber-700 to-amber-800 text-white shadow-lg">
        <div className="p-6 flex items-center justify-center border-b border-amber-600">
          <h1 className="text-xl font-bold">Morocco Legal Assistant</h1>
        </div>
        <nav className="mt-8 px-2">
          <ul className="space-y-2">
            <li>
              <Link 
                href="/dashboard" 
                className="flex items-center py-3 px-4 rounded-lg hover:bg-amber-600/50 transition-all duration-200 border-l-4 border-transparent hover:border-white group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-amber-200 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/chat" 
                className="flex items-center py-3 px-4 rounded-lg hover:bg-amber-600/50 transition-all duration-200 border-l-4 border-transparent hover:border-white group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-amber-200 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Chat Consultation</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/history" 
                className="flex items-center py-3 px-4 rounded-lg hover:bg-amber-600/50 transition-all duration-200 border-l-4 border-transparent hover:border-white group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-amber-200 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>History</span>
              </Link>
            </li>
          </ul>
          <div className="mt-8 pt-8 border-t border-amber-600/50">
            <button 
              onClick={handleLogout}
              className="flex items-center w-full py-3 px-4 rounded-lg hover:bg-amber-600/50 transition-all duration-200 border-l-4 border-transparent hover:border-white group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-amber-200 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-amber-100 group-hover:text-white transition-colors">Logout</span>
            </button>
          </div>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 bg-amber-50">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
