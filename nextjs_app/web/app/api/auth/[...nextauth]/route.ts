import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';

// API URL from environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Validation schema for login credentials
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          // Validate credentials
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // Parse and validate with zod
          const result = loginSchema.safeParse(credentials);
          if (!result.success) {
            console.error('Validation error:', result.error);
            return null;
          }

          // Call the backend API for authentication
          const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            console.error('Authentication failed:', data.message);
            return null;
          }

          // Return user object from the API response
          return {
            id: String(data.user.id),
            email: data.user.email,
            name: data.user.fullName,
            // Store the token for API calls
            token: data.token,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Add user id and API token to the JWT
        token.id = user.id;
        token.apiToken = (user as any).token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // Add user id and API token to the session
        (session.user as any).id = token.id as string;
        (session.user as any).token = token.apiToken as string;
        (session as any).apiToken = token.apiToken as string;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
