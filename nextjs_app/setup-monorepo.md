# Monorepo Setup Guide for Morocco Legal Assistant

This guide explains the new monorepo structure for the Morocco Legal Assistant project and provides instructions for transitioning to this structure.

## Why a Monorepo?

We've implemented a monorepo structure to solve the issue of duplicate `node_modules` directories and to better organize our codebase. Benefits include:

- Shared dependencies between packages
- Simplified development workflow
- Easier maintenance and updates
- Better code organization and separation of concerns

## Project Structure

The project is now organized as follows:

```
├── .env.example          # Shared environment variables example
├── package.json          # Root package.json with workspace configuration
├── prisma/               # Shared Prisma ORM configuration
│   ├── migrations/       # Database Migrations
│   └── schema.prisma     # Database Schema
├── web/                  # Next.js Frontend Application
│   ├── app/              # Next.js App Router
│   └── package.json      # Frontend dependencies
└── api/                  # Express.js Backend API
    ├── routes/           # API Routes
    ├── server.js         # Express Server
    └── package.json      # Backend dependencies
```

## Transition Steps

### 1. Understanding the New Structure

- **Root Package**: The root `package.json` now uses npm workspaces to manage the monorepo
- **Web Package**: Contains the Next.js frontend application
- **API Package**: Contains the Express.js backend API
- **Shared Resources**: Prisma schema and environment variables are shared between packages

### 2. Environment Variables

We now have a shared `.env.example` file at the root level. When setting up the project:

1. Copy `.env.example` to `.env` in the root directory
2. Update the values as needed

The environment variables will be accessible to both the web and API packages.

### 3. Running the Project

From the root directory, you can now:

- Run both frontend and backend: `npm run dev`
- Run only the frontend: `npm run dev:web`
- Run only the backend: `npm run dev:api`
- Build the project: `npm run build`

### 4. Database Management

Prisma is now configured at the root level and shared between packages:

```bash
# Run migrations from the root directory
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

### 5. Authentication Flow

The authentication flow has been improved to address previous issues:

- The API now properly returns JSON responses with appropriate content-type headers
- Error handling has been improved in API routes
- Database operations match the Prisma schema

## Common Issues and Solutions

### NextAuth.js Issues

If you encounter the error 'Unexpected token '<', "<!DOCTYPE "... is not valid JSON':

1. Ensure API routes return proper JSON responses with content-type headers
2. Check that the NextAuth URL configuration matches your environment
3. Verify that database operations match the Prisma schema

### Package Installation

When adding new packages:

```bash
# Add a package to the web workspace
npm install package-name --workspace=web

# Add a package to the api workspace
npm install package-name --workspace=api

# Add a package to all workspaces
npm install package-name -w
```

## Next Steps

1. Complete the user registration and login functionality
2. Implement the chat interface with AI integration
3. Develop the dashboard with user statistics
4. Add legal document management features

For any questions or issues with the new structure, please refer to the project documentation or contact the team.
