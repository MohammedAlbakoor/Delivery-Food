import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const WhatsAppButton = () => {
  const phone = "49123456789"; 
  const message = encodeURIComponent("Hello, I want to order food 🍔");

  const [isOpen, setIsOpen] = useState(true); // حالة الدوام
  const openHour = 10; // 10 AM
  const closeHour = 23; // 11 PM

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      setIsOpen(hour >= openHour && hour < closeHour);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60 * 1000); 
    return () => clearInterval(interval);
  }, []);

  const handleClick = (e) => {
    if (!isOpen) {
      e.preventDefault();
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
    }
  };

  return (
    <a
      href={isOpen ? `https://wa.me/${phone}?text=${message}` : "#"}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`fixed bottom-6 left-6 md:translate-y-0 translate-y-[-70px] p-4 rounded-full shadow-lg z-50 hover:scale-110 transition 
        ${isOpen ? "bg-green-500 text-white" : "bg-red-500 text-white cursor-not-allowed"}`}
      title={isOpen ? "Order via WhatsApp" : "Sorry, we are closed"}
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppButton;
