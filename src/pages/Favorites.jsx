import React, { useState, useEffect } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion"; 
import { Link } from "react-router-dom";
import { FaStar, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import HighlightText from "../components/HighlightText";

const DEFAULT_LISTS = ["All Favorites", "My Breakfast", "Healthy", "Weekend Treat"];

const Favorites = () => {
  const { favorites, clearFavorites, toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();

  /* =======================
     Collections Logic
  ======================= */
  const [lists, setLists] = useState(() =>
    JSON.parse(localStorage.getItem("favorites_lists")) || DEFAULT_LISTS
  );

  const [itemLists, setItemLists] = useState(() =>
    JSON.parse(localStorage.getItem("favorites_map")) || {}
  );

  const [activeList, setActiveList] = useState("All Favorites");
  const [showNewList, setShowNewList] = useState(false);
  const [newList, setNewList] = useState("");

  useEffect(() => {
    localStorage.setItem("favorites_lists", JSON.stringify(lists));
    localStorage.setItem("favorites_map", JSON.stringify(itemLists));
  }, [lists, itemLists]);

  const assignToList = (itemId, listName) => {
    setItemLists(prev => ({ ...prev, [itemId]: listName }));
    toast.success(`Added to "${listName}"`);
  };

  /* =======================
     Search
  ======================= */
  const [search, setSearch] = useState("");

  const filteredFavorites = favorites.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesList =
      activeList === "All Favorites" ||
      itemLists[item.id] === activeList;

    return matchesSearch && matchesList;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (favorites.length === 0) {
    return (
      <div className="text-center py-32 text-gray-500">
        You have no favorites yet. 💔
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">

      {/* ===== Header ===== */}
      <div className="flex flex-col gap-6 mb-10">

        <h1 className="text-4xl font-bold text-orange-600 flex items-center gap-2">
          ⭐ Your Favorites
        </h1>

        {/* ===== Collections Bar ===== */}
        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={activeList}
            onChange={(e) => setActiveList(e.target.value)}
            className="px-4 py-2 rounded-lg border shadow focus:ring-2 focus:ring-orange-500"
          >
            {lists.map((list, i) => (
              <option key={i}>{list}</option>
            ))}
          </select>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowNewList(!showNewList)}
            className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600"
            title="Create new list"
          >
            <FaPlus />
          </motion.button>

          <input
            type="text"
            placeholder="Search favorites..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-full px-4 py-2 shadow focus:ring-2 focus:ring-orange-500 outline-none w-full sm:w-64"
          />

          <button
            onClick={() => {
              clearFavorites();
              toast.success("All favorites cleared!");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow"
          >
            Clear all favorites
          </button>
        </div>

        {/* ===== New List Input ===== */}
        {showNewList && (
          <div className="flex gap-2 max-w-sm">
            <input
              type="text"
              placeholder="New list name"
              value={newList}
              onChange={(e) => setNewList(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2"
            />
            <button
              onClick={() => {
                if (!newList.trim()) return;
                setLists([...lists, newList]);
                setActiveList(newList);
                setNewList("");
                setShowNewList(false);
                toast.success("List created 🎉");
              }}
              className="bg-green-600 text-white px-4 rounded-lg hover:bg-green-700"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* ===== Empty Search ===== */}
      {filteredFavorites.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          😢 No items in this list
        </div>
      )}

      {/* ===== Products Grid ===== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFavorites.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden relative group"
          >
            {item.popular && (
              <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <FaStar /> Popular
              </span>
            )}

            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => {
                    addToCart(item);
                    toast.success(`${item.name} added to cart`);
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Add to Cart
                </button>

                <Link
                  to={`/food/${item.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  View Details
                </Link>

                {/* Assign to List */}
                <select
                  value={itemLists[item.id] || "All Favorites"}
                  onChange={(e) => assignToList(item.id, e.target.value)}
                  className="mt-2 px-3 py-1 rounded-lg text-sm"
                >
                  {lists.map((list, i) => (
                    <option key={i}>{list}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-4">
              <h2 className="font-bold mb-2">
                <HighlightText text={item.name} highlight={search} />
              </h2>

              <div className="flex justify-between items-center">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full">
                  {item.price}
                </span>

                <button
                  onClick={() => {
                    toggleFavorite(item);
                    toast(`❌ Removed from favorites`);
                  }}
                  className="text-red-500 text-xl"
                >
                  {isFavorite(item.id) ? "💖" : "🤍"}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
