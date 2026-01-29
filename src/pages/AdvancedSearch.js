import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes, FaStar, FaFilter } from "react-icons/fa";
import { data } from "../data/data";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const AdvancedSearch = () => {
  const { addToCart } = useCart();
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState([]);

  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [],
    rating: 0,
    deliveryTime: 0,
    dietary: [],
    sortBy: "relevance"
  });

  const categories = ["burger", "pizza", "salad", "chicken"];
//   const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Halal", "Keto"];
  const priceRanges = [
    { id: "$", label: "Under $10", min: 0, max: 10 },
    { id: "$$", label: "$10 - $20", min: 10, max: 20 },
    { id: "$$$", label: "$20 - $30", min: 20, max: 30 },
    { id: "$$$$", label: "$30+", min: 30, max: Infinity }
  ];

  useEffect(() => {
    let filtered = data;

    // Text search
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(item => filters.categories.includes(item.category));
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(item => (item.rating || 4.5) >= filters.rating);
    }

    // Sort
    if (filters.sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.priceValue - b.priceValue);
    } else if (filters.sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.priceValue - a.priceValue);
    } else if (filters.sortBy === "rating") {
      filtered = [...filtered].sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5));
    }

    setResults(filtered);
  }, [query, filters]);

  const handleCategoryToggle = (category) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handlePriceToggle = (range) => {
    setFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange.includes(range.id)
        ? prev.priceRange.filter(r => r !== range.id)
        : [...prev.priceRange, range.id]
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [],
      rating: 0,
      deliveryTime: 0,
      dietary: [],
      sortBy: "relevance"
    });
  };

  const activeFiltersCount = 
    filters.categories.length + 
    filters.priceRange.length + 
    filters.dietary.length + 
    (filters.rating > 0 ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for food, restaurants, cuisines..."
                className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-xl text-gray-800 focus:ring-2 focus:ring-orange-200 outline-none"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-4 rounded-xl font-medium transition flex items-center gap-2 ${
                showFilters ? "bg-orange-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <FaFilter />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-gray-100 pt-4"
              >
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        className={`px-4 py-2 rounded-lg transition capitalize ${
                          filters.categories.includes(category)
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 hover:bg-orange-50"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.id}
                        onClick={() => handlePriceToggle(range.id)}
                        className={`px-4 py-2 rounded-lg transition ${
                          filters.priceRange.includes(range.id)
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 hover:bg-orange-50"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Minimum Rating</h3>
                  <div className="flex gap-2">
                    {[4, 4.5, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFilters({ ...filters, rating: filters.rating === rating ? 0 : rating })}
                        className={`px-4 py-2 rounded-lg transition flex items-center gap-1 ${
                          filters.rating === rating
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 hover:bg-orange-50"
                        }`}
                      >
                        <FaStar />
                        {rating}+
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Sort By</h3>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="px-4 py-2 bg-gray-100 rounded-lg outline-none"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                {/* Clear Filters */}
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-red-500 hover:text-red-600 flex items-center gap-2"
                  >
                    <FaTimes />
                    Clear all filters
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              {results.length} {results.length === 1 ? "result" : "results"} found
            </p>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-16">
              <FaSearch size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-orange-600 font-bold">{item.price}</span>
                      <button
                        onClick={() => {
                          addToCart(item);
                          toast.success(`${item.name} added to cart!`);
                        }}
                        className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-orange-600 transition"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;