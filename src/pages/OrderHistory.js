import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingBag, FaClock, FaCheckCircle, FaTruck, FaEye, FaRedo } from "react-icons/fa";
import toast from "react-hot-toast";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);

  // بيانات تجريبية للطلبات
  useEffect(() => {
    const mockOrders = [
      {
        id: "ORD-001",
        date: "2024-01-15",
        items: [
          { name: "Double Cheeseburger", qty: 2, price: "$$$$", image: "..." },
          { name: "Fries", qty: 1, price: "$", image: "..." }
        ],
        total: 45,
        status: "delivered",
        paymentMethod: "Cash"
      },
      {
        id: "ORD-002",
        date: "2024-01-14",
        items: [
          { name: "Supreme Pizza", qty: 1, price: "$$$", image: "..." },
          { name: "Wings", qty: 1, price: "$$", image: "..." }
        ],
        total: 32,
        status: "preparing",
        paymentMethod: "Online"
      },
      {
        id: "ORD-003",
        date: "2024-01-10",
        items: [
          { name: "Caesar Salad", qty: 1, price: "$$$", image: "..." }
        ],
        total: 18,
        status: "cancelled",
        paymentMethod: "Cash"
      }
    ];
    setOrders(mockOrders);
  }, []);

  const statusConfig = {
    preparing: {
      label: "Preparing",
      color: "bg-yellow-500",
      icon: <FaClock />,
      textColor: "text-yellow-600"
    },
    delivering: {
      label: "On the way",
      color: "bg-blue-500",
      icon: <FaTruck />,
      textColor: "text-blue-600"
    },
    delivered: {
      label: "Delivered",
      color: "bg-green-500",
      icon: <FaCheckCircle />,
      textColor: "text-green-600"
    },
    cancelled: {
      label: "Cancelled",
      color: "bg-red-500",
      icon: <FaShoppingBag />,
      textColor: "text-red-600"
    }
  };

  const filteredOrders = filter === "all" 
    ? orders 
    : orders.filter(order => order.status === filter);

  const handleReorder = (orderId) => {
    toast.success("Items added to cart! 🛒");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-orange-600 mb-2">Order History</h1>
          <p className="text-gray-600">Track and manage your past orders</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-3 mb-8 flex-wrap"
        >
          {[
            { key: "all", label: "All Orders" },
            { key: "preparing", label: "Preparing" },
            { key: "delivering", label: "On the Way" },
            { key: "delivered", label: "Delivered" },
            { key: "cancelled", label: "Cancelled" }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === item.key
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                  : "bg-white text-gray-600 hover:bg-orange-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </motion.div>

        {/* Orders List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredOrders.map((order, index) => {
              const status = statusConfig[order.status];
              
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  {/* Order Header */}
                  <div
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    className="p-6 cursor-pointer hover:bg-gray-50 transition"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${status.color}`}>
                          {status.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{order.id}</h3>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className={`px-4 py-1 rounded-full text-sm font-medium ${status.textColor} bg-opacity-10 ${status.color.replace('bg-', 'bg-').replace('500', '100')}`}>
                          {status.label}
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-orange-600 text-lg">${order.total}</p>
                          <p className="text-xs text-gray-500">{order.items.length} items</p>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedOrder === order.id ? 180 : 0 }}
                        >
                          <FaEye className="text-gray-400" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <AnimatePresence>
                    {expandedOrder === order.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-100"
                      >
                        <div className="p-6 space-y-4">
                          {/* Items */}
                          <div className="space-y-3">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                                  <p className="text-sm text-gray-500">Qty: {item.qty} • {item.price}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Order Info */}
                          <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <FaClock className="text-orange-500" />
                              <span>Payment: {order.paymentMethod}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <FaShoppingBag className="text-orange-500" />
                              <span>Total: ${order.total}</span>
                            </div>
                          </div>

                          {/* Actions */}
                          {order.status === "delivered" && (
                            <div className="pt-4 border-t border-gray-100">
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleReorder(order.id)}
                                className="w-full bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition flex items-center justify-center gap-2"
                              >
                                <FaRedo />
                                Reorder
                              </motion.button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaShoppingBag size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Orders Found</h3>
            <p className="text-gray-500 mb-4">You haven't placed any orders yet</p>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">
              Browse Menu
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;