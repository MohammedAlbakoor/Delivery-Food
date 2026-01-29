import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { data } from "../data/data";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaWhatsapp, FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";

const FoodDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showWhatsAppConfirm, setShowWhatsAppConfirm] = useState(false);

  // ===== كمية المنتج =====
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [id]);

  const food = data.find((item) => item.id === parseInt(id));
  const similarFoods = data.filter(
    (item) => item.category === food?.category && item.id !== food?.id
  );

  if (!food) return <div className="p-10 text-center">Food not found</div>;

  const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(
    `Hi! I want to order:\n${food.name}\nPrice: ${food.price}\nQuantity: ${qty}`
  )}`;

  const handleAddToCart = () => {
    addToCart({ ...food, qty });
    toast.success(`${food.name} (x${qty}) added to cart!`);
  };

  return (
    <div className={`${isMobile ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen`}>
      {loading ? (
        <div className="max-w-[1000px] mx-auto p-4 mt-12 animate-pulse">
          <div className="h-80 bg-gray-300 rounded-xl mb-6"></div>
          <div className="h-8 bg-gray-300 w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-300 w-full mb-2"></div>
          <div className="h-4 bg-gray-300 w-3/4"></div>
        </div>
      ) : (
        <div className="max-w-[1000px] mx-auto p-4 mt-12">
          <button onClick={() => navigate(-1)} className="mb-4 text-blue-500 hover:underline">
            &larr; Back
          </button>

          <div className="transition-transform duration-300 border rounded-2xl shadow-2xl overflow-hidden">
            <div className="relative">
              <img src={food.image} alt={food.name} className="w-full h-80 object-cover" />
              <span className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full font-bold">
                {food.price}
              </span>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-4xl font-bold">{food.name}</h2>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < 4 ? "text-yellow-400" : "text-gray-400"} />
                  ))}
                </div>
              </div>

              <p className="text-gray-400 mb-6">
                {food.description || "Delicious, fresh and made with love."}
              </p>

              {/* ===== Quantity Selector ===== */}
              <div className="flex items-center gap-4 mb-4">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQty((prev) => Math.max(prev - 1, 1))}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{qty}</span>
                  <button
                    onClick={() => setQty((prev) => prev + 1)}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4 flex-wrap">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-700"
                >
                  <FaShoppingCart /> Add to Cart
                </motion.button>

                <button
                  onClick={() => setShowWhatsAppConfirm(true)}
                  className="bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-800"
                >
                  <FaWhatsapp /> Order via WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Similar Foods */}
          {similarFoods.length > 0 && (
            <div className="mt-14">
              <h3 className="text-2xl font-bold mb-6">Similar Foods</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {similarFoods.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border rounded-lg overflow-hidden shadow"
                  >
                    <img src={item.image} className="h-36 w-full object-cover" alt={item.name} />
                    <div className="p-3">
                      <p className="font-bold">{item.name}</p>
                      <p className="text-orange-500">{item.price}</p>
                      <Link
                        to={`/food/${item.id}`}
                        onClick={() => window.scrollTo({ top: 0 })}
                        className="block text-center bg-blue-500 text-white mt-2 py-1 rounded hover:bg-blue-600"
                      >
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mobile Sticky Add to Cart */}
      {isMobile && !loading && (
        <div className="fixed bottom-0 left-0 right-0 bg-black p-3 flex justify-between items-center z-50">
          <span className="font-bold">{food.price}</span>
          <button onClick={handleAddToCart} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
            Add to Cart ({qty})
          </button>
        </div>
      )}

      {/* WhatsApp Confirm */}
      <AnimatePresence>
        {showWhatsAppConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: 40, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              exit={{ y: 40, scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl"
            >
              <div className="mx-auto mb-4 w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <FaWhatsapp size={28} />
              </div>

              <h3 className="text-xl font-bold mb-3">Confirm Order</h3>
              <p className="mb-6 text-gray-600">
                Proceed ordering <b>{food.name}</b> (x{qty}) via WhatsApp?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowWhatsAppConfirm(false)}
                  className="flex-1 bg-red-500 hover:bg-red-600 py-2 rounded-lg text-white"
                >
                  Cancel
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
                >
                  Confirm
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FoodDetails;
