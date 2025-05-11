"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { setToken, setUser, AuthUser } from '../../utils/auth';
import { LoginResponse } from '../../types';
import { jwtDecode, JwtPayload } from 'jwt-decode';

// Define a custom interface for our JWT payload
interface CustomJwtPayload extends JwtPayload {
  userId: string;
  role?: string;
  email?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', {
        email: formData.email,
        password: formData.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const token = response.data.token;
      
      // Store the token
      setToken(token);
      
      try {
        // Decode the JWT token to get user information
        const decoded = jwtDecode<CustomJwtPayload>(token);
        
        // Store user information in sessionStorage
        setUser({
          userId: decoded.userId,
          role: decoded.role,
          email: formData.email
        });
      } catch (decodeErr) {
        console.error('Error decoding token:', decodeErr);
      }
      
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl border-t-4 border-amber-600">
        <div>
          <h1 className="text-center text-3xl font-bold text-amber-900">
            Welcome Back
          </h1>
          <h2 className="mt-2 text-center text-xl font-semibold text-slate-700">
            Sign in to your account
          </h2>
          <p className="mt-3 text-center text-amber-800">
            Or{' '}
            <Link href="/register" className="font-medium text-slate-700 hover:text-slate-900 underline">
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-amber-50 border-l-4 border-amber-600 text-amber-800 px-4 py-3 rounded-r-md">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-amber-800 mb-1">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="appearance-none relative block w-full px-3 py-3 border border-amber-300 placeholder-amber-400 text-amber-900 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 focus:z-10 sm:text-sm"
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
                className="appearance-none relative block w-full px-3 py-3 border border-amber-300 placeholder-amber-400 text-amber-900 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
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
