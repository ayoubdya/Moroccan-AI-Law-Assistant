'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Error messages for different error types
const errorMessages: Record<string, string> = {
  'Configuration': 'There is a problem with the server configuration. Please contact support.',
  'AccessDenied': 'You do not have permission to sign in.',
  'Verification': 'The verification link may have expired or already been used.',
  'OAuthSignin': 'Error in the OAuth sign-in process.',
  'OAuthCallback': 'Error in the OAuth callback process.',
  'OAuthCreateAccount': 'Could not create OAuth account.',
  'EmailCreateAccount': 'Could not create email account.',
  'Callback': 'Error in the callback process.',
  'OAuthAccountNotLinked': 'This email is already associated with another account.',
  'EmailSignin': 'Error sending the email sign-in link.',
  'CredentialsSignin': 'The email or password you entered is incorrect.',
  'SessionRequired': 'Please sign in to access this page.',
  'Default': 'An unexpected error occurred. Please try again later.'
};

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || 'Default';
  const errorMessage = errorMessages[error] || errorMessages['Default'];
  
  // Log error for debugging in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Authentication error:', error);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="mx-auto w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Authentication Error
          </h2>
          <div className="mt-4 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {errorMessage}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <Link
              href="/auth/login"
              className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Return to Login
            </Link>
          </div>
          <div>
            <Link
              href="/"
              className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
