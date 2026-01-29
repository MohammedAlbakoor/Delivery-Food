import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestionCircle, FaTruck, FaCreditCard, FaUtensils, FaUser } from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      category: "Order & Delivery",
      icon: <FaTruck />,
      questions: [
        {
          question: "How long does delivery take?",
          answer: "Delivery times vary based on your location and restaurant preparation time. On average, deliveries arrive within 30-45 minutes. You can track your order in real-time through our app."
        },
        {
          question: "Is there a delivery fee?",
          answer: "Delivery fees depend on your distance from the restaurant. Orders above $25 qualify for free delivery in most areas. You'll see the exact delivery fee before checkout."
        },
        {
          question: "Can I schedule an order for later?",
          answer: "Yes! You can schedule orders up to 7 days in advance. Simply select your preferred delivery time during checkout and we'll ensure your food arrives fresh and ready."
        },
        {
          question: "What if my order is late?",
          answer: "We strive to deliver on time, but sometimes delays happen. If your order is significantly delayed, you'll receive automatic compensation or a discount on your next order."
        }
      ]
    },
    {
      category: "Payment",
      icon: <FaCreditCard />,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept cash, credit/debit cards (Visa, Mastercard), and mobile payment solutions like Apple Pay and Google Pay. Select restaurants also support local payment methods."
        },
        {
          question: "Is my payment information secure?",
          answer: "Absolutely! We use industry-standard encryption and security measures to protect your payment information. Your data is processed securely and never stored on our servers."
        },
        {
          question: "Can I get a refund?",
          answer: "Refunds are processed if your order is incorrect, damaged, or not delivered. Contact our support team within 24 hours of delivery with your order details and photos of the issue."
        },
        {
          question: "Do you offer cashback or rewards?",
          answer: "Yes! Our loyalty program rewards you with points on every order. Earn points and redeem them for discounts or free items. Check your rewards section for current offers."
        }
      ]
    },
    {
      category: "Menu & Food",
      icon: <FaUtensils />,
      questions: [
        {
          question: "Can I customize my order?",
          answer: "Many of our restaurant partners offer customization options. You can add or remove ingredients, specify cooking preferences, or request special preparations during the ordering process."
        },
        {
          question: "Are dietary requirements accommodated?",
          answer: "Yes! We have filters for vegetarian, vegan, gluten-free, and other dietary requirements. Restaurant partners clearly label allergens and special dietary options."
        },
        {
          question: "How do you ensure food quality?",
          answer: "We partner only with top-rated restaurants and conduct regular quality checks. Delivery drivers are trained to handle food properly, and insulated bags keep your meal at the right temperature."
        },
        {
          question: "Can I add special instructions?",
          answer: "Absolutely! During checkout, you can add special instructions for both the restaurant and delivery driver. We'll do our best to accommodate your requests."
        }
      ]
    },
    {
      category: "Account & Support",
      icon: <FaUser />,
      questions: [
        {
          question: "How do I create an account?",
          answer: "Creating an account is easy! Click on 'Sign Up' and enter your email, name, and password. You'll also need to verify your phone number. Accounts allow you to track orders, save favorites, and access exclusive offers."
        },
        {
          question: "Can I change my delivery address?",
          answer: "Yes, you can add multiple addresses to your profile. Before placing an order, select your preferred delivery address or add a new one. Your default address is saved for convenience."
        },
        {
          question: "How do I contact customer support?",
          answer: "You can reach our support team via live chat in the app, email at support@besteats.com, or call our helpline. We're available 24/7 to assist you with any questions or issues."
        },
        {
          question: "Can I delete my account?",
          answer: "Yes, you can request account deletion through your profile settings. Please note that this action is irreversible and you'll lose all order history and rewards."
        }
      ]
    }
  ];

  const allQuestions = faqCategories.flatMap(cat => 
    cat.questions.map(q => ({ ...q, category: cat.category }))
  );

  const filteredQuestions = searchQuery
    ? allQuestions.filter(q =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <FaQuestionCircle size={40} className="text-orange-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h1>
          <p className="text-gray-600">Find answers to common questions</p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="relative">
            <FaQuestionCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-orange-500 outline-none transition bg-white shadow-lg"
            />
          </div>
        </motion.div>

        {/* Search Results */}
        {searchQuery && filteredQuestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Search Results</h2>
            <div className="space-y-3">
              {filteredQuestions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => toggleQuestion(`search-${index}`)}
                    className="w-full text-left p-4 rounded-xl hover:bg-gray-50 transition"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">{item.question}</h3>
                      <motion.div
                        animate={{ rotate: openIndex === `search-${index}` ? 180 : 0 }}
                      >
                        <FaChevronDown className="text-gray-400" />
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {openIndex === `search-${index}` && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-3 text-gray-600"
                        >
                          {item.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Categories */}
        {!searchQuery && (
          <div className="space-y-12">
            {faqCategories.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-lg flex items-center justify-center">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{category.category}</h2>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  {category.questions.map((item, qIndex) => {
                    const uniqueIndex = `${catIndex}-${qIndex}`;
                    
                    return (
                      <div key={qIndex} className={qIndex > 0 ? "border-t border-gray-100" : ""}>
                        <button
                          onClick={() => toggleQuestion(uniqueIndex)}
                          className="w-full text-left p-6 hover:bg-gray-50 transition"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-800 pr-8">{item.question}</h3>
                            <motion.div
                              animate={{ rotate: openIndex === uniqueIndex ? 180 : 0 }}
                            >
                              <FaChevronDown className="text-gray-400 flex-shrink-0" />
                            </motion.div>
                          </div>
                          <AnimatePresence>
                            {openIndex === uniqueIndex && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <p className="mt-4 text-gray-600 leading-relaxed">{item.answer}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-center text-white"
        >
          <FaQuestionCircle size={48} className="mx-auto mb-4 opacity-90" />
          <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
          <p className="mb-6 opacity-90">Our support team is here to help you 24/7</p>
          <button className="bg-white text-orange-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;