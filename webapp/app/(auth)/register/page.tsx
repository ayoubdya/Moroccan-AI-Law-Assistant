"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { setToken } from '../../utils/auth';
import { LoginResponse } from '../../types';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...userData } = formData;
      const response = await axios.post('/api/auth/register', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setToken(response.data.token);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.response?.data?.error || err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl border-t-4 border-slate-600">
        <div>
          <h1 className="text-center text-3xl font-bold text-amber-900">
            Join Morocco Legal Assistant
          </h1>
          <h2 className="mt-2 text-center text-xl font-semibold text-slate-700">
            Create your account
          </h2>
          <p className="mt-3 text-center text-amber-800">
            Or{' '}
            <Link href="/login" className="font-medium text-slate-700 hover:text-slate-900 underline">
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-amber-50 border-l-4 border-amber-600 text-amber-800 px-4 py-3 rounded-r-md">
              {error}
            </div>
          )}
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-amber-800 mb-1">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-amber-300 placeholder-amber-400 text-amber-900 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-amber-800 mb-1">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-amber-300 placeholder-amber-400 text-amber-900 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-amber-800 mb-1">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-amber-300 placeholder-amber-400 text-amber-900 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-amber-800 mb-1">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-amber-300 placeholder-amber-400 text-amber-900 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-amber-800 mb-1">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-amber-300 placeholder-amber-400 text-amber-900 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-amber-800 mb-1">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 text-amber-900"
              >
                <option value="student">Student</option>
                <option value="lawyer">Lawyer</option>
                <option value="judge">Judge</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-700 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
        <div className="text-center mt-6 pt-4 border-t border-amber-200">
          <Link href="/" className="inline-flex items-center font-medium text-amber-700 hover:text-amber-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
