// Main navigation bar for Morocco Legal Assistant
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-lg rounded-b-2xl border-b border-blue-100 flex items-center justify-between px-4 sm:px-8 py-3 sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-blue-400 text-white text-2xl shadow-lg mr-2">
          {/* Inline SVG for Scales of Justice */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
            <path d="M12 2V4M12 6V20M5 20H19M7 10C7 10 6.5 14 4 15C1.5 16 7 17 7 17M17 10C17 10 17.5 14 20 15C22.5 16 17 17 17 17M7 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span className="text-xl font-extrabold text-blue-700 tracking-tight select-none">Morocco Legal Assistant</span>
      </div>
      <div className="space-x-2 md:space-x-6 hidden md:flex items-center">
        {!user && (
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-2 rounded-md font-medium transition ${isActive ? "bg-blue-100 text-blue-800 font-bold" : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"}`
            }
          >
            Home
          </NavLink>
        )}
        {!user && (
          <>
            <a href="#features" className="px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition">Features</a>
            <a href="#pricing" className="px-3 py-2 rounded-md font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition">Pricing</a>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md font-medium transition ${isActive ? "bg-blue-100 text-blue-800 font-bold" : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"}`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `ml-2 px-4 py-2 rounded-lg font-semibold border-2 border-blue-700 transition-all shadow ${isActive ? "bg-blue-700 text-white" : "text-blue-700 bg-white hover:bg-blue-700 hover:text-white"}`
              }
            >
              Register
            </NavLink>
          </>
        )}
        {user && (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md font-medium transition ${isActive ? "bg-blue-100 text-blue-800 font-bold" : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/chatbot"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md font-medium transition ${isActive ? "bg-blue-100 text-blue-800 font-bold" : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"}`
              }
            >
              Chatbot
            </NavLink>
            <NavLink
              to="/legal-news"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md font-medium transition ${isActive ? "bg-blue-100 text-blue-800 font-bold" : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"}`
              }
            >
              Legal News
            </NavLink>
            <span className="ml-4 px-3 py-2 rounded bg-blue-50 text-blue-700 font-semibold flex items-center">
              <span className="mr-2">{user.name}</span>
              <span className="text-xs bg-blue-200 text-blue-800 rounded px-2 py-1 ml-1">{user.type}</span>
            </span>
            <button
              onClick={() => { logout(); navigate("/"); }}
              className="ml-2 px-4 py-2 rounded-lg font-semibold border-2 border-red-500 text-red-600 bg-white hover:bg-red-500 hover:text-white transition-all shadow"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
