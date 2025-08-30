"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with actual backend call
    setTimeout(() => {
      setSent(true);
    }, 1000);
  };

  return (
    <section className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#f5f2f9] via-[#ece6f0] to-[#ddd6e7] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md p-8 bg-white/60 backdrop-blur-xl rounded-2xl border border-[#d8cde2] shadow-2xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center bg-gradient-to-r from-[#706296] via-[#946183] to-[#515191] bg-clip-text text-transparent mb-6"
        >
          Forgot Password?
        </motion.h2>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                Enter your email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-white/90 text-gray-900 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#706296]"
                placeholder="you@example.com"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-2 bg-[#706296] hover:bg-[#515191] text-white font-semibold rounded-md shadow-md transition"
            >
              Send Reset Link
            </motion.button>
          </form>
        ) : (
          <p className="text-center text-green-600 font-medium">
            ✅ Reset link sent! Please check your email.
          </p>
        )}
      </motion.div>
    </section>
  );
}
