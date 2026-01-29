import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item) => {
  setFavorites((prev) => {
    const exists = prev.find((fav) => fav.id === item.id);

    if (exists) {

        return prev.filter((fav) => fav.id !== item.id);
    } else {
      toast.success("⭐ Added to favorites");
      return [...prev, item];
    }
  });
};

  const isFavorite = (id) => {
    return favorites.some(item => item.id === id);
  };



const clearFavorites = () => {
  setFavorites([]);
  toast("🧹 Favorites cleared", {
    icon: "🗑️",
  });
};



  return (
    <FavoritesContext.Provider
        value={{ favorites, toggleFavorite, isFavorite, clearFavorites }}

    >
      {children}
      
    </FavoritesContext.Provider>
    
  );
};

export const useFavorites = () => useContext(FavoritesContext);
