import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeadset, FaPaperPlane, FaRobot, FaTimes } from "react-icons/fa";
// import toast from "react-hot-toast";

const Support = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // رسائل للدعم
  const autoResponses = {
    greeting: "👋 Hello! Welcome to Best Eats Support. How can I help you today?",
    order: "📦 I can help you track your order. Please provide your Order ID.",
    payment: "💳 For payment issues, I can help you with: refunds, failed transactions, or updating payment methods.",
    menu: "🍔 Would you like to see our menu or search for specific items?",
    delivery: "🚚 Delivery time is typically 30-45 minutes. For urgent delivery issues, please call our hotline.",
    default: "I understand. Let me check that for you. One moment please..."
  };

  useEffect(() => {
    // رسالة ترحيب عند فتح الشات
    if (chatOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{ 
          id: 1, 
          text: autoResponses.greeting, 
          sender: "bot", 
          time: new Date().toLocaleTimeString() 
        }]);
      }, 500);
    }
  }, [autoResponses.greeting, chatOpen, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const detectIntent = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("order") || lowerMessage.includes("track") || lowerMessage.includes("delivery")) {
      return "order";
    }
    if (lowerMessage.includes("payment") || lowerMessage.includes("money") || lowerMessage.includes("refund")) {
      return "payment";
    }
    if (lowerMessage.includes("menu") || lowerMessage.includes("food") || lowerMessage.includes("order")) {
      return "menu";
    }
    if (lowerMessage.includes("delivery time") || lowerMessage.includes("late")) {
      return "delivery";
    }
    return "default";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      time: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // محاكاة رد البوت
    const intent = detectIntent(inputMessage);
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: autoResponses[intent] || autoResponses.default,
        sender: "bot",
        time: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const quickReplies = [
    "Track my order",
    "Payment issue",
    "Report a problem",
    "Menu question",
    "Contact human"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
            <FaHeadset size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Support Center</h1>
          <p className="text-gray-600">We're here to help you 24/7</p>
        </motion.div>

        {/* Support Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { 
              title: "Live Chat", 
              description: "Chat with our support team instantly", 
              icon: <FaHeadset />, 
              color: "green",
              action: () => setChatOpen(true)
            },
            { 
              title: "Call Us", 
              description: "Speak to a support agent", 
              icon: <FaHeadset />, 
              color: "blue",
              action: () => window.open("tel:+963123456789")
            },
            { 
              title: "Email", 
              description: "Send us a detailed message", 
              icon: <FaHeadset />, 
              color: "purple",
              action: () => window.open("mailto:support@besteats.com")
            }
          ].map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={option.action}
              className="bg-white rounded-2xl shadow-lg p-6 text-left hover:shadow-xl transition"
            >
              <div className={`w-14 h-14 bg-${option.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                {option.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{option.title}</h3>
              <p className="text-gray-500 text-sm">{option.description}</p>
            </motion.button>
          ))}
        </div>

        {/* FAQ Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Help</h2>
          
          <div className="space-y-3">
            {[
              { q: "How do I track my order?", a: "Go to Orders > Track Order and enter your Order ID." },
              { q: "Can I cancel my order?", a: "Yes, you can cancel within 5 minutes of placing your order." },
              { q: "Payment failed, what now?", a: "Try again or contact support for assistance." }
            ].map((faq, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl">
                <p className="font-semibold text-gray-800 mb-1">{faq.q}</p>
                <p className="text-sm text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">Send us a Message</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Mohamad Albakour"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="wrq@ex.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Subject</label>
            <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none bg-white">
              <option>Select a subject</option>
              <option>Order Issue</option>
              <option>Payment Problem</option>
              <option>Technical Issue</option>
              <option>Feedback</option>
              <option>Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Message</label>
            <textarea
              rows={4}
              placeholder="Describe your issue..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none resize-none"
            />
          </div>

          <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transition">
            Send Message
          </button>
        </motion.div>
      </div>

      {/* Live Chat Modal */}
      <AnimatePresence>
        {chatOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setChatOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-0 right-4 md:right-8 w-full md:w-[400px] h-[600px] bg-white rounded-t-3xl md:rounded-2xl shadow-2xl z-50 flex flex-col"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <FaRobot />
                    </div>
                    <div>
                      <h3 className="font-bold">Best Eats Support</h3>
                      <p className="text-xs opacity-90 flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Online
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setChatOpen(false)}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-orange-500 text-white rounded-br-sm"
                        : "bg-white text-gray-800 shadow-sm rounded-bl-sm"
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-gray-400"}`}>
                        {message.time}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex"
                  >
                    <div className="bg-white p-3 rounded-2xl rounded-bl-sm shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length < 3 && (
                <div className="p-3 bg-white border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">Quick replies:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => setInputMessage(reply)}
                        className="text-xs px-3 py-1 bg-gray-100 rounded-full hover:bg-orange-50 transition"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-200"
                  />
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className="w-12 h-12 bg-orange-500 text-white rounded-xl flex items-center justify-center hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaPaperPlane />
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Support;