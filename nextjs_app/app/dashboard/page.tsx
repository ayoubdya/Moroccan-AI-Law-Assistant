"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AppHeader from '../components/layout/AppHeader';

// Define types for our data
type ChatSession = {
  id: number;
  sessionName: string;
  startedAt: string;
};

type LegalNewsItem = {
  id: number;
  title: string;
  publishedAt: string;
};

export default function DashboardPage() {
  const [recentSessions, setRecentSessions] = useState<ChatSession[]>([]);
  const [legalNews, setLegalNews] = useState<LegalNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - would be replaced with actual API calls in a real implementation
    setRecentSessions([
      { id: 1, sessionName: 'Property Law Inquiry', startedAt: new Date().toISOString() },
      { id: 2, sessionName: 'Business Registration', startedAt: new Date(Date.now() - 86400000).toISOString() },
      { id: 3, sessionName: 'Employment Contract', startedAt: new Date(Date.now() - 172800000).toISOString() },
    ]);
    
    setLegalNews([
      { id: 1, title: 'New Tax Regulations for Small Businesses', publishedAt: new Date().toISOString() },
      { id: 2, title: 'Changes to Property Law in Morocco', publishedAt: new Date(Date.now() - 86400000).toISOString() },
      { id: 3, title: 'Supreme Court Ruling on Labor Disputes', publishedAt: new Date(Date.now() - 172800000).toISOString() },
    ]);
    
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Use the new AppHeader component */}
      <div className="mb-6">
        <AppHeader />
      </div>
      
      {/* Dashboard Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recent Chat Sessions */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Chat Sessions</h2>
              <Link 
                href="/chat/new"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                New Chat
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentSessions.length > 0 ? (
                recentSessions.map((session: any) => (
                  <div key={session.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <Link href={`/chat/${session.id}`} className="block hover:bg-gray-50 p-2 rounded-md">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-blue-600">{session.sessionName}</h3>
                        <span className="text-sm text-gray-500">
                          {new Date(session.startedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No recent sessions found.</p>
              )}
            </div>
          </div>

          {/* Legal News */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Latest Legal News</h2>
            
            <div className="space-y-4">
              {legalNews.length > 0 ? (
                legalNews.map((news: any) => (
                  <div key={news.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <h3 className="text-lg font-medium text-gray-900">{news.title}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(news.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No news available.</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link 
              href="/chat/new"
              className="p-4 border rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center text-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="font-medium">Start New Consultation</span>
            </Link>
            
            <Link 
              href="/dashboard/documents"
              className="p-4 border rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center text-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-medium">View Documents</span>
            </Link>
            
            <Link 
              href="/dashboard/profile"
              className="p-4 border rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center text-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium">Manage Profile</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
