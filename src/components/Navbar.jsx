import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose, /*AiFillTag*/ } from "react-icons/ai";
import { BsFillCartFill, BsFillSaveFill } from "react-icons/bs";
import {
  FaWallet,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaEnvelope,
  FaInfoCircle,
  FaTags,
  FaMapMarkedAlt,
  FaStar,
  FaQrcode,
  FaBell,
  FaSlidersH,
  FaTachometerAlt,
  FaSearch,
  FaHeadset,
  FaUtensils
} from "react-icons/fa";
import { MdFavorite, MdHelp, MdLogin } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [nav, setNav] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const openHour = 10;
  const closeHour = 23;
  // const helpWhatsApp = () => {
  //   window.open(
  //     "https://wa.me/1234567890?text=Hi! I need help with Best Eats 🍔",
  //     "_blank"
  //   );
  // };
  // const inviteFriends = () => {
  //   window.open(
  //     "https://wa.me/?text=🍔 Check out Best Eats! Amazing food & offers 😍",
  //     "_blank"
  //   );
  // };
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      setIsOpen(hour >= openHour && hour < closeHour);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  const scrollToSection = (id) => {
    setNav(false); 

    const scroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 300); // وقت بسيط ليفتح الصفحة
    } else {
      scroll();
    }
  };

  const handleLogout = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p>Are you sure you want to logout?</p>
          <div className="flex justify-end gap-2">
            <button
              className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => {
                logout();
                toast.success("Logged out successfully 👋");
                toast.dismiss(t.id);
              }}
            >
              Logout
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4 shadow-md bg-white sticky top-0 z-20">
      {/* Left side */}
      <div className="flex items-center">
        <div onClick={() => setNav(!nav)} className="cursor-pointer mr-2">
          <AiOutlineMenu size={30} />
        </div>

        <Link to="/">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2 cursor-pointer">
            Best <span className="font-bold text-orange-600">Eats</span>
          </h1>
        </Link>
      </div>
      {/* Center Status - High Aesthetic */}
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex flex-1 justify-center items-center gap-2 text-sm font-semibold"
      >
        <span
          className={`animate-pulse ${
            isOpen ? "text-green-400" : "text-red-400"
          } text-2xl`}
        >
          ●
        </span>
        <span
          className={`tracking-wide font-semibold transition-colors duration-1000 ${
            isOpen
              ? "text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.7)]"
              : "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]"
          }`}
        >
          {isOpen ? "Open Now" : "Closed"}
        </span>
        <span className="text-gray-400">•</span>
        <span className="tracking-wide text-gray-500">10:00 AM – 11:00 PM</span>
      </motion.div>

      {/* Right buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/card")} // إضافة التوجيه لصفحة السلة
          className="bg-black text-white hidden md:flex items-center py-2 px-4 rounded-full hover:bg-gray-800 transition-all duration-300 relative"
        >
          <BsFillCartFill size={20} className="mr-2" /> Orders
          {/* عدد المنتجات */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cart.length}
          </span>
        </button>

        {/* Login / Username */}
        {!user ? (
          <Link to="/login">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-300">
              Login
            </button>
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">
              Hi, {user.name || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {nav && (
        <div
          onClick={() => setNav(false)}
          className="fixed inset-0 z-10 backdrop-blur-sm bg-black/30 transition-all duration-300"
        />
      )}

      {/* Mobile Side drawer menu */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: nav ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="fixed top-0 left-0 w-[300px] h-screen bg-white z-20 shadow-lg"
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute right-4 top-4 cursor-pointer text-gray-700"
        />
        <nav className="flex flex-col p-4 text-gray-800 mt-12 space-y-4 h-full overflow-y-auto overscroll-contain">
          <li
            onClick={() => scrollToSection("home")}
            className={`text-xl py-2 flex items-center cursor-pointer transition-all duration-300 ${
              active === "home"
                ? "text-orange-600 font-bold"
                : "hover:text-orange-600"
            }`}
          >
            <MdFavorite size={25} className="mr-4" /> Home
          </li>

          <li
            onClick={() => scrollToSection("menu")}
            className={`text-xl py-2 flex items-center cursor-pointer transition-all duration-300 ${
              active === "menu"
                ? "text-orange-600 font-bold"
                : "hover:text-orange-600"
            }`}
          >
            <FaWallet size={25} className="mr-4" /> Menu Items
          </li>

          <li
            onClick={() => scrollToSection("categories")}
            className={`text-xl py-2 flex items-center cursor-pointer transition-all duration-300 ${
              active === "categories"
                ? "text-orange-600 font-bold"
                : "hover:text-orange-600"
            }`}
          >
            <MdHelp size={25} className="mr-4" /> Categories
          </li>

          <li
            onClick={() => scrollToSection("best")}
            className={`text-xl py-2 flex items-center cursor-pointer transition-all duration-300 ${
              active === "best"
                ? "text-orange-600 font-bold"
                : "hover:text-orange-600"
            }`}
          >
            <BsFillSaveFill size={25} className="mr-4" /> Best Deals
          </li>

          <Link to="/favorites" className="w-full">
            <li
              onClick={() => scrollToSection("best")}
              className="text-xl py-2 flex items-center hover:text-orange-600 cursor-pointer transition-all duration-300"
            >
              <MdHelp size={25} className="mr-4" /> Favorites
            </li>
          </Link>
          <Link to="/profile" className="w-full">
            <li
              onClick={() => scrollToSection("profile")}
              className="text-xl py-2 flex items-center hover:text-orange-600 cursor-pointer"
            >
              <MdHelp size={25} className="mr-4" /> Profile
            </li>
          </Link>

          <Link to="/orders" className="w-full">
            <li
              onClick={() => scrollToSection("best")}
              className="text-xl py-2 flex items-center hover:text-orange-600 cursor-pointer"
            >
              <FaShoppingBag size={25} className="mr-4" /> My Orders
            </li>
          </Link>
          
          <Link to="/restaurants" className="w-full">
            <li
              onClick={() => scrollToSection("restaurants")}
              className="text-xl py-2 flex items-center hover:text-orange-600 cursor-pointer"
            >
              <FaUtensils size={25} className="mr-4" /> Restaurants
            </li>
          </Link>

        

          <Link to="/notifications" className="w-full">
            <li
              onClick={() => scrollToSection("notifications")}
              className="text-xl py-2 flex items-center hover:text-orange-600 cursor-pointer"
            >
              <FaBell size={25} className="mr-4" /> Notifications
            </li>
          </Link>

          <Link to="/preferences" className="w-full">
            <li
              onClick={() => scrollToSection("preferences")}
              className="text-xl py-2 flex items-center hover:text-orange-600 cursor-pointer"
            >
              <FaSlidersH size={25} className="mr-4" /> Preferences
            </li>
          </Link>

          
          <Link to="/search" className="w-full">
            <li
              onClick={() => scrollToSection("search")}
              className="text-xl py-2 flex items-center hover:text-orange-600 cursor-pointer"
            >
              <FaSearch size={25} className="mr-4" /> Search
            </li>
          </Link>

          
          <Link to="/support" className="w-full">
            <li
              onClick={() => scrollToSection("support")}
              className="text-xl py-2 flex items-center hover:text-orange-600 cursor-pointer"
            >
              <FaHeadset size={25} className="mr-4" /> Support
            </li>
          </Link>

          <Link to="/faq" className="w-full">
            <li
              onClick={() => scrollToSection("best")}
              className="text-xl py-2 flex items-center hover:text-orange-600 cursor-pointer"
            >
              <FaQuestionCircle size={25} className="mr-4" /> FAQ
            </li>
          </Link>

          <Link to="/contact" className="w-full">
            <li
              onClick={() => scrollToSection("best")}
              className="text-xl py-2 flex items-center hover:text-orange-600 cursor-pointer"
            >
              <FaEnvelope size={25} className="mr-4" /> Contact Us
            </li>
          </Link>

          <Link to="/about" className="w-full">
            <li
              onClick={() => scrollToSection("best")}
              className="text-xl py-2 flex items-center hover:text-orange-600 cursor-pointer"
            >
              <FaInfoCircle size={25} className="mr-4" /> About Us
            </li>
          </Link>

          {/* <li
            onClick={inviteFriends}
            className="text-xl py-2 flex items-center hover:text-orange-600 cursor-pointer transition-all duration-300"
          >
            <FaUserFriends size={25} className="mr-4" /> Invite Friends
          </li>
          <li
            onClick={helpWhatsApp}
            className="text-xl py-2 flex items-center hover:text-orange-600 cursor-pointer transition-all duration-300"
          >
            <AiFillTag size={25} className="mr-4" /> Help
          </li> */}

          {!user ? (
            <li
              onClick={() => {
                setNav(false);
                navigate("/login");
              }}
              className="text-xl py-2 flex items-center hover:text-orange-600 cursor-pointer"
            >
              <MdLogin size={25} className="mr-4" /> Login
            </li>
          ) : (
            <li className="pt-4 flex">
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 mb-12 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </li>
          )}
        </nav>
      </motion.div>
    </div>
  );
};

export default Navbar;
