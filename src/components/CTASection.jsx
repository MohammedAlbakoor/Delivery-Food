import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CTASection = () => {
  const phone = "1234567890";
  const message = encodeURIComponent("I want to order food 🍔");

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

  const handleOrderClick = () => {
    if (!isOpen) {
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

    window.open(
      `https://wa.me/${phone}?text=${message}`,
      "_blank"
    );
  };

  return (
    <section className="bg-orange-500 py-14 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">
        Hungry? Let’s fix that 🍔🔥
      </h2>

      <p className="mb-6 text-lg">
        Order now and enjoy the best meals in town
      </p>

      <button
        onClick={handleOrderClick}
        className={`px-6 py-3 rounded-full font-semibold transition-all duration-300
          ${
            isOpen
              ? "bg-white text-orange-500 hover:scale-105"
              : "bg-red-500 text-white cursor-not-allowed opacity-80"
          }`}
      >
        {isOpen ? "Order via WhatsApp" : "Closed Now"}
      </button>
    </section>
  );
};

export default CTASection;
