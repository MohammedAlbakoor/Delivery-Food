import { useState } from "react";
import { motion, AnimatePresence  } from "framer-motion";
import { FaStar, FaClock, FaMapMarkerAlt, FaMotorcycle, FaFilter, FaSearch, FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";
// import toast from "react-hot-toast";

const Restaurants = () => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const filters = [
    { id: "all", label: "All" },
    { id: "fast-food", label: "Fast Food" },
    { id: "pizza", label: "Pizza" },
    { id: "healthy", label: "Healthy" },
    { id: "desserts", label: "Desserts" },
    { id: "asian", label: "Asian" },
    { id: "arabic", label: "Arabic" },
    { id: "mexican", label: "Mexican" }
  ];

  const restaurants = [
    {
      id: 1,
      name: "Burger Palace",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800",
      rating: 4.8,
      reviews: 2340,
      deliveryTime: "25-35",
      deliveryFee: 2.99,
      minOrder: 15,
      category: "fast-food",
      cuisine: ["Burgers", "American", "Fast Food"],
      featured: true,
      isOpen: true
    },
    {
      id: 2,
      name: "Pizza Heaven",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
      rating: 4.6,
      reviews: 1890,
      deliveryTime: "30-45",
      deliveryFee: 1.99,
      minOrder: 20,
      category: "pizza",
      cuisine: ["Pizza", "Italian"],
      featured: true,
      isOpen: true
    },
    {
      id: 3,
      name: "Green Bowl",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
      rating: 4.9,
      reviews: 1567,
      deliveryTime: "20-30",
      deliveryFee: 0,
      minOrder: 12,
      category: "healthy",
      cuisine: ["Salads", "Healthy", "Vegan"],
      featured: false,
      isOpen: true
    },
    {
      id: 4,
      name: "Sushi Master",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
      rating: 4.7,
      reviews: 2100,
      deliveryTime: "35-50",
      deliveryFee: 3.99,
      minOrder: 25,
      category: "asian",
      cuisine: ["Sushi", "Japanese", "Asian"],
      featured: true,
      isOpen: false
    },
    {
      id: 5,
      name: "Sweet Dreams",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800",
      rating: 4.5,
      reviews: 987,
      deliveryTime: "20-35",
      deliveryFee: 1.99,
      minOrder: 10,
      category: "desserts",
      cuisine: ["Desserts", "Cakes", "Pastries"],
      featured: false,
      isOpen: true
    },
    {
      id: 6,
      name: "Shawarma Express",
      image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800",
      rating: 4.4,
      reviews: 3456,
      deliveryTime: "25-40",
      deliveryFee: 1.49,
      minOrder: 8,
      category: "arabic",
      cuisine: ["Shawarma", "Arabic", "Middle Eastern"],
      featured: true,
      isOpen: true
    }
  ];

  const filteredRestaurants = restaurants
    .filter(r => {
      const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
                          r.cuisine.some(c => c.toLowerCase().includes(search.toLowerCase()));
      const matchesFilter = activeFilter === "all" || r.category === activeFilter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviews - a.reviews;
      if (sortBy === "delivery") return a.deliveryTime.localeCompare(b.deliveryTime);
      if (sortBy === "fee") return a.deliveryFee - b.deliveryFee;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Explore Restaurants
          </h1>
          <p className="text-white/90 text-center text-lg mb-8">
            Discover the best food in your area
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search restaurants or cuisines..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-800 shadow-lg focus:ring-4 focus:ring-orange-200 outline-none"
              />
            </div>
          </div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters & Sort */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <FaFilter />
              Filters
            </motion.button>

            <AnimatePresence>
              {filterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-4 py-2 rounded-lg transition ${
                        activeFilter === filter.id
                          ? "bg-orange-500 text-white"
                          : "bg-white hover:bg-orange-50"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white rounded-xl shadow outline-none"
            >
              <option value="rating">Rating</option>
              <option value="reviews">Reviews</option>
              <option value="delivery">Delivery Time</option>
              <option value="fee">Delivery Fee</option>
            </select>
          </div>
        </div>

        {/* Featured Section */}
        {activeFilter === "all" && !search && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Restaurants</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {restaurants.filter(r => r.featured).slice(0, 4).map((restaurant, index) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} isFavorite={isFavorite(restaurant.id)} toggleFavorite={() => toggleFavorite(restaurant)} />
              ))}
            </div>
          </motion.div>
        )}

        {/* All Restaurants */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <RestaurantCard 
                restaurant={restaurant} 
                isFavorite={isFavorite(restaurant.id)} 
                toggleFavorite={() => toggleFavorite(restaurant)} 
              />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-16">
            <FaSearch size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No restaurants found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Restaurant Card Component
const RestaurantCard = ({ restaurant, isFavorite, toggleFavorite }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
  >
    <div className="relative">
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="w-full h-48 object-cover"
      />
      {!restaurant.isOpen && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">Closed</span>
        </div>
      )}
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={toggleFavorite}
        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
      >
        {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-300" />}
      </motion.button>
    </div>

    <div className="p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{restaurant.name}</h3>
          <p className="text-gray-500 text-sm">{restaurant.cuisine.join(" • ")}</p>
        </div>
        <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-lg">
          <FaStar className="text-sm" />
          <span className="font-bold">{restaurant.rating}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-1">
          <FaClock />
          {restaurant.deliveryTime} min
        </span>
        <span className="flex items-center gap-1">
          <FaMotorcycle />
          ${restaurant.deliveryFee}
        </span>
        <span className="flex items-center gap-1">
          <FaMapMarkerAlt />
          Min ${restaurant.minOrder}
        </span>
      </div>

      <button
        disabled={!restaurant.isOpen}
        className={`w-full py-3 rounded-xl font-semibold transition ${
          restaurant.isOpen
            ? "bg-orange-500 text-white hover:bg-orange-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {restaurant.isOpen ? "Order Now" : "Currently Closed"}
      </button>
    </div>
  </motion.div>
);

export default Restaurants;