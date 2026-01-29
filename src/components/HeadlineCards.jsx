import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const HeadlineCards = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  /* ===== Working Hours Logic ===== */
  const openHour = 10; // 10 AM
  const closeHour = 23; // 11 PM
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const checkStatus = () => {
      const hour = new Date().getHours();
      setIsOpen(hour >= openHour && hour < closeHour);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOrderClick = (url) => {
    if (!isOpen) {
      toast.error(
        "Sorry! Orders cannot be placed outside working hours (10:00 AM – 11:00 PM).",
        {
          duration: 5000,
          style: {
            borderRadius: "12px",
            background: "#fff",
            color: "#f87171",
            padding: "16px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            fontWeight: "bold",
          },
        }
      );
      return;
    }
    window.open(url, "_blank");
  };

  const cardShadow = isOpen
    ? "shadow-[0_0_20px_rgba(34,197,94,0.75)]"
    : "shadow-[0_0_20px_rgba(239,68,68,0.75)]";

  return (
    <div className="max-w-[1640px] mx-auto px-4 py-12">
      <h1 className="text-orange-600 font-bold text-4xl text-center mb-8">
        Best Deals
      </h1>

      <div className="max-w-[1640px] mx-auto p-4 py-12 grid md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          variants={cardVariants}
          className={`relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 ${cardShadow}`}
          onClick={() =>
            handleOrderClick(
              "https://wa.me/1234567890?text=Hi! I want to order Breakfast"
            )
          }
        >
          {/* Status Badge */}
          {!isOpen && (
            <div className="absolute top-3 right-3 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              Closed 10:00 AM – 11:00 PM
            </div>
          )}

          {isOpen && (
            <div className="absolute top-3 right-3 z-10 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              Open 10:00 AM – 11:00 PM
            </div>
          )}
          <div
            className="absolute w-full h-full bg-black/40 rounded-xl text-white flex flex-col justify-between p-4 
                          opacity-80 group-hover:opacity-100 group-hover:backdrop-blur-sm transition-all duration-500"
          >
            <div className="transform translate-y-0 group-hover:translate-y-2 transition-all duration-500">
              <p className="font-bold text-2xl md:text-3xl lg:text-4xl">
                Breakfast
              </p>
              <p className="text-sm md:text-base">Delicious and tasty</p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOrderClick("https://wa.me/1234567890");
              }}
              className="bg-orange-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-orange-600 transition-all w-max"
            >
              Order Now
            </button>
          </div>

          <img
            className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl group-hover:scale-105 transition-all duration-500"
            src="https://images.unsplash.com/photo-1613769049987-b31b641f25b1"
            alt="Breakfast"
          />
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
          variants={cardVariants}
          className={`relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 ${cardShadow}`}
          onClick={() =>
            handleOrderClick(
              "https://wa.me/1234567890?text=Hi! I want to order meat"
            )
          }
        >
          {/* Status Badge */}
          {!isOpen && (
            <div className="absolute top-3 right-3 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              Closed 10:00 AM – 11:00 PM
            </div>
          )}

          {isOpen && (
            <div className="absolute top-3 right-3 z-10 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              Open 10:00 AM – 11:00 PM
            </div>
          )}

          <div
            className="absolute w-full h-full bg-black/40 rounded-xl text-white flex flex-col justify-between p-4
                          opacity-80 group-hover:opacity-100 group-hover:backdrop-blur-sm transition-all duration-500"
          >
            <div className="transform translate-y-0 group-hover:translate-y-2 transition-all duration-500">
              <p className="font-bold text-2xl md:text-3xl lg:text-4xl">Meat</p>
              <p className="text-sm md:text-base">Tasty Treats</p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOrderClick("https://wa.me/1234567890");
              }}
              className="bg-orange-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-orange-600 transition-all w-max"
            >
              Order Now
            </button>
          </div>

          <img
            className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl group-hover:scale-105 transition-all duration-500"
            src="https://images.unsplash.com/photo-1544025162-d76694265947"
            alt="Meat"
          />
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
          variants={cardVariants}
          className={`relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 ${cardShadow}`}
          onClick={() =>
            handleOrderClick(
              "https://wa.me/1234567890?text=Hi! I want to order Sweets"
            )
          }
        >
          {/* Status Badge */}
          {!isOpen && (
            <div className="absolute top-3 right-3 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              Closed 10:00 AM – 11:00 PM
            </div>
          )}

          {isOpen && (
            <div className="absolute top-3 right-3 z-10 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              Open 10:00 AM – 11:00 PM
            </div>
          )}
          <div
            className="absolute w-full h-full bg-black/40 rounded-xl text-white flex flex-col justify-between p-4
                          opacity-80 group-hover:opacity-100 group-hover:backdrop-blur-sm transition-all duration-500"
          >
            <div className="transform translate-y-0 group-hover:translate-y-2 transition-all duration-500">
              <p className="font-bold text-2xl md:text-3xl lg:text-4xl">
                Sweets
              </p>
              <p className="text-sm md:text-base">Added Daily</p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOrderClick("https://wa.me/1234567890");
              }}
              className="bg-orange-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-orange-600 transition-all w-max"
            >
              Order Now
            </button>
          </div>

          <img
            className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl group-hover:scale-105 transition-all duration-500"
            src="https://images.unsplash.com/photo-1559715745-e1b33a271c8f"
            alt="Sweets"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeadlineCards;
