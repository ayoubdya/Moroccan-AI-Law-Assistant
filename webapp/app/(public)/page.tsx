import React from 'react';
import Link from 'next/link';
import Button from '../components/ui/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-800">Morocco Legal Assistant</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-blue-800">
                Login
              </Link>
              <Link href="/register">
                <Button variant="primary">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                Your AI-Powered Legal Assistant for Moroccan Law
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                Get instant answers to your legal questions, understand your rights, and access expert legal guidance tailored to Moroccan law.
              </p>
              <div className="mt-8 flex space-x-4">
                <Link href="/register">
                  <Button variant="primary" className="px-6 py-3">Get Started</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="px-6 py-3">Login</Button>
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2">
              {/* Placeholder for an image */}
              <div className="bg-gray-300 rounded-lg h-96 w-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Get the legal guidance you need in three simple steps
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Create an Account</h3>
              <p className="mt-2 text-gray-600">
                Sign up for free and create your personal account to get started.
              </p>
            </div>
            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Ask Your Question</h3>
              <p className="mt-2 text-gray-600">
                Type your legal question in natural language and get instant answers.
              </p>
            </div>
            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Receive Expert Guidance</h3>
              <p className="mt-2 text-gray-600">
                Get accurate information based on Moroccan law and practical recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">AI-Powered Legal Answers</h3>
              <p className="mt-2 text-gray-600">
                Get instant answers to your legal questions based on Moroccan law.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">Plain Language Explanations</h3>
              <p className="mt-2 text-gray-600">
                Complex legal concepts explained in simple, easy-to-understand language.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">Consultation History</h3>
              <p className="mt-2 text-gray-600">
                Access your past consultations and legal advice anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start">
              <span className="text-xl font-bold text-blue-800">Morocco Legal Assistant</span>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-center text-gray-500 md:text-right">
                &copy; {new Date().getFullYear()} Morocco Legal Assistant. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
