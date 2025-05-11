# Moroccan AI Law Assistant

<p align="center">
  <img src="webapp/public/logo.png" alt="Moroccan AI Law Assistant Logo" width="200"/>
</p>

## 🌟 Overview

The **Moroccan AI Law Assistant** is a cutting-edge web application designed to democratize access to legal information and assistance in Morocco. By leveraging artificial intelligence, this platform bridges the gap between complex legal systems and citizens seeking legal guidance.

Our mission is to make Moroccan law more accessible, understandable, and navigable for everyone - from legal professionals and students to ordinary citizens who need help with everyday legal matters.

## ✨ Key Features

### 🤖 AI-Powered Legal Consultation
- **Intelligent Chatbot**: Engage with our advanced AI assistant that can answer legal questions, explain legal concepts, and provide guidance on Moroccan law.
- **Context-Aware Responses**: The AI maintains conversation context to provide more relevant and personalized assistance.
- **Multilingual Support**: Interact in Arabic, French, or English to accommodate Morocco's linguistic diversity.

### 📚 Legal Knowledge Base
- **Comprehensive Legal Information**: Access up-to-date information on Moroccan laws, regulations, and legal procedures.
- **Document Templates**: Download and use templates for common legal documents.
- **Legal Terminology Dictionary**: Look up definitions of legal terms in plain language.

### 👥 User-Friendly Experience
- **Intuitive Interface**: Clean, modern design with a focus on accessibility and ease of use.
- **Consultation History**: Review past conversations and legal advice for reference.
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices.

### 🔒 Security & Privacy
- **End-to-End Encryption**: All conversations and personal data are securely encrypted.
- **Anonymous Consultations**: Option to seek legal advice without providing personal information.
- **GDPR Compliant**: Adheres to international data protection standards.

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS for responsive and modern UI
- **State Management**: React Context API
- **Authentication**: JWT-based authentication

### Backend
- **API**: RESTful API endpoints built with Next.js API routes
- **Database**: PostgreSQL for reliable data storage
- **ORM**: Prisma for type-safe database access
- **AI Integration**: Google Gemini for natural language processing and legal reasoning

### DevOps
- **Deployment**: Vercel for seamless deployment and scaling
- **Version Control**: Git with GitHub for collaboration
- **CI/CD**: GitHub Actions for automated testing and deployment

## 📋 Project Structure

```
Moroccan-AI-Law-Assistant/
├── webapp/                # Next.js web application
│   ├── app/               # Application code
│   │   ├── (auth)/        # Authentication pages (login, register)
│   │   ├── (protected)/   # Protected routes (dashboard, chat, history)
│   │   ├── api/           # API endpoints
│   │   ├── components/    # Reusable UI components
│   │   ├── services/      # Database services
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript type definitions
│   ├── public/            # Static assets
│   ├── extension/         # AI model extensions
│   └── module/            # Core modules
├── docs/                  # Documentation
└── README.md             # Project overview
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**
```sh
git clone https://github.com/ayoubdya/Moroccan-AI-Law-Assistant.git
cd Moroccan-AI-Law-Assistant
```

2. **Set up environment variables**
Create a `.env` file in the webapp directory with the following variables:
```
DATABASE_URL="postgresql://username:password@localhost:5432/moroccan_law_assistant"
JWT_SECRET="your-secret-key"
GEMINI_API_KEY="your-gemini-api-key"
```

3. **Install dependencies and run the application**
```sh
cd webapp
npm install
npm run dev
```

4. **Access the application**
Open your browser and navigate to `http://localhost:3000`

## 👥 User Roles

### Citizens
- Ask legal questions
- Access legal information
- Create and manage consultation sessions

### Legal Professionals
- Provide expert insights
- Access specialized legal tools
- Manage client consultations

### Administrators
- Manage user accounts
- Monitor system performance
- Update legal information

## 🌍 Impact

The Moroccan AI Law Assistant aims to:

- **Improve Access to Justice**: Make legal assistance available to all Moroccans regardless of location or economic status.
- **Reduce Legal Costs**: Provide affordable alternatives to traditional legal consultations.
- **Educate the Public**: Enhance legal literacy among Moroccan citizens.
- **Support Legal Professionals**: Provide tools that help lawyers, judges, and legal students work more efficiently.

## 🤝 Contributing

We welcome contributions from developers, legal experts, and anyone passionate about improving access to legal assistance in Morocco. Please see our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions, suggestions, or collaboration opportunities, please contact us at:
- Email: contact@moroccan-law-assistant.com
- GitHub: [@ayoubdya](https://github.com/ayoubdya)

---

<p align="center">
  <i>Making Moroccan law accessible to everyone, one question at a time.</i>
</p>
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
