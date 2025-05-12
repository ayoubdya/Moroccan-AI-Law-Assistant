# Monorepo Setup Guide for Morocco Legal Assistant

This guide explains the monorepo structure for the Morocco Legal Assistant project and provides instructions for working with this structure.

## Why a Monorepo?

We've implemented a monorepo structure with npm workspaces to organize our codebase and optimize dependency management. With this approach, all dependencies are installed in a single `node_modules` folder at the root level. Benefits include:

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

When adding new packages, use the workspace flag to specify which workspace the package should be added to. All packages will be installed in the single node_modules folder at the root level:

```bash
# Add a package to the web workspace
npm install package-name --workspace=web

# Add a package to the api workspace
npm install package-name --workspace=api

# Add a shared package to the root (available to all workspaces)
npm install package-name --save-dev

# Add a development dependency to a specific workspace
npm install package-name --workspace=web --save-dev
```

This approach ensures that all dependencies are managed efficiently in a single node_modules folder, avoiding duplication and reducing disk space usage.

## Using Bun Instead of npm

This project now supports using Bun as a faster alternative to npm. Bun is an all-in-one JavaScript runtime, package manager, and bundler that significantly improves development speed.

### Why Use Bun?

- **Faster Installation**: Bun installs dependencies much faster than npm
- **Improved Performance**: JavaScript execution is significantly faster
- **Built-in Watch Mode**: No need for nodemon for API development
- **Workspace Support**: Bun supports workspaces similar to npm
- **Single node_modules**: Maintains the efficient monorepo structure

### Setting Up Bun

1. **Install Bun**:
   ```bash
   # For Windows (using PowerShell with Admin rights)
   powershell -c "irm https://bun.sh/install.ps1 | iex"
   ```

2. **Clean existing node_modules** (if switching from npm):
   ```bash
   # From the root directory
   bun run clean
   ```

3. **Install dependencies with Bun**:
   ```bash
   # From the root directory
   bun install
   ```

4. **Generate Prisma client**:
   ```bash
   # From the root directory
   bunx prisma generate
   ```

5. **Run the project**:
   ```bash
   # Start both frontend and backend
   bun run dev
   ```

### Adding New Packages with Bun

To add new packages while maintaining the monorepo structure:

```bash
# Add a package to the web workspace
bun add package-name --cwd web

# Add a package to the api workspace
bun add package-name --cwd api

# Add a shared package to the root
bun add package-name --dev
```

### Handling Native Modules

The package.json files have been configured with `trustedDependencies` to handle native modules like bcrypt when using Bun:

```json
"trustedDependencies": ["bcrypt"]
```

## Next Steps

1. Complete the user registration and login functionality
2. Implement the chat interface with AI integration
3. Develop the dashboard with user statistics
4. Add legal document management features

For any questions or issues with the new structure, please refer to the project documentation or contact the team.
