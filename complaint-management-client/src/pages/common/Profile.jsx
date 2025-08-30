"use client";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function Profile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    notes: "",
    role: user?.role || "customer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    alert("✅ Profile updated (mock only).");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F5F7FA]">
      {" "}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {" "}
        {/* Profile Summary Card */}{" "}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-xl p-8 border border-[#E1E8ED] shadow-sm"
        >
          {" "}
          <div className="flex flex-col items-center mb-8">
            {" "}
            <div className="w-24 h-24 rounded-full bg-[#E8F5E9] flex items-center justify-center mb-4 border-4 border-[#C8E6C9]">
              {" "}
              <span className="text-3xl font-bold text-[#479863]">
                {" "}
                {user?.name?.[0]?.toUpperCase() || "U"}{" "}
              </span>{" "}
            </div>{" "}
            <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>{" "}
            <p className="text-[#706296] text-sm font-medium capitalize">
              {" "}
              {user?.role}{" "}
            </p>{" "}
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                Email
              </p>
              <p className="text-gray-700">{user?.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                Role
              </p>
              <p className="text-gray-700 capitalize">{user?.role}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                Status
              </p>
              <p className="text-gray-700">Active</p>
            </div>
          </div>
        </motion.div>
        {/* Edit Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white rounded-xl p-8 border border-[#E1E8ED] shadow-sm"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Edit Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#479863] focus:border-[#479863]"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#479863] focus:border-[#479863]"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#479863] focus:border-[#479863]"
                  placeholder="9876543210"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#479863] focus:border-[#479863]"
                >
                  <option value="customer">Customer</option>
                  <option value="pharmacy">Pharmacy Owner</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#479863] focus:border-[#479863]"
                placeholder="Bopal, Ahmedabad - 380058"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">
                Medical Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#479863] focus:border-[#479863]"
                placeholder="e.g. diabetic, needs regular insulin..."
              />
            </div>

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-[#479863] hover:bg-[#3a7d5f] text-white font-medium rounded-lg shadow-sm transition"
              >
                Update Profile
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
