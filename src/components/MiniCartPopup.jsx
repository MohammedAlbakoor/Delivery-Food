import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";

const MiniCartPopup = () => {
  const { lastAddedItem } = useCart();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (lastAddedItem) {
      setShow(true);
      const t = setTimeout(() => setShow(false), 2200);
      return () => clearTimeout(t);
    }
  }, [lastAddedItem]);

  return (
    <AnimatePresence>
      {show && lastAddedItem && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed bottom-6 right-6 z-[999] bg-white shadow-2xl rounded-xl p-4 flex items-center gap-3"
        >
          <BsCheckCircleFill className="text-green-500 text-2xl" />
          <div>
            <p className="font-bold text-sm">{lastAddedItem.name}</p>
            <p className="text-xs text-gray-500">Added to cart</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MiniCartPopup;
