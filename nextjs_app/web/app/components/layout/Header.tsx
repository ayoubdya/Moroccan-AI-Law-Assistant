'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 relative">
              <div className="absolute inset-0 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
            </div>
            <span className="text-xl font-bold text-gray-900">Morocco Legal</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6 mr-4">
              <Link href="/#features" className="text-gray-600 hover:text-blue-600 font-medium">
                Features
              </Link>
              <Link href="/#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium">
                How It Works
              </Link>
              <Link href="/#testimonials" className="text-gray-600 hover:text-blue-600 font-medium">
                Testimonials
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Button href="/auth/login" variant="outline" size="sm">
                Login
              </Button>
              <Button href="/auth/register" variant="primary" size="sm">
                Sign Up
              </Button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            title="Toggle mobile menu"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/#features" 
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="/#how-it-works" 
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                href="/#testimonials" 
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                <Button href="/auth/login" variant="outline" size="sm" className="w-full">
                  Login
                </Button>
                <Button href="/auth/register" variant="primary" size="sm" className="w-full">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
