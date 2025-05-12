import { DefaultSession } from 'next-auth';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      token?: string; // JWT token from the backend API
    } & DefaultSession['user'];
    apiToken: string; // JWT token from the backend API
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    token?: string; // JWT token from the backend API
  }
}

// Extend the JWT type
declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    apiToken?: string; // JWT token from the backend API
  }
}
