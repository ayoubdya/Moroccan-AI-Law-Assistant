import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 py-12 px-4">
      <motion.div
        className="w-full max-w-md bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-blue-100"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl font-extrabold text-blue-800 mb-8 text-center">Sign In to Your Account</h1>
        <form className="space-y-6">

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-blue-700 mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-blue-200 bg-white/80 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-blue-700 mb-1">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 rounded-lg border border-blue-200 bg-white/80 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Your password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 text-sm font-semibold focus:outline-none"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="button"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg shadow transition-all text-lg"
            onClick={() => {
              login({ name: "Demo User", type: "Lawyer" });
              navigate("/dashboard");
            }}
          >
            Login
          </button>
        </form>
        <div className="mt-8 text-center">
          <span className="text-blue-700">Don't have an account?</span>
          <a href="/register" className="ml-2 text-blue-700 font-bold hover:underline">Register</a>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
