import { motion } from "framer-motion";
import { FaUtensils, FaHeart, FaUsers, FaLeaf } from "react-icons/fa";

const About = () => {
  const stats = [
    { icon: <FaUtensils />, number: "500+", label: "Dishes" },
    { icon: <FaUsers />, number: "10K+", label: "Happy Customers" },
    { icon: <FaHeart />, number: "4.9", label: "Rating" },
    { icon: <FaLeaf />, number: "100%", label: "Fresh Food" }
  ];

  const values = [
    {
      title: "Fresh Ingredients",
      description: "We source only the freshest ingredients from local farmers and suppliers to ensure every meal is of the highest quality.",
      icon: <FaLeaf />
    },
    {
      title: "Fast Delivery",
      description: "Our efficient delivery system ensures your food arrives hot and fresh, right at your doorstep within minutes.",
      icon: <FaUtensils />
    },
    {
      title: "Customer Satisfaction",
      description: "Your happiness is our priority. We go above and beyond to exceed your expectations with every order.",
      icon: <FaHeart />
    },
    {
      title: "Community Focus",
      description: "We believe in giving back to our community and supporting local businesses and sustainable practices.",
      icon: <FaUsers />
    }
  ];

  const timeline = [
    { year: "2018", event: "Best Eats was founded with a vision to revolutionize food delivery" },
    { year: "2019", event: "Expanded to 3 major cities" },
    { year: "2020", event: "Reached 100,000 orders milestone" },
    { year: "2021", event: "Launched mobile app with advanced features" },
    { year: "2022", event: "Awarded Best Food Delivery Service" },
    { year: "2024", event: "Serving thousands of happy customers daily" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white px-4 z-10"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">About Best Eats</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
              Delivering happiness, one meal at a time
            </p>
          </motion.div>
        </div>
        {/* Decorative Circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/10 rounded-full blur-xl" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white -mt-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-shadow"
              >
                <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center text-orange-500 mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</h3>
                <p className="text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Founded with a passion for great food and exceptional service, Best Eats has grown from a small local kitchen to one of the region's most beloved food delivery services.
              </p>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                We believe that everyone deserves access to delicious, high-quality meals without the hassle of cooking or leaving home. That's why we've partnered with the best restaurants and chefs to bring you an unforgettable dining experience.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Every order we deliver carries our commitment to quality, freshness, and customer satisfaction. We're not just delivering food – we're delivering moments of joy and connection.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg leading-relaxed">
                  "To make delicious, high-quality food accessible to everyone, while supporting local restaurants and reducing food waste through smart delivery solutions."
                </p>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-lg leading-relaxed">
                    "To become the region's most trusted and innovative food delivery platform, known for exceptional service, sustainability, and community impact."
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-full h-full bg-orange-200 rounded-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-orange-500 text-white rounded-xl flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg opacity-90">
              From humble beginnings to industry leader
            </p>
          </motion.div>

          <div className="space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">{item.year}</span>
                </div>
                <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <p className="text-lg">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Join Our Family
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Be part of our growing community and enjoy exclusive offers, new dishes, and special surprises.
            </p>
            <button className="bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-orange-600 transition hover:shadow-lg hover:shadow-orange-200">
              Order Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;