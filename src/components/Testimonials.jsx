import { motion } from "framer-motion";

const testimonials = [
  { name: "Sarah ", text: "Best food delivery app I’ve used!" },
  { name: "Mohamad ", text: "Fast, clean UI and amazing experience." },
  { name: "Ahmad ", text: "Loved the smooth animations 🔥" },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow"
          >
            <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
            <p className="my-4 text-gray-700">“{t.text}”</p>
            <p className="font-bold">{t.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
