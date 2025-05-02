'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  M
                </div>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">Morocco Legal</span>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md">
              Get accurate, instant, and confidential legal guidance from our AI-powered platform designed specifically for Moroccan law.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/legal-resources" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Legal Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} Morocco Legal Assistant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
