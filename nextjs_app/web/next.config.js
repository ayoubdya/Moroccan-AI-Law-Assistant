/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable tracing to avoid permission issues
  outputFileTracingExcludes: {
    '*': [
      'node_modules/**',
      '.next/**',
    ],
  },
  // Other Next.js config options
  reactStrictMode: true,
};

module.exports = nextConfig;
