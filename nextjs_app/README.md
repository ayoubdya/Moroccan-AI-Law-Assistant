# Morocco Legal Assistant

## Project Overview

The Morocco Legal Assistant is an AI-powered application designed to provide legal assistance and information about Moroccan law. It features a conversational interface that allows users to ask legal questions, get information about legal procedures, and access relevant legal documents.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: SQLite (via Prisma ORM)
- **Authentication**: NextAuth.js
- **Form Validation**: Zod
- **Styling**: TailwindCSS

## Project Structure

```
├── app/                  # Next.js App Router
│   ├── api/              # API Routes
│   ├── auth/             # Authentication Pages
│   │   ├── login/        # Login Page
│   │   └── register/     # Registration Page
│   ├── chat/             # Chat Interface
│   ├── components/       # Reusable UI Components
│   │   ├── layout/       # Layout Components
│   │   └── ui/           # UI Components
│   ├── dashboard/        # User Dashboard
│   └── config/           # Configuration Files
├── prisma/               # Prisma ORM
│   ├── migrations/       # Database Migrations
│   └── schema.prisma     # Database Schema
└── types/                # TypeScript Type Definitions
```

## Database Schema

The application uses Prisma ORM with a SQLite database with the following models:

- **User**: User accounts with authentication information
- **ChatSession**: User chat sessions
- **ChatMessage**: Individual messages in a chat session
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

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

4. Set up the database

```bash
npx prisma migrate dev --name init
```

5. Start the development server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

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

