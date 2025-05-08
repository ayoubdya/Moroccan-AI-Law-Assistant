# Frontend Setup Guide for Morocco Legal Assistant

This guide focuses on setting up and running the Next.js frontend for the Morocco Legal Assistant project using Bun as the JavaScript runtime and package manager.

## Prerequisites

- **Bun**: Fast JavaScript runtime and package manager
- **Git**: For version control
- **VS Code** (recommended): With extensions for React, TypeScript, and Tailwind CSS

## Installation Steps

### 1. Install Bun

```bash
# For Windows (using PowerShell with Admin rights)
powershell -c "irm https://bun.sh/install.ps1 | iex"

# Verify installation
bun --version
```

### 2. Set Up the Frontend

```bash
# Navigate to the project directory
cd c:\Users\brkha\Desktop\project_test\Moroccan-AI-Law-Assistant\nextjs_app

# Install dependencies for the frontend only
bun install --cwd web
```

### 3. Set Up Environment Variables

```bash
# Copy the example env file to create a .env.local file in the web directory
cp .env.example web/.env.local

# Edit the .env.local file with your configuration
# Required variables include:
# - NEXTAUTH_SECRET: Secret for NextAuth.js (generate with `openssl rand -base64 32`)
# - NEXTAUTH_URL: URL for NextAuth.js (e.g., http://localhost:3000)
```

### 4. Generate Prisma Client

```bash
# From the project root
bunx prisma generate
```

### 5. Run the Frontend

```bash
# From the web directory
cd web
bun run dev:bun

# Or from the project root
bun --cwd web run dev:bun
```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

## API Endpoints

The frontend is designed to interact with the following API endpoints, which will be implemented by your team on the backend:

### Authentication Endpoints

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Log in an existing user
- `GET /api/auth/me`: Get the current user's information
- `POST /api/auth/logout`: Log out the current user

### Chat Endpoints

- `GET /api/chat/sessions`: Get all chat sessions for the current user
- `POST /api/chat/sessions`: Create a new chat session
- `GET /api/chat/sessions/:id`: Get a specific chat session
- `POST /api/chat/sessions/:id/messages`: Send a message in a chat session

### User Profile Endpoints

- `GET /api/users/profile`: Get the current user's profile
- `PUT /api/users/profile`: Update the current user's profile

### Legal Document Endpoints

- `GET /api/documents`: Get all legal documents
- `GET /api/documents/:id`: Get a specific legal document
- `GET /api/documents/categories`: Get all document categories

## Adding New Dependencies

To add new packages to the frontend:

```bash
# Add a package to the frontend
bun add package-name --cwd web

# Add a development dependency
bun add package-name --dev --cwd web
```

## Building for Production

```bash
# From the web directory
cd web
bun run build

# Start the production server
bun run start
```

## Troubleshooting

### Common Issues

1. **Authentication Errors**:
   - Make sure `NEXTAUTH_SECRET` and `NEXTAUTH_URL` are properly set in your `.env.local` file
   - Check that the API endpoints for authentication are correctly configured

2. **Prisma Errors**:
   - If you encounter Prisma-related errors, try regenerating the Prisma client with `bunx prisma generate`
   - Ensure the database URL is correctly set in the environment variables

3. **Bun-specific Issues**:
   - If you encounter issues with native modules like bcrypt, make sure the `trustedDependencies` field is correctly set in the package.json
   - For other Bun-related issues, refer to the [Bun documentation](https://bun.sh/docs)

## Next Steps

After setting up the frontend:

1. Implement the user interface for authentication (login and registration)
2. Create the chat interface for interacting with the AI assistant
3. Develop the user dashboard and profile management features
4. Integrate with the API endpoints once they are implemented by your team
