import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import confetti from "canvas-confetti";
import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import toast from "react-hot-toast";

const CartPage = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart, getTotal, setCart } =
    useCart();
  const { user } = useAuth();
  const refs = useRef({});
  const prevCartLength = useRef(cart.length);

  const [location, setLocation] = useState(null);
  const [shareLocation, setShareLocation] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("Delivery");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const [showQRModal, setShowQRModal] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const [isOpen, setIsOpen] = useState(true); // حالة الدوام
const openHour = 10; // 10 AM
const closeHour = 23; // 11 PM

  /* ================= Effects ================= */

  useEffect(() => {
    // النزول فقط عند إضافة عنصر جديد
    if (cart.length > prevCartLength.current) {
      const lastItem = cart[cart.length - 1];
      refs.current[lastItem.id]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    prevCartLength.current = cart.length;
  }, [cart]);
  useEffect(() => {
  const checkStatus = () => {
    const now = new Date();
    const hour = now.getHours();
    setIsOpen(hour >= openHour && hour < closeHour);
  };
  checkStatus();
  const interval = setInterval(checkStatus, 60 * 1000); // يحدث كل دقيقة
  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!navigator.geolocation) return;

    if (shareLocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation(`https://maps.google.com/?q=${latitude},${longitude}`);
        },
        () => setLocation("Location not available")
      );
    } else {
      setLocation(null);
    }
  }, [shareLocation]);

  /* ================= Helpers ================= */

  const fireConfetti = () => {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
  };

  const orderTime = new Date().toLocaleString();
  const customerName = user?.name || user?.email || "Guest";

  const QR_VALUE = `48646216546511658468`;

  /* ================= Animations ================= */

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  /* ================= WhatsApp ================= */

  const sendToWhatsApp = (invoice) => {
    const phoneNumber = "963111111111";

    const itemsText = cart
      .map(
        (item, i) =>
          `${i + 1}. ${item.name}\n   Qty: ${item.qty}\n   Price: $${item.price}`
      )
      .join("\n\n");

    const message = `
🧾 *New Order*
------------------
👤 Customer: ${customerName}
⏰ Time: ${orderTime}
📍 Location: ${location || "Not shared"}
🚚 Delivery: ${deliveryMethod}
💳 Payment: ${paymentMethod}
🧾 Invoice: ${invoice}
------------------
${itemsText}
------------------
💰 Total: $${getTotal().toFixed(2)}
    `;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    setCart([]);
  };

  /* ================= Order ================= */

  const handlePlaceOrder = () => {
  if (!isOpen) {
    // خارج الدوام → نافذة احترافية
    toast.error("Sorry! Orders cannot be placed outside working hours (10:00 AM – 11:00 PM).", {
      duration: 5000,
      style: {
        borderRadius: '12px',
        background: '#fff',
        color: '#f87171',
        padding: '16px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        fontWeight: 'bold',
      },
    });
    return;
  }

  fireConfetti();

  if (paymentMethod === "Online") {
    setShowQRModal(true);
  } else {
    sendToWhatsApp("Cash");
  }
};


  const confirmOnlinePayment = () => {
    if (!invoiceNumber.trim()) {
      alert("Please enter invoice number");
      return;
    }

    sendToWhatsApp(invoiceNumber);
    setShowQRModal(false);
    setInvoiceNumber("");
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-orange-600">Your Cart</h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {cart.map((item) => (
          <motion.div
            ref={(el) => (refs.current[item.id] = el)}
            key={item.id}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="font-bold text-lg">{item.name}</h2>
              <p className="text-gray-500">${item.price}</p>

              <div className="flex items-center gap-2 mt-3">
                <motion.button
                  whileTap={{ scale: 0.7 }}
                  onClick={() => decreaseQty(item.id)}
                  className="p-2 bg-red-100 rounded-full"
                >
                  <FaMinus />
                </motion.button>

                <span className="px-4 py-1 bg-gray-100 rounded font-bold">
                  {item.qty}
                </span>

                <motion.button
                  whileTap={{ scale: 0.7 }}
                  onClick={() => increaseQty(item.id)}
                  className="p-2 bg-green-100 rounded-full"
                >
                  <FaPlus />
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 bg-red-300 rounded-full ml-auto"
                >
                  <FaTrash />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Options */}
      <div className="mt-6 space-y-3">
        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={shareLocation}
            onChange={(e) => setShareLocation(e.target.checked)}
          />
          Share location
        </label>

        <select
          value={deliveryMethod}
          onChange={(e) => setDeliveryMethod(e.target.value)}
          className="border p-2 rounded"
        >
          <option>Delivery</option>
          <option>Pickup</option>
        </select>

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border p-2 rounded"
        >
          <option>Cash</option>
          <option>Online</option>
        </select>
      </div>

      <div className="text-right mt-8">
        <h3 className="text-2xl font-bold">
          Total: ${getTotal().toFixed(2)}
        </h3>
        
        {!isOpen && (
  <button
          onClick={handlePlaceOrder}
          className="mt-4 bg-red-500 text-white cursor-not-allowed px-6 py-2 rounded-lg"
        >
          Place Order 🎉
        </button>
)}
{isOpen && (
  <button
          onClick={handlePlaceOrder}
          className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg"
        >
          Place Order 🎉
        </button>
)}
      </div>

      {/* ================= QR MODAL ================= */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[320px] text-center">
            <h2 className="font-bold mb-4">Scan to pay via Sham Cash</h2>

            <QRCodeCanvas value={QR_VALUE} size={200} />

            <input
              type="text"
              placeholder="Invoice Number"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="mt-4 w-full border p-2 rounded"
            />

            <div className="flex gap-2 mt-4">
              <button
                onClick={confirmOnlinePayment}
                className="flex-1 bg-green-500 text-white py-2 rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowQRModal(false)}
                className="flex-1 bg-gray-300 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
