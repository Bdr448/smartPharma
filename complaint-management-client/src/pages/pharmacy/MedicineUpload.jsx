"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function MedicineUpload() {
  const [formData, setFormData] = useState({
    name: "",
    pharmacyName: "",
    contact: "",
    location: "",
    stock: "",
    price: "",
    photo: null, // 🔹 file object
    description: "",
    expiry: "",
    composition: "",
    alternatives: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name === "photo") {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? parseFloat(value) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    try {
      const dataToSend = new FormData();
      for (let key in formData) {
        if (key === "alternatives") {
          dataToSend.append(
            key,
            formData.alternatives
              .split(",")
              .map((alt) => alt.trim())
              .join(",")
          );
        } else {
          dataToSend.append(key, formData[key]);
        }
      }

      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: dataToSend,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Upload successful");
        setFormData({
          name: "",
          pharmacyName: "",
          contact: "",
          location: "",
          stock: "",
          price: "",
          photo: null,
          description: "",
          expiry: "",
          composition: "",
          alternatives: "",
        });
      } else {
        setIsError(true);
        setMessage(data.error || "Upload failed. Try again.");
      }
    } catch (err) {
      setIsError(true);
      setMessage("Upload failed. Try again.");
    }
  };

  const fields = [
    { label: "Medicine Name", name: "name", type: "text", icon: "💊" },
    { label: "Pharmacy Name", name: "pharmacyName", type: "text", icon: "🏥" },
    { label: "Contact Number", name: "contact", type: "text", icon: "📞" },
    { label: "Location", name: "location", type: "text", icon: "📍" },
    { label: "Available Stock", name: "stock", type: "number", icon: "📦" },
    { label: "Price (₹)", name: "price", type: "number", icon: "💰" },
    {
      label: "Description",
      name: "description",
      type: "text",
      icon: "📝",
    },
    { label: "Expiry Date", name: "expiry", type: "date", icon: "📅" },
    { label: "Composition", name: "composition", type: "text", icon: "⚗️" },
    {
      label: "Alternatives (comma-separated)",
      name: "alternatives",
      type: "text",
      icon: "🔄",
    },
  ];

  return (
    <section className="py-12 px-4 flex justify-center items-center min-h-screen bg-[#f5f7fa]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden border border-[#e0e6ed]"
      >
        <div className="bg-gradient-to-r from-[#272290] to-[#479863] p-8 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-white"
          >
            Medicine Stock Update
          </motion.h2>
          <p className="text-[#d1fae5] mt-2">
            Update your pharmacy inventory in real-time
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8"
          encType="multipart/form-data"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map(({ label, name, type, icon }) => (
              <div key={name} className="space-y-2">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xl">{icon}</span>
                  <label className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                </div>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={label}
                  required={["description", "expiry"].includes(name)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#479863] focus:border-[#479863] transition bg-gray-50"
                />
              </div>
            ))}

            {/* 🔹 Image Upload Field */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xl">🖼️</span>
                <label className="block text-sm font-medium text-gray-700">
                  Medicine Photo
                </label>
              </div>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
              />
            </div>
          </div>

          <div className="mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#272290] to-[#479863] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Update Medicine Stock
            </motion.button>
          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-6 p-4 rounded-lg text-center ${
                isError
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : "bg-green-100 text-green-700 border border-green-200"
              }`}
            >
              {message}
            </motion.div>
          )}
        </form>
      </motion.div>
    </section>
  );
}
