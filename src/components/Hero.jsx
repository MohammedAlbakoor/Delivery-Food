import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WelcomeMessage from "./WelcomeMessage";
import { FaMagic } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Hero = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const navigate = useNavigate();

  /* ================= Scroll Parallax ================= */
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= Keyboard Shortcuts ================= */
  useEffect(() => {
    const handleKey = (e) => {
      // Ignore typing inside inputs
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;

      if (e.key === "/") {
        e.preventDefault();
        window.location.hash = "menu";
        window.dispatchEvent(new Event("open-search"));
      }

      if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        window.location.href = "/favorites";
      }

      if (e.key.toLowerCase() === "c") {
        e.preventDefault();
        window.location.href = "/cart";
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleSearchClick = () => {
    window.location.hash = "menu";
    window.dispatchEvent(new Event("open-search"));
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/1234567890?text=Hello%20Best%20Eats!", "_blank");
  };

  /* ================= User ================= */
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.email?.split("@")[0] || "Guest";

  /* ================= AI Recommendation ================= */
  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 12) {
      setAiSuggestion("🥐 Croissant & Coffee for a fresh morning");
    } else if (hour >= 12 && hour < 17) {
      setAiSuggestion("🍔 Classic Burger for lunch time");
    } else if (hour >= 17 && hour < 21) {
      setAiSuggestion("🍕 Cheesy Pizza for dinner vibes");
    } else {
      setAiSuggestion("🌙 Light Snacks for a late night");
    }
  }, []);

  return (
    <div className="max-w-[1640px] mx-auto p-4">
      <div className="relative max-h-[520px] rounded-xl overflow-hidden shadow-lg">
        {/* Background */}
        <img
          style={{ transform: `translateY(${offsetY * 0.3}px)` }}
          className="w-full max-h-[520px] object-cover transition-transform duration-300"
          src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg"
          alt="Food"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/70 flex flex-col justify-center px-6 md:px-12 lg:px-24">
          

          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4"
          >
            <WelcomeMessage name={userName} />
          </motion.div>

          {/* 🤖 AI Banner – Hover Animation Added */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 25px rgba(255,165,0,0.6)",
            }}
            onClick={() => toast("AI recommendations coming soon 🤖")}
            className="mb-6 w-fit flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/20 cursor-pointer"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FaMagic className="text-orange-400" />
            </motion.div>
            <span className="text-sm md:text-base">
              AI suggests: <strong>{aiSuggestion}</strong>
            </span>
          </motion.div>

          {/* Titles */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white"
          >
            The <span className="text-orange-500">Best</span>
          </motion.h1>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-2"
          >
            <span className="text-orange-500">Foods</span> Delivered
          </motion.h1>

          {/* Order Now Button */}
          <motion.button
            onClick={handleWhatsAppClick}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.7,
              type: "spring",
              stiffness: 120,
            }}
            whileHover={{ scale: 1.1 }}
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg w-max"
          >
            Order Now
          </motion.button>

          {/* ⌨️ Shortcut Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6 flex flex-wrap items-center gap-6 text-white/80 text-sm"
          >
            {/* Search */}
            <div
              onClick={handleSearchClick}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="border border-white/30 rounded px-2 py-1 font-mono bg-white/10">
                /
              </span>
              <span>Search</span>
            </div>
            {/* Cart */}
            <div
              onClick={() => navigate("/card")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="border border-white/30 rounded px-2 py-1 font-mono bg-white/10">
                O
              </span>
              <span>Orders</span>
            </div>
            {/* Favorites */}
            <div
              onClick={() => navigate("/favorites")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="border border-white/30 rounded px-2 py-1 font-mono bg-white/10">
                F
              </span>
              <span>Favorites</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
