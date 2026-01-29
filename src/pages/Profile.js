import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaCamera } from "react-icons/fa";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    avatar: user?.avatar || ""
  });

  const [previewImage, setPreviewImage] = useState(user?.avatar || "");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        avatar: user.avatar || ""
      });
      setPreviewImage(user.avatar || "");
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      const updatedUser = { ...user, ...formData };
      login(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsEditing(false);
      setLoading(false);
      toast.success("Profile updated successfully! ✅");
    }, 1000);
  };

  const menuItems = [
    { icon: <FaUser />, label: "Personal Info", id: "personal" },
    { icon: <FaPhone />, label: "Contact Info", id: "contact" },
    { icon: <FaMapMarkerAlt />, label: "Address", id: "address" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-orange-600 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account settings</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-400 to-red-500 p-1">
                    <div className="w-full h-full rounded-full bg-white overflow-hidden">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-orange-100 text-orange-500">
                          <FaUser size={40} />
                        </div>
                      )}
                    </div>
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full cursor-pointer hover:bg-orange-600 transition">
                      <FaCamera size={14} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <h2 className="text-xl font-bold mt-4 text-gray-800">{user?.name || "Guest"}</h2>
                <p className="text-gray-500 text-sm">{user?.email}</p>
              </div>

              {/* Menu */}
              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 5 }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 text-left transition text-gray-700 hover:text-orange-600"
                  >
                    <span className="text-orange-500">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2 space-y-6"
          >
            {/* Personal Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FaUser className="text-orange-500" />
                  Personal Information
                </h3>
                {!isEditing ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(true)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition flex items-center gap-2"
                  >
                    <FaEdit size={14} />
                    Edit
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    disabled={loading}
                    className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                      loading 
                        ? "bg-gray-400 cursor-not-allowed" 
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    <FaSave size={14} />
                    {loading ? "Saving..." : "Save"}
                  </motion.button>
                )}
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 transition ${
                        isEditing
                          ? "border-orange-200 focus:border-orange-500 bg-white"
                          : "border-gray-100 bg-gray-50 text-gray-600"
                      }`}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 transition ${
                        isEditing
                          ? "border-orange-200 focus:border-orange-500 bg-white"
                          : "border-gray-100 bg-gray-50 text-gray-600"
                      }`}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="+963 xxx xxx xxx"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 transition ${
                        isEditing
                          ? "border-orange-200 focus:border-orange-500 bg-white"
                          : "border-gray-100 bg-gray-50 text-gray-600"
                      }`}
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Delivery Address</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows={3}
                      placeholder="Enter your full address..."
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 transition resize-none ${
                        isEditing
                          ? "border-orange-200 focus:border-orange-500 bg-white"
                          : "border-gray-100 bg-gray-50 text-gray-600"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-4 text-white text-center"
              >
                <p className="text-3xl font-bold">12</p>
                <p className="text-sm opacity-90">Orders</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 text-white text-center"
              >
                <p className="text-3xl font-bold">$248</p>
                <p className="text-sm opacity-90">Spent</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 text-white text-center"
              >
                <p className="text-3xl font-bold">8</p>
                <p className="text-sm opacity-90">Favorites</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;