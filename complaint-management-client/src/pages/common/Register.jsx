"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { registerUser } from "../../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      console.log(res);

      if (res.token) {
        localStorage.setItem("token", res.token);
        setUser({ ...res.user, role: form.role });
        alert("✅ Registered successfully!");
        navigate("/");
      } else {
        alert("❌ Registration failed: " + (res.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("❌ Something went wrong.");
    }
  };

  return (
    // 📌 Tumhara original UI code — untouched
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F2F9] via-[#EFEAEF] to-[#E4DEEC] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl p-8 border border-[#d8cde2] shadow-2xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-center bg-gradient-to-r from-[#515191] via-[#706296] to-[#946183] bg-clip-text text-transparent mb-2"
        >
          Create Account
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-600 mb-6"
        >
          Join us and track your medicines.
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-700 font-medium block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/80 text-gray-900 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#706296]"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="text-gray-700 font-medium block mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/80 text-gray-900 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#706296]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-gray-700 font-medium block mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/80 text-gray-900 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#706296]"
              placeholder="••••••••"
            />
          </div>

          {/* Role selector */}
          <div>
            <label className="text-gray-700 font-medium block mb-2">
              Register as
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  checked={form.role === "customer"}
                  onChange={handleChange}
                  className="accent-[#706296]"
                />
                Customer
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="role"
                  value="pharmacy"
                  checked={form.role === "pharmacy"}
                  onChange={handleChange}
                  className="accent-[#706296]"
                />
                Pharmacy
              </label>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 mt-2 bg-[#706296] hover:bg-[#515191] text-white font-semibold rounded-lg shadow-md transition"
          >
            Register
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#515191] hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </section>
  );
}
