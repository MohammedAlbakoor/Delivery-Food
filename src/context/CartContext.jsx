import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // 👈 مهم للـ MiniCart + Confetti
  const [lastAddedItem, setLastAddedItem] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ========================
  // ADD TO CART
  // ========================
  const addToCart = (item, qty = 1) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id);

      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + qty } : i
        );
      }

      return [...prev, { ...item, qty }];
    });

    // 👇 هذا يلي بيشغل الـ popup والـ confetti
    setLastAddedItem({ ...item, qty });
  };

  // ========================
  // REMOVE
  // ========================
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  // ========================
  // INCREASE
  // ========================
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: i.qty + 1 } : i
      )
    );

    const item = cart.find((i) => i.id === id);
    if (item) setLastAddedItem({ ...item, qty: item.qty + 1 });
  };

  // ========================
  // DECREASE
  // ========================
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, qty: Math.max(1, i.qty - 1) }
          : i
      )
    );
  };

  // ========================
  // TOTAL
  // ========================
  const getTotal = () =>
    cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        getTotal,
        lastAddedItem, // 👈 الاسم الصحيح
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
