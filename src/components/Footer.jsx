import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Best Eats</h3>
          <p className="text-sm">
            Delicious food delivered fast & fresh.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>Menu</li>
            <li>Categories</li>
            <li>Best Deals</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Follow Us</h4>
          <div className="flex space-x-4">
            <FaFacebook />
            <FaInstagram />
            <FaWhatsapp />
          </div>
        </div>
      </div>

      <div className="text-center text-sm border-t border-gray-700 mt-8 py-4">
        © {new Date().getFullYear()} Best Eats. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
