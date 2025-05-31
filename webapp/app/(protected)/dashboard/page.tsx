"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { sessionsApi } from '@/app/utils/api';
import { getUser } from '@/app/utils/auth';

interface Session {
  id: string;
  title: string;
  startDate: string;
  messageCount?: number;
}

export default function DashboardPage() {
  const [recentSessions, setRecentSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchRecentSessions = async () => {
      try {
        setLoading(true);
        
        // Get the current user from session storage
        const user = getUser();
        
        if (!user || !user.userId) {
          throw new Error('User ID not found');
        }
        
        // Pass the user ID to the API call
        const sessions = await sessionsApi.getAllSessions(user.userId);
        
        // Sort by date (newest first) and take the 3 most recent
        const sortedSessions = sessions
          .sort((a: Session, b: Session) => {
            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
          })
          .slice(0, 3);
        
        setRecentSessions(sortedSessions);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch recent sessions:', err);
        setError('Could not load recent consultations');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecentSessions();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-amber-900">Dashboard</h1>
      <p className="text-amber-700 mb-6">Manage your legal consultations and resources</p>
      
      <div className="bg-white rounded-lg shadow-md border border-amber-100 p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-amber-900">Welcome to Morocco Legal Assistant</h2>
        <p className="text-amber-800 mb-4">
          Your AI-powered legal assistant for Moroccan law. Get instant answers to your legal questions,
          understand your rights, and access expert legal guidance.
        </p>
        <div className="mt-4">
          <Link href="/chat">
            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md transition-colors">
              Start New Consultation
            </button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-amber-100 p-6">
          <h2 className="text-lg font-semibold mb-3 text-amber-900">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/chat" className="block p-4 bg-amber-50 rounded-md hover:bg-amber-100 transition-colors border border-amber-200">
              <div className="font-medium text-amber-900">New Consultation</div>
              <div className="text-sm text-amber-700">Ask a new legal question</div>
            </Link>
            <Link href="/history" className="block p-4 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors border border-slate-200">
              <div className="font-medium text-slate-700">View History</div>
              <div className="text-sm text-slate-600">Access your past consultations</div>
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md border border-amber-100 p-6">
          <h2 className="text-lg font-semibold mb-3 text-amber-900">Recent Consultations</h2>
          
          {loading ? (
            <div className="text-amber-700 p-4 bg-amber-50 rounded-md border border-amber-200 flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-amber-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading recent consultations...
            </div>
          ) : error ? (
            <div className="text-amber-700 italic p-4 bg-amber-50 rounded-md border border-amber-200">
              {error}
            </div>
          ) : recentSessions.length === 0 ? (
            <div className="text-amber-700 italic p-4 bg-amber-50 rounded-md border border-amber-200">
              No recent consultations found. Start a new one!
            </div>
          ) : (
            <div className="divide-y divide-amber-100">
              {recentSessions.map((session) => {
                const date = new Date(session.startDate);
                const formattedDate = date.toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });
                
                return (
                  <Link 
                    href={`/chat?session=${session.id}`} 
                    key={session.id}
                    className="block p-3 hover:bg-amber-50 transition-colors rounded-md"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-amber-900">{session.title}</h3>
                        <p className="text-xs text-amber-700">{formattedDate}</p>
                      </div>
                      {session.messageCount && (
                        <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full">
                          {session.messageCount} msgs
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          
          <div className="mt-4">
            <Link href="/history">
              <button className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-md transition-colors">
                View All Consultations
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
