/**
 * The Morocco Legal Assistant is an AI-powered platform designed to assist
 * Moroccan legal professionals, students, and citizens with legal information,
 * document preparation, and AI-powered consultations. The application features
 * a modern, responsive interface with a gold-themed design that provides a
 * professional and trustworthy user experience.
 *
 * The application uses a monorepo structure with the following components:
 *
 * - `web`: The Next.js frontend application
 * - `api`: The Express.js backend API
 * - `prisma`: The Prisma ORM configuration
 *
 * The project structure is as follows:
 *
 * 

# Morocco Legal Assistant

## Project Overview

The Morocco Legal Assistant is an AI-powered platform designed to assist Moroccan legal professionals, students, and citizens with legal information, document preparation, and AI-powered consultations. The application features a modern, responsive interface with a gold-themed design that provides a professional and trustworthy user experience.

## Features

- **AI Legal Consultation**: Chat with an AI assistant trained on Moroccan law to get answers to legal questions
- **User Authentication**: Secure login and registration system with NextAuth.js
- **User Dashboard**: Personalized dashboard showing recent consultations and legal news
- **User Profile**: View and manage user information
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices

## Tech Stack

- **Frontend**: 
  - Next.js 15 with App Router
  - React 19 with React Hooks
  - TailwindCSS for styling
  - TypeScript for type safety

- **Backend**: 
  - Node.js with Express.js
  - RESTful API architecture
  - JWT authentication

- **Database**: 
  - SQLite (via Prisma ORM)
  - Prisma for database migrations and type-safe queries

- **Authentication**: 
  - NextAuth.js for secure authentication
  - JWT tokens for API authorization

## Project Structure

The project is organized as a monorepo with the following structure:

```
├── .env.example          # Shared environment variables example
├── package.json          # Root package.json with workspace configuration
├── prisma/               # Shared Prisma ORM configuration
│   ├── migrations/       # Database Migrations
│   └── schema.prisma     # Database Schema
├── web/                  # Next.js Frontend Application
│   ├── app/              # Next.js App Router
│   │   ├── auth/         # Authentication Pages
│   │   │   ├── login/    # Login Page
│   │   │   └── register/ # Registration Page
│   │   ├── chat/         # Chat Interface
│   │   ├── components/   # Reusable UI Components
│   │   ├── dashboard/    # User Dashboard
│   │   └── config/       # Configuration Files
│   ├── types/            # TypeScript Type Definitions
│   └── package.json      # Frontend dependencies
└── api/                  # Express.js Backend API
    ├── controllers/      # API Controllers
    ├── middleware/       # API Middleware
    ├── routes/           # API Routes
    ├── server.js         # Express Server
    └── package.json      # Backend dependencies
```

## Database Schema

The application uses Prisma ORM with a SQLite database with the following models:

- **User**: User accounts with authentication information
- **ChatSession**: User chat sessions
- **ChatMessage**: Individual messages in a chat session
- **LegalNews**: Legal news articles for the dashboard

## Installation and Setup

### Prerequisites

- **Node.js 18+** and npm (We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions) OR **Bun** as a faster alternative
- **Git** for version control
- A code editor like **VS Code** with extensions for React, TypeScript, and Tailwind CSS

### Detailed Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Morocco_Legal_Assistant/nextjs_app
   ```

2. **Install dependencies**
   The project uses a monorepo structure with workspaces, which means all dependencies are installed in a single node_modules folder at the root level.
   
   **Using npm:**
   ```bash
   # Install all dependencies (this will install dependencies for all workspaces)
   npm install
   ```
   
   **Using Bun (recommended for faster installation):**
   ```bash
   # Install Bun if you haven't already (Windows PowerShell with admin rights)
   powershell -c "irm https://bun.sh/install.ps1 | iex"
   
   # Install all dependencies with Bun
   bun install
   ```
   
   This command will read the package.json files from both the web and api directories and install all dependencies in a single node_modules folder at the root level, which helps reduce disk space usage and improves installation speed.

3. **Set up environment variables**
   ```bash
   # Copy the example env file to the root directory
   cp .env.example .env
   
   # Edit the .env file with your configuration
   # Required variables include:
   # - DATABASE_URL: Connection string for the SQLite database
   # - NEXTAUTH_SECRET: Secret for NextAuth.js (generate with `openssl rand -base64 32`)
   # - NEXTAUTH_URL: URL for NextAuth.js (e.g., http://localhost:3000)
   ```

4. **Set up the database**
   ```bash
   # From the root directory
   
   # Using npm:
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed # optional
   
   # Using Bun:
   bunx prisma generate
   bunx prisma migrate dev
   bunx prisma db seed # optional
   ```

5. **Start the development servers**
   You can run both the frontend and backend servers simultaneously with a single command from the root directory.
   
   ```bash
   # Using npm:
   npm run dev
   
   # Using Bun:
   bun run dev
   ```
   
   Or start them separately if needed:
   
   ```bash
   # Using npm:
   # Terminal 1: Start the backend API server
   npm run dev:api
   # Terminal 2: Start the frontend Next.js server
   npm run dev:web
   
   # Using Bun:
   # Terminal 1: Start the backend API server
   bun run dev:api
   # Terminal 2: Start the frontend Next.js server
   bun run dev:web
   ```
   
   - The frontend will run on http://localhost:3000
   - The API server will run on http://localhost:5000

6. **Access the application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)
   - API Documentation: [http://localhost:5000/api-docs](http://localhost:5000/api-docs) (if enabled)

7. **Troubleshooting Common Setup Issues**
   
   - **Port conflicts**: If port 3000 or 5000 is already in use, you can change the ports:
     - For the frontend: Edit the `package.json` in the web directory and change the `dev` script
     - For the backend: Edit the `server.js` file in the api directory
   
   - **Database connection issues**: Ensure the `DATABASE_URL` in your `.env` file points to a valid SQLite database location
   
   - **Authentication errors**: Make sure `NEXTAUTH_SECRET` and `NEXTAUTH_URL` are properly set in your `.env` file

## Running in Production

1. **Build the frontend**
   ```bash
   # Using npm:
   npm run build
   
   # Using Bun:
   bun run build
   ```

2. **Start the production servers**
   ```bash
   # Using npm:
   npm run start
   
   # Using Bun:
   bun run start
   ```
   
   Or start them separately if needed:
   
   ```bash
   # Using npm:
   npm run start:api
   npm run start:web
   
   # Using Bun:
   bun run start:api
   bun run start:web
   ```

## Using Bun Instead of npm

This project supports using Bun as a faster alternative to npm. Bun is an all-in-one JavaScript runtime, package manager, and bundler that significantly improves development speed.

### Benefits of Using Bun

- **Faster Installation**: Bun installs dependencies much faster than npm
- **Improved Performance**: JavaScript execution is significantly faster
- **Built-in Watch Mode**: No need for nodemon for API development
- **Workspace Support**: Bun supports workspaces similar to npm
- **Single node_modules**: Maintains the efficient monorepo structure

### Installation

```bash
# For Windows (using PowerShell with Admin rights)
powershell -c "irm https://bun.sh/install.ps1 | iex"
```

### Common Issues with Native Modules

If you encounter issues with native modules like bcrypt when using Bun:

1. Make sure you have build tools installed
2. The project has been configured with `trustedDependencies` in the package.json files to handle native modules

## Project Maintenance and Best Practices

### Monorepo Structure

This project uses a monorepo structure with workspaces to manage dependencies efficiently. Key points to understand:

1. **Single node_modules Directory**: All dependencies are installed in a single `node_modules` directory at the root level, reducing disk space usage and improving installation speed.

2. **Workspace Configuration**: The root `package.json` contains a `workspaces` field that specifies the packages in the monorepo (`web` and `api`).

3. **Package Manager Options**: The project supports both npm and Bun as package managers. Bun is recommended for faster installation and execution times.

3. **Package Management**: Always run `npm install` from the root directory to ensure dependencies are correctly installed for all workspaces.

### Generated Files

The project contains several generated files that should not be manually modified or deleted:

1. **Prisma Generated Files**:
   - Files in `web/app/generated/prisma/` and `app/generated/prisma/` are automatically generated by Prisma
   - These files are referenced in the codebase and should not be manually deleted
   - When making changes to the Prisma schema, always regenerate the client with `npx prisma generate`

2. **Duplicate Schema Files**:
   - You may notice duplicate `schema.prisma` files in different locations
   - These are needed by the Prisma client and should not be manually modified
   - Always make changes to the main schema file in the `prisma/` directory

### Maintenance Tasks

1. **Updating Prisma Schema**:
   ```bash
   # Edit the main schema file
   nano prisma/schema.prisma
   
   # Generate the Prisma client
   npx prisma generate
   
   # Run migrations if needed
   npx prisma migrate dev --name your_migration_name
   ```

2. **Adding New Dependencies**:
   ```bash
   # For frontend dependencies
   npm install package-name --workspace=web
   
   # For backend dependencies
   npm install package-name --workspace=api
   
   # For shared dependencies
   npm install package-name -W
   ```

3. **Project Analysis**:
   The project includes a `cleanup-script.ps1` that can analyze the project structure and provide recommendations without making any changes. Run it with:
   ```bash
   powershell -ExecutionPolicy Bypass -File .\cleanup-script.ps1
   ```

## Contributing

We welcome contributions to the Morocco Legal Assistant project! Here's how you can contribute:

### Development Workflow

1. **Fork the repository** on GitHub

2. **Clone your fork** to your local machine
   ```bash
   git clone https://github.com/YOUR_USERNAME/Morocco_Legal_Assistant.git
   cd Morocco_Legal_Assistant/nextjs_app
   ```

3. **Create a new branch** for your feature or bugfix
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-you-are-fixing
   ```

4. **Make your changes** following our coding standards
   - Use TypeScript for type safety
   - Follow the existing code style and project structure
   - Write meaningful commit messages
   - Add tests for new features when possible

5. **Test your changes**
   ```bash
   # Run frontend tests
   cd web
   npm test
   
   # Run backend tests
   cd ../api
   npm test
   ```

6. **Push your changes** to your fork
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request** from your fork to the main repository

### Coding Standards

- **Frontend**:
  - Use functional components with React Hooks
  - Use TypeScript for all new code
  - Follow the Tailwind CSS class naming conventions
  - Use Next.js best practices for routing and data fetching

- **Backend**:
  - Follow RESTful API design principles
  - Document all API endpoints
  - Write clear error messages
  - Use async/await for asynchronous code

### Pull Request Guidelines

- Keep PRs focused on a single feature or bugfix
- Include a clear description of the changes
- Reference any related issues
- Make sure all tests pass
- Update documentation if necessary

### Getting Help

If you need help with contributing, please:

- Check the existing issues on GitHub
- Join our community chat (if available)
- Reach out to the maintainers

## License

This project is licensed under the MIT License - see the LICENSE file for details.
- **UploadedFile**: Files uploaded by users during chat sessions
- **LegalNews**: Legal news and updates

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd Morocco_Legal_Assistant/nextjs_app
```

2. Install dependencies (this will install dependencies for both web and api packages)

```bash
npm install
```

3. Set up environment variables

Copy the `.env.example` file to create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the values in the `.env` file with your specific configuration.

4. Set up the database

```bash
npx prisma migrate dev --name init
```

5. Start the development servers (both frontend and backend)

```bash
# From the root directory
npm run dev
```

This command uses concurrently to start both the frontend and backend servers simultaneously.

The frontend application will be available at [http://localhost:3000](http://localhost:3000).
The backend API will be available at [http://localhost:5000](http://localhost:5000).

### Running Individual Services

To run only the frontend:

```bash
# From the root directory
npm run dev:web

# Or directly from the web directory
cd web
npm run dev
```

To run only the backend API:

```bash
# From the root directory
npm run dev:api

# Or directly from the api directory
cd api
npm run dev
```



To run only the backend API:

```bash
npm run dev:api
```

## Authentication

The application uses NextAuth.js for authentication. The authentication system is currently being reconfigured. Contributors are welcome to help implement:

- User registration
- Email/password login
- Session management
- Protected routes

## Contributing

### Areas for Contribution

1. **Authentication System**:
   - Implement secure user authentication
   - Set up protected routes
   - Create user profile management

2. **Chat Interface**:
   - Improve the conversational UI
   - Implement message history
   - Add file upload capabilities

3. **Legal Knowledge Base**:
   - Integrate legal document database
   - Implement search functionality
   - Add citation capabilities

4. **Dashboard**:
   - Create user dashboard with analytics
   - Implement saved conversations
   - Add user preferences

5. **Testing**:
   - Write unit and integration tests
   - Implement end-to-end testing

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[License information to be added]

## Contact

[Contact information to be added]

