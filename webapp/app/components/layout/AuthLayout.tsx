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
      <div className="w-64 bg-gradient-to-b from-amber-800 to-amber-900 text-white shadow-lg">
        <div className="p-5 border-b border-amber-700">
          <h1 className="text-xl font-bold">Morocco Legal Assistant</h1>
        </div>
        <nav className="mt-6">
          <ul className="space-y-1">
            <li>
              <Link 
                href="/dashboard" 
                className="block py-3 px-4 hover:bg-amber-700 transition duration-200 border-l-4 border-transparent hover:border-slate-300"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                href="/chat" 
                className="block py-3 px-4 hover:bg-amber-700 transition duration-200 border-l-4 border-transparent hover:border-slate-300"
              >
                Chat Consultation
              </Link>
            </li>
            <li>
              <Link 
                href="/history" 
                className="block py-3 px-4 hover:bg-amber-700 transition duration-200 border-l-4 border-transparent hover:border-slate-300"
              >
                History
              </Link>
            </li>
            <li className="mt-8">
              <button 
                onClick={handleLogout}
                className="w-full text-left py-3 px-4 hover:bg-amber-700 transition duration-200 border-l-4 border-transparent hover:border-slate-300 text-amber-200"
              >
                Logout
              </button>
            </li>
          </ul>
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
