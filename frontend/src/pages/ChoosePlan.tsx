import { motion } from "framer-motion";
import PaymentSection from "./PaymentSection";
import { useState } from "react";

const userTypes = [
  {
    name: "Lawyer",
    icon: "⚖️",
    summary: "Advanced research tools, AI chat with legal citations, dashboard for saved research, priority news, and premium templates.",
    plan: "Pro or Enterprise recommended",
    features: [
      "AI-powered legal chatbot (RAG-enabled)",
      "Access to all legal codes and jurisprudence",
      "Dashboard with saved research & query history",
      "Premium legal templates",
      "Usage statistics & analytics",
      "Priority support"
    ],
    cta: "Start as Lawyer",
    highlight: true
  },
  {
    name: "Judge",
    icon: "🧑‍⚖️",
    summary: "Access to up-to-date legal codes, news, and advanced search for jurisprudence and regulations.",
    plan: "Pro or Enterprise recommended",
    features: [
      "AI-powered legal chatbot",
      "Legal news & official updates",
      "Full legal library (codes, decrees, jurisprudence)",
      "Visual guides for legal processes",
      "Dashboard with saved queries"
    ],
    cta: "Start as Judge",
    highlight: false
  },
  {
    name: "Law Student",
    icon: "🎓",
    summary: "AI Q&A for legal studies, access to codes and court decisions, and learning resources.",
    plan: "Free or Pro",
    features: [
      "AI chatbot for legal questions",
      "Access to legal codes & court decisions",
      "Basic dashboard for saved research",
      "Learning resources & guides"
    ],
    cta: "Start as Student",
    highlight: false
  },
  {
    name: "Business",
    icon: "🏢",
    summary: "Legal compliance tools, contract templates, business law updates, and AI-powered guidance.",
    plan: "Pro or Enterprise recommended",
    features: [
      "AI chatbot for business law",
      "Contract & compliance templates",
      "Alerts for new business regulations",
      "Team dashboard (Enterprise)"
    ],
    cta: "Start as Business",
    highlight: false
  },
  {
    name: "Citizen",
    icon: "🧑‍💼",
    summary: "Simple legal Q&A, guides to rights and procedures, and access to public legal resources.",
    plan: "Free or Pro",
    features: [
      "AI chatbot for legal clarity",
      "Guides for common legal actions",
      "Access to public legal codes",
      "News & updates"
    ],
    cta: "Start as Citizen",
    highlight: false
  }
];


const ChoosePlan = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);

  const handleChoose = (userType: string) => {
    setSelectedUserType(userType);
    // Paid profiles go to payment, free go directly to confirmation
    if (userType === "Lawyer" || userType === "Judge" || userType === "Business") {
      setStep(2);
    } else {
      setStep(3);
    }
  };

  const handlePaymentComplete = () => {
    setStep(3);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 py-12 px-4">
      {/* Stepper/Progress */}
      <div className="w-full max-w-2xl mx-auto mb-6 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <span className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= 1 ? "bg-blue-700 text-white" : "bg-blue-200 text-blue-700"} font-bold`}>1</span>
          <span className={`font-semibold ${step >= 1 ? "text-blue-700" : "text-blue-400"}`}>Register</span>
          <span className={`w-10 h-1 ${step >= 2 ? "bg-blue-400" : "bg-blue-200"} mx-2 rounded`} />
          <span className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= 2 ? "bg-blue-700 text-white" : "bg-blue-200 text-blue-700"} font-bold`}>2</span>
          <span className={`font-semibold ${step >= 2 ? "text-blue-700" : "text-blue-400"}`}>Choose Plan</span>
          <span className={`w-10 h-1 ${step === 3 ? "bg-blue-400" : "bg-blue-200"} mx-2 rounded`} />
          <span className={`w-8 h-8 flex items-center justify-center rounded-full ${step === 3 ? "bg-blue-700 text-white" : "bg-blue-200 text-blue-700"} font-bold`}>3</span>
          <span className={`font-semibold ${step === 3 ? "text-blue-700" : "text-blue-400"}`}>Complete</span>
        </div>
      </div>
      {/* Step 1: Profile selection */}
      {step === 1 && (
        <motion.div
          className="w-full max-w-5xl mx-auto mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl font-extrabold text-blue-800 mb-4 text-center">Who Are You?</h1>
          <p className="text-blue-700 text-center mb-8">Select your user profile to see the best features and plan recommendations for you.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userTypes.map((user) => (
              <motion.div
                key={user.name}
                className={`rounded-2xl shadow-xl p-8 bg-white/80 border transition-all flex flex-col items-center ${user.highlight ? 'border-4 border-blue-700 scale-105 z-10' : 'border-blue-100'}`}
                whileHover={{ scale: 1.06, y: -4 }}
              >
                <div className="text-5xl mb-3">{user.icon}</div>
                <h2 className={`text-2xl font-bold mb-2 ${user.highlight ? 'text-blue-700' : 'text-blue-800'}`}>{user.name}</h2>
                <div className="text-blue-800 font-semibold mb-2 text-sm">{user.plan}</div>
                <div className="mb-4 text-blue-700 text-center text-sm">{user.summary}</div>
                <ul className="mb-6 space-y-2 text-blue-700 text-xs text-left w-full max-w-xs mx-auto">
                  {user.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <span className="mr-2 text-green-500">✔️</span> {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full px-6 py-3 rounded-lg font-bold transition-all ${user.highlight ? 'bg-blue-700 text-white hover:bg-blue-800 shadow-lg' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                  onClick={() => handleChoose(user.name)}
                >
                  {user.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      {/* Step 2: Payment */}
      {step === 2 && selectedUserType && (
        <PaymentSection userType={selectedUserType} onComplete={handlePaymentComplete} />
      )}
      {/* Step 3: Confirmation */}
      {step === 3 && selectedUserType && (
        <motion.div
          className="w-full max-w-lg bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-10 border border-blue-100 text-center mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl font-extrabold text-blue-800 mb-4">Welcome to Morocco Legal Assistant!</h1>
          <div className="text-lg text-blue-700 mb-6">
            {`You have selected the ${selectedUserType} profile. Your personalized dashboard and features are being prepared!`}
          </div>
          <a href="/dashboard" className="w-full block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg shadow transition-all text-lg mb-2">Go to Dashboard</a>
          <a href="/" className="w-full block bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold py-3 rounded-lg shadow transition-all text-lg">Back to Home</a>
        </motion.div>
      )}
    </div>
  );
};

export default ChoosePlan;
