import { FaShippingFast, FaStar, FaHeadset } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">
          Why Choose <span className="text-orange-500">Best Eats</span>?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <FaShippingFast size={40} className="text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Your food arrives hot & fresh.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <FaStar size={40} className="text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Top Quality</h3>
            <p className="text-gray-600">Only the best restaurants.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
            <FaHeadset size={40} className="text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">We’re always here for you.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
