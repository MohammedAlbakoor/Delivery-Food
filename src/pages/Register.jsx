import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus,
} from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(dark);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success("Account created successfully 🎉");
      navigate("/login"); // 👈 بعد التسجيل يوديه على تسجيل الدخول
    }, 1000);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 to-black"
          : "bg-gradient-to-br from-orange-400 to-red-500"
      }`}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-sm p-8 rounded-2xl shadow-2xl backdrop-blur ${
          isDark ? "bg-gray-900/80 text-white" : "bg-white/90 text-gray-800"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto bg-orange-500 text-white rounded-full flex items-center justify-center mb-3">
            <FaUserPlus size={24} />
          </div>
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-sm opacity-70">Join Best Eats today</p>
        </div>

        {/* Name */}
        <div className="relative mb-4">
          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
          <input
            type="text"
            placeholder="Full Name"
            className="w-full pl-10 py-2.5 rounded-lg border bg-transparent focus:ring-2 focus:ring-orange-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 py-2.5 rounded-lg border bg-transparent focus:ring-2 focus:ring-orange-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 py-2.5 rounded-lg border bg-transparent focus:ring-2 focus:ring-orange-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg font-semibold"
        >
          {loading ? "Creating..." : "Register"}
        </motion.button>

        {/* Login Link */}
        <p className="text-center text-sm mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-semibold">
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Register;
