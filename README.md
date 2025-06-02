# Moroccan AI Law Assistant

## Project Overview

The **Moroccan AI Law Assistant** is a Next.js web application designed to provide AI-powered legal assistance for Moroccan law. The application helps users get information about legal matters through an intelligent chatbot interface that leverages Google's Gemini AI model and retrieval-augmented generation (RAG) techniques.

## Architecture

The project follows a modern web application architecture:

### Frontend
- **Framework**: Next.js with TypeScript
- **UI**: React components with Tailwind CSS
- **State Management**: React hooks and context
- **Authentication**: Custom JWT-based authentication

### Backend
- **API**: Next.js API routes
- **Database**: PostgreSQL (running in Docker)
- **ORM**: Prisma for type-safe database access
- **AI**: Google Gemini for NLP and Pinecone for vector search

## Key Features

### Authentication System
- JWT-based authentication with secure token storage
- User roles (student, lawyer, judge)
- Form validation and error handling
- Session management

### Chat Interface
- Real-time streaming responses
- Markdown rendering for formatted legal information
- Chat history and session management
- Typing indicators and UI feedback

### AI Integration
- Legal question answering with context awareness
- Retrieval-augmented generation for accurate information
- Translation capabilities for multilingual support
- Structured responses with applicable law and recommendations

## Database Schema

The application uses PostgreSQL with the following models:

1. **User**: Authentication and profile information
   - ID, email, name, password, role

2. **Session**: Conversation sessions
   - ID, user ID, title, start date

3. **Chat**: Individual messages
   - ID, session ID, user ID, sender, message, type, timestamp

## Project Structure

```
Moroccan-AI-Law-Assistant/
├── webapp/                # Next.js web application
│   ├── app/               # Application code
│   │   ├── (auth)/        # Authentication pages
│   │   ├── (protected)/   # Protected routes
│   │   ├── api/           # API endpoints
│   │   ├── components/    # UI components
│   │   ├── services/      # Database services
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript types
│   ├── prisma/            # Database schema and migrations
│   ├── public/            # Static assets
│   ├── extension/         # AI model extensions
│   └── module/            # Core modules
└── rag/                   # Retrieval-augmented generation components
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- Docker and Docker Compose
- PostgreSQL 14

### Database Setup
The project uses PostgreSQL running in Docker:
```
docker run --name moroccan_pg -e POSTGRES_PASSWORD=yourpassword -e POSTGRES_DB=moroccan_law_assistant -p 5432:5432 -d postgres:14
```

### Installation

1. Clone the repository
```
git clone https://github.com/ayoubdya/Moroccan-AI-Law-Assistant.git
cd Moroccan-AI-Law-Assistant
```

2. Set up environment variables
Create a `.env` file in the webapp directory with:
```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/moroccan_law_assistant
JWT_SECRET=your-secret-key
GEMINI_API_KEY=your-gemini-api-key
```

3. Install dependencies and run migrations
```
cd webapp
npm install
npx prisma migrate dev
npm run dev
```

4. Access the application
Open your browser and navigate to `http://localhost:3000`

## Development Status

The application currently has:
- Functional authentication system
- Working chat interface with AI integration
- Database integration with PostgreSQL
- Session and message history management

## License

This project is licensed under the MIT License.