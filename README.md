# Morocco Legal Assistant

A modern web app to assist Moroccan legal professionals, students, and citizens with legal information, documents, and AI-powered features.

## Project Structure

```
Morocco_Legal_Assistant/
├── backend/           # Django backend (APIs, authentication, database)
├── frontend/          # React + TypeScript + Tailwind CSS frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components (Navbar, Footer, etc.)
│   │   ├── pages/        # Main app pages (Login, Register, Dashboard, etc.)
│   │   └── context/      # React context for auth, etc.
│   ├── public/           # Static files and index.html
│   └── package.json      # Frontend dependencies
├── .gitignore         # Git ignore rules
└── README.md          # Project overview and setup instructions
```

## Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- Python 3.9+
- Django (for backend)

## Getting Started

### 1. Clone the repository
```sh
git clone https://github.com/ayoubdya/Moroccan-AI-Law-Assistant.git
cd Moroccan-AI-Law-Assistant
```

### 2. Frontend Setup
```sh
cd frontend
npm install
npm start
```
- The frontend will run at `http://localhost:3000` by default.

### 3. Backend Setup
```sh
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
- The backend will run at `http://localhost:8000` by default.

## Usage
- Register or login as a user.
- Choose your legal profile and plan.
- (If required) Complete payment for premium plans.
- Access your dashboard and legal tools.

## Features
- Multi-step onboarding (register, choose plan, payment, confirmation)
- Dynamic Navbar (shows different links for logged-in/logged-out users)
- Responsive, modern UI (Tailwind CSS, Framer Motion)
- Ready for integration with Django backend and payment providers

## Contribution
Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change.

## License
MIT
