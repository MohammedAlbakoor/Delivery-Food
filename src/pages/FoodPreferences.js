import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUtensils, FaLeaf, FaBan, FaHeart, FaSave } from "react-icons/fa";
import toast from "react-hot-toast";

const FoodPreferences = () => {
  const [preferences, setPreferences] = useState({
    diet: "none",
    allergies: [],
    disliked: [],
    spice: "medium",
    cuisinePreferences: []
  });

  const diets = [
    { id: "none", label: "No Restrictions", icon: "🍽️" },
    { id: "vegetarian", label: "Vegetarian", icon: "🥗" },
    { id: "vegan", label: "Vegan", icon: "🥕" },
    { id: "keto", label: "Keto", icon: "🥑" },
    { id: "paleo", label: "Paleo", icon: "🍖" },
    { id: "halal", label: "Halal", icon: "🕌" }
  ];

  const allergies = [
    "Gluten", "Dairy", "Nuts", "Peanuts", "Soy", "Eggs", "Fish", "Shellfish", "Sesame"
  ];

  const dislikedFoods = [
    "Mushrooms", "Olives", "Onions", "Bell Peppers", "Cilantro", "Tomatoes", "Pickles"
  ];

  const spiceLevels = [
    { id: "mild", label: "Mild", icon: "🌶️" },
    { id: "medium", label: "Medium", icon: "🌶️🌶️" },
    { id: "hot", label: "Hot", icon: "🌶️🌶️🌶️" },
    { id: "extra-hot", label: "Extra Hot", icon: "🔥" }
  ];

  const cuisines = [
    "Italian", "Chinese", "Japanese", "Indian", "Mexican", "Arabic", "American", "Thai", "Mediterranean"
  ];

  const handleAllergyToggle = (allergy) => {
    setPreferences(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter(a => a !== allergy)
        : [...prev.allergies, allergy]
    }));
  };

  const handleDislikeToggle = (food) => {
    setPreferences(prev => ({
      ...prev,
      disliked: prev.disliked.includes(food)
        ? prev.disliked.filter(f => f !== food)
        : [...prev.disliked, food]
    }));
  };

  const handleCuisineToggle = (cuisine) => {
    setPreferences(prev => ({
      ...prev,
      cuisinePreferences: prev.cuisinePreferences.includes(cuisine)
        ? prev.cuisinePreferences.filter(c => c !== cuisine)
        : [...prev.cuisinePreferences, cuisine]
    }));
  };

  const handleSave = () => {
    localStorage.setItem("food_preferences", JSON.stringify(preferences));
    toast.success("Preferences saved! 🎉");
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("food_preferences"));
    if (saved) {
      setPreferences(saved);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
            <FaUtensils size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Food Preferences</h1>
          <p className="text-gray-600">Customize your food experience</p>
        </motion.div>

        <div className="space-y-8">
          {/* Diet Type */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaLeaf className="text-green-500" />
              Diet Type
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {diets.map((diet) => (
                <button
                  key={diet.id}
                  onClick={() => setPreferences({ ...preferences, diet: diet.id })}
                  className={`p-4 rounded-xl border-2 transition flex items-center gap-3 ${
                    preferences.diet === diet.id
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <span className="text-2xl">{diet.icon}</span>
                  <span className="font-semibold">{diet.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Allergies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaBan className="text-red-500" />
              Allergies
            </h2>

            <div className="flex flex-wrap gap-2">
              {allergies.map((allergy) => (
                <button
                  key={allergy}
                  onClick={() => handleAllergyToggle(allergy)}
                  className={`px-4 py-2 rounded-full transition ${
                    preferences.allergies.includes(allergy)
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 hover:bg-red-50"
                  }`}
                >
                  {preferences.allergies.includes(allergy) && <FaBan className="mr-1" />}
                  {allergy}
                </button>
              ))}
            </div>

            {preferences.allergies.length > 0 && (
              <p className="mt-4 text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                ⚠️ We'll highlight dishes containing these ingredients
              </p>
            )}
          </motion.div>

          {/* Disliked Foods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaHeart className="text-pink-500" />
              Disliked Foods
            </h2>

            <div className="flex flex-wrap gap-2">
              {dislikedFoods.map((food) => (
                <button
                  key={food}
                  onClick={() => handleDislikeToggle(food)}
                  className={`px-4 py-2 rounded-full transition ${
                    preferences.disliked.includes(food)
                      ? "bg-pink-500 text-white"
                      : "bg-gray-100 hover:bg-pink-50"
                  }`}
                >
                  {preferences.disliked.includes(food) ? "❌" : "🍽️"} {food}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Spice Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaUtensils className="text-orange-500" />
              Spice Level Preference
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {spiceLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setPreferences({ ...preferences, spice: level.id })}
                  className={`p-4 rounded-xl border-2 transition flex items-center gap-2 ${
                    preferences.spice === level.id
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <span className="text-xl">{level.icon}</span>
                  <span className="font-semibold">{level.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Cuisine Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaHeart className="text-red-500" />
              Favorite Cuisines
            </h2>

            <div className="flex flex-wrap gap-2">
              {cuisines.map((cuisine) => (
                <button
                  key={cuisine}
                  onClick={() => handleCuisineToggle(cuisine)}
                  className={`px-4 py-2 rounded-full transition ${
                    preferences.cuisinePreferences.includes(cuisine)
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 hover:bg-orange-50"
                  }`}
                >
                  {preferences.cuisinePreferences.includes(cuisine) && <FaHeart className="mr-1" />}
                  {cuisine}
                </button>
              ))}
            </div>

            {preferences.cuisinePreferences.length > 0 && (
              <p className="mt-4 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                ✓ We'll show more {preferences.cuisinePreferences.join(", ")} dishes in your feed
              </p>
            )}
          </motion.div>
        </div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-12 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition flex items-center gap-2 mx-auto"
          >
            <FaSave />
            Save Preferences
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FoodPreferences;