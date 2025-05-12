import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Simple middleware that allows all requests through
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/chat/:path*',
    '/auth/:path*',
  ],
};