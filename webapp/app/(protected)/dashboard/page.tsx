import React from 'react';
import Link from 'next/link';

export default function DashboardPage() {
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
          <div className="text-amber-700 italic p-4 bg-amber-50 rounded-md border border-amber-200">
            Your recent consultations will appear here.
          </div>
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
