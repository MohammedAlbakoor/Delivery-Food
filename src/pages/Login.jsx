import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaGoogle,
  FaApple,
  FaShieldAlt,
  FaRobot,
} from "react-icons/fa";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(false);

  const [emailHint, setEmailHint] = useState(false);
  const [lastLogin, setLastLogin] = useState(null);
  const isSecure = window.location.protocol === "https:";

  /* Detect system theme & check logged in user */
  useEffect(() => {
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(dark);

    const userData = localStorage.getItem("user");
    if (userData) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }

    const last = localStorage.getItem("lastLogin");
    if (last) setLastLogin(last);
  }, [navigate, location]);

  /* Email Hint */
  useEffect(() => {
    if (!email) return setEmailHint(false);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setEmailHint(storedUser?.email === email);
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (!email || !password) {
        setError("Please fill all fields");
        toast.error("Missing credentials");
        setLoading(false);
        return;
      }

      const userData = { email };
      login(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("lastLogin", new Date().toISOString());

      toast.success("Welcome back 👋");

      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });

      setLoading(false);
    }, 900);
  };

  const formatLastLogin = () => {
    if (!lastLogin) return null;
    const diff = Math.floor(
      (new Date() - new Date(lastLogin)) / (1000 * 60 * 60 * 24)
    );
    return diff === 0 ? "Today" : `${diff} day(s) ago`;
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-orange-400 via-orange-500 to-red-500"
      }`}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          x: error ? [-10, 10, -10, 10, 0] : 0,
        }}
        transition={{ duration: 0.6 }}
        className={`w-full max-w-sm p-8 rounded-2xl shadow-2xl backdrop-blur-xl ${
          isDark ? "bg-gray-900/80 text-white" : "bg-white/90 text-gray-800"
        }`}
      >
        {/* 🔥 AI Recommendation Banner */}
        <motion.div
          whileHover={{ scale: 1.05, y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mb-5 p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center gap-3 cursor-pointer shadow-lg"
          onClick={() => toast("AI recommendations coming soon 🤖")}
        >
          <FaRobot size={20} />
          <div className="text-sm">
            <p className="font-semibold">AI Recommendation</p>
            <p className="text-xs opacity-90">
              Smart food picks based on your taste
            </p>
          </div>
        </motion.div>
        {/* Logo */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-16 h-16 mx-auto rounded-full bg-orange-500 text-white flex items-center justify-center mb-3"
          >
            <FaSignInAlt size={26} />
          </motion.div>
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-sm opacity-70">Login to your account</p>

          {isSecure && (
            <div className="mt-2 flex justify-center items-center gap-1 text-xs text-green-500">
              <FaShieldAlt />
              Your connection is secure
            </div>
          )}

          {lastLogin && (
            <p className="text-xs opacity-60 mt-1">
              Last login: {formatLastLogin()}
            </p>
          )}
        </div>

        {/* Social Login */}
        <div className="flex gap-3 mb-5">
          <button
            type="button"
            onClick={() => toast("Google login coming soon 🚀")}
            className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FaGoogle /> Google
          </button>

          <button
            type="button"
            onClick={() => toast("Apple login coming soon 🍎")}
            className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FaApple /> Apple
          </button>
        </div>

        {/* Email */}
        <div className="relative mb-2">
          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
          <input
            type="email"
            placeholder="Email"
            className="w-full py-2.5 pl-10 pr-3 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none bg-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {emailHint && (
          <p className="text-xs text-green-500 mb-3">
            Looks like you already have an account 👋
          </p>
        )}

        {/* Password */}
        <div className="relative mb-4">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full py-2.5 pl-10 pr-10 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none bg-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Remember */}
        <div className="flex items-center justify-between mb-5 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            Remember me
          </label>
          <span className="text-orange-500 cursor-pointer hover:underline">
            Forgot?
          </span>
        </div>

        {/* Error */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm mb-3"
          >
            {error}
          </motion.p>
        )}

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className={`w-full py-2.5 rounded-lg font-semibold transition-all ${
            loading
              ? "bg-orange-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          } text-white`}
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>

        {/* Register */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/register")}
          className="w-full py-2.5 mt-4 rounded-lg font-semibold transition-all border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
        >
          Create an Account
        </motion.button>

        <p className="text-center text-xs opacity-60 mt-6">
          © {new Date().getFullYear()} Best Eats
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
