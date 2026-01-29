import React, { useState, useRef, useEffect } from "react";
import { data } from "../data/data.js";
import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { useDebounce } from "../hooks/useDebounce";
import HighlightText from "./HighlightText";
import { useFavorites } from "../context/FavoritesContext";
import toast from "react-hot-toast";


const Food = () => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [foods, setFoods] = useState(data);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const searchRef = useRef(null);

  /* ===============================
     🔥 Listen from Hero (/ Search)
  =============================== */
  useEffect(() => {
    const focusSearch = () => {
      searchRef.current?.focus();
      searchRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    };

    window.addEventListener("open-search", focusSearch);
    return () => window.removeEventListener("open-search", focusSearch);
  }, []);

  /* ===============================
     ===== Filters =====
  =============================== */
  const filterType = (category) => {
    if (category === "All") {
      setFoods(data);
    } else {
      setFoods(data.filter((item) => item.category === category));
    }
  };

  const filterPrice = (price) => {
    setFoods(data.filter((item) => item.price === price));
  };

  /* ===============================
     ===== Filtered Foods =====
  =============================== */
  const filteredFoods = foods.filter((item) =>
    item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div
      id="menu"
      className="max-w-[1640px] m-auto px-4 py-12 scroll-mt-24"
    >
      
      <h1 className="text-orange-600 font-bold text-4xl text-center mb-8">
        Top Rated Menu Items
      </h1>

      {/* 🔍 Search */}
      <div className="max-w-md mx-auto mb-8">
        <input
          ref={searchRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search food..."
          className="w-full border rounded-full px-4 py-2 shadow focus:ring-2 focus:ring-orange-500 outline-none"
        />
      </div>

      {/* ===== Filters ===== */}
      <div className="flex flex-col lg:flex-row justify-between mb-8 gap-6">
        {/* Filter Type */}
        <div>
          <p className="font-bold text-gray-700 mb-2">Filter Type</p>
          <div className="flex flex-wrap gap-2">
            {["All", "burger", "pizza", "salad", "chicken"].map((type) => (
              <button
                key={type}
                onClick={() => filterType(type)}
                className="px-4 py-2 border border-orange-600 text-orange-600 rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300"
              >
                {type === "All"
                  ? "All"
                  : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Price */}
        <div>
          <p className="font-bold text-gray-700 mb-2">Filter Price</p>
          <div className="flex gap-2">
            {["$", "$$", "$$$", "$$$$"].map((price) => (
              <button
                key={price}
                onClick={() => filterPrice(price)}
                className="px-4 py-2 border border-orange-600 text-orange-600 rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300"
              >
                {price}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ❌ No Result */}
      {filteredFoods.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          😢 No food matches your search
        </div>
      )}

      {/* ===== Display Foods ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredFoods.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-all relative"
          >
            {/* Badges */}
            {item.popular && (
              <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10">
                <FaStar /> Popular
              </span>
            )}
            {item.new && (
              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                New
              </span>
            )}

            {/* Image & Overlay */}
            <div className="relative group">
              {/* Favorite */}
              <motion.button
                whileTap={{ scale: 0.8, rotate: -10 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => toggleFavorite(item)}
                className="absolute top-2 right-2 z-10 bg-white p-2 rounded-full shadow"
              >
                {isFavorite(item.id) ? (
                  <FaHeart className="text-xl text-red-500" />
                ) : (
                  <FaRegHeart className="text-xl text-gray-300" />
                )}
              </motion.button>

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    addToCart(item);
                    toast.success(`${item.name} added to cart!`);
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 shadow-lg transition-all duration-300 font-semibold"
                >
                  Add to Cart
                </motion.button>

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={`/food/${item.id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow-lg transition-all duration-300 font-semibold"
                  >
                    View
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Info */}
            <div className="p-4 flex justify-between items-center">
              <h2 className="font-bold">
                <HighlightText
                  text={item.name}
                  highlight={debouncedSearch}
                />
              </h2>
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full">
                {item.price}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Food;
