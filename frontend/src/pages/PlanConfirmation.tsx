import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const PlanConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // We'll pass the chosen plan/userType as state
  const { userType } = location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 py-12 px-4">
      <motion.div
        className="w-full max-w-lg bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-10 border border-blue-100 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl font-extrabold text-blue-800 mb-4">Welcome to Morocco Legal Assistant!</h1>
        <div className="text-lg text-blue-700 mb-6">
          {userType
            ? `You have selected the ${userType} profile. Your personalized dashboard and features are being prepared!`
            : "Your plan selection has been received. Get ready to explore powerful legal tools!"}
        </div>
        <button
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg shadow transition-all text-lg mb-2"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>
        <button
          className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold py-3 rounded-lg shadow transition-all text-lg"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
};

export default PlanConfirmation;
