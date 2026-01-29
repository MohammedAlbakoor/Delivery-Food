import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBell, FaCheckDouble, FaTrash, FaGift, FaTruck, FaStar, FaTag, FaExclamationCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: "offer",
        title: "🎉 50% OFF Today Only!",
        message: "Flash sale: Get 50% off on all burgers. Use code: FLASH50",
        time: "5 min ago",
        read: false,
        icon: <FaTag className="text-orange-500" />,
        color: "orange"
      },
      {
        id: 2,
        type: "order",
        title: "🚚 Order #12345 Delivered",
        message: "Your order from Burger Palace has been delivered. Enjoy your meal!",
        time: "1 hour ago",
        read: false,
        icon: <FaTruck className="text-green-500" />,
        color: "green"
      },
      {
        id: 3,
        type: "reward",
        title: "🎁 You earned 50 points!",
        message: "Thanks for your order. Keep earning to unlock exclusive rewards!",
        time: "2 hours ago",
        read: true,
        icon: <FaGift className="text-purple-500" />,
        color: "purple"
      },
      {
        id: 4,
        type: "review",
        title: "⭐ Rate your last order",
        message: "How was your experience with Pizza Heaven? Share your thoughts!",
        time: "3 hours ago",
        read: true,
        icon: <FaStar className="text-yellow-500" />,
        color: "yellow"
      },
      {
        id: 5,
        type: "system",
        title: "⚠️ Restaurant Temporarily Closed",
        message: "Sushi Master is currently closed for maintenance. Expected to reopen in 2 hours.",
        time: "5 hours ago",
        read: true,
        icon: <FaExclamationCircle className="text-red-500" />,
        color: "red"
      },
      {
        id: 6,
        type: "offer",
        title: "🎁 Free Delivery Weekend!",
        message: "Free delivery on all orders above $15 this weekend. Don't miss out!",
        time: "1 day ago",
        read: true,
        icon: <FaTag className="text-orange-500" />,
        color: "orange"
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read ✓");
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success("Notification deleted");
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success("All notifications cleared");
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = filter === "all" 
    ? notifications 
    : filter === "unread" 
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.read);

  const colorClasses = {
    orange: "bg-orange-100",
    green: "bg-green-100",
    purple: "bg-purple-100",
    yellow: "bg-yellow-100",
    red: "bg-red-100"
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <FaBell size={32} className="text-orange-500" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
              <p className="text-gray-500 text-sm">{unreadCount} unread</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaCheckDouble size={14} />
              Mark All Read
            </button>
            <button
              onClick={clearAll}
              disabled={notifications.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaTrash size={14} />
              Clear All
            </button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 mb-6 bg-white rounded-xl p-2 shadow"
        >
          {[
            { id: "all", label: "All" },
            { id: "unread", label: "Unread" },
            { id: "read", label: "Read" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`flex-1 py-2 px-4 rounded-lg transition ${
                filter === item.id
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </motion.div>

        {/* Notifications List */}
        <AnimatePresence mode="popLayout">
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FaBell size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No notifications</h3>
              <p className="text-gray-500">You're all caught up!</p>
            </motion.div>
          ) : (
            filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => markAsRead(notification.id)}
                className={`relative bg-white rounded-xl p-4 mb-3 shadow-sm hover:shadow-md transition cursor-pointer ${
                  !notification.read ? "border-l-4 border-orange-500" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${colorClasses[notification.color]}`}>
                    {notification.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={`font-semibold text-gray-800 ${!notification.read ? "" : "font-normal"}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{notification.message}</p>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                    className="text-gray-400 hover:text-red-500 transition flex-shrink-0"
                  >
                    <FaTrash size={14} />
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Notifications;