"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Dashboard() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-24 px-4 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1 }}
        className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-10 w-full max-w-4xl text-center shadow-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent"
        >
          Welcome to your <span className="text-blue-400">Dashboard</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg text-gray-300 mb-8"
        >
          Track your recent medicine searches, nearby pharmacy availability, and
          compare real-time stock data.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white"
        >
          {/* Cards */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-md hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-blue-300 mb-2">
              My Searches
            </h3>
            <p className="text-sm text-gray-300">
              View your recent medicine lookup history.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-md hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-green-300 mb-2">
              Nearby Pharmacies
            </h3>
            <p className="text-sm text-gray-300">
              Access a list of medical stores near your area.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-md hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-purple-300 mb-2">
              Stock Overview
            </h3>
            <p className="text-sm text-gray-300">
              Check medicine availability: In stock vs Out of stock.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
