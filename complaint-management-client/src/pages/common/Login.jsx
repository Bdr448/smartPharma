"use client";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { loginUser } from "../../api";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "customer",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const res = await loginUser(formData);
      if (res.token) {
        localStorage.setItem("token", res.token);
        setUser({ ...res.user, role: formData.role });
        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 1200);
      } else {
        setIsError(true);
        setMessage(res.error || "❌ Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setIsError(true);
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#fdfafc] via-[#ece6f0] to-[#dcd3e0] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md p-8 rounded-3xl bg-white/70 shadow-2xl backdrop-blur-md border border-[#b3a1c2]/30"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-[#946183] via-[#b3a1c2] to-[#742690] bg-clip-text text-transparent"
        >
          Welcome Back
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[#515191] text-center mb-8"
        >
          Please login to your account
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-[#515191] mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-md bg-[#f4eff6] text-[#272290] border border-[#b3a1c2]/30 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#946183]"
            />
          </div>

          <div>
            <label className="block text-sm text-[#515191] mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-md bg-[#f4eff6] text-[#272290] border border-[#b3a1c2]/30 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#946183]"
            />
          </div>

          <div>
            <label className="block text-sm text-[#515191] mb-2">
              Login As
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-[#515191]">
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  checked={formData.role === "customer"}
                  onChange={handleChange}
                  className="accent-[#742690]"
                />
                Customer
              </label>
              <label className="flex items-center gap-2 text-[#515191]">
                <input
                  type="radio"
                  name="role"
                  value="pharmacy"
                  checked={formData.role === "pharmacy"}
                  onChange={handleChange}
                  className="accent-[#742690]"
                />
                Pharmacy
              </label>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: !loading ? 1.04 : 1 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className={`w-full py-2 ${
              loading ? "bg-[#b79cbb]" : "bg-[#946183] hover:bg-[#742690]"
            } text-white font-semibold rounded-md shadow-md transition`}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

          {message && (
            <p
              className={`text-center text-sm mt-2 ${
                isError ? "text-red-500" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Not registered?{" "}
          <Link to="/register" className="text-[#515191] hover:underline">
            Create an account
          </Link>
          <br />
          <Link
            to="/forgot-password"
            className="text-[#515191] hover:underline mt-2 inline-block"
          >
            Forgot Password?
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
