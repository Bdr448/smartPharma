"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Dashboard() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="py-12 px-4 flex justify-center items-center min-h-screen bg-gradient-to-br from-[#f8f7fc] to-[#f0f0f5]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="bg-white/90 backdrop-blur-sm p-8 sm:p-10 w-full max-w-5xl text-center rounded-3xl shadow-xl border border-white/20"
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-10"
        >
          <motion.h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#742690] to-[#479863] bg-clip-text text-transparent">
            Welcome to your <span className="text-[#479863]">Dashboard</span>
          </motion.h1>
          <motion.p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Track your recent medicine searches, nearby pharmacy availability,
            and compare real-time stock data.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl border border-[#f0e6ff] shadow-sm hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 mb-4 mx-auto rounded-lg bg-[#f3e8ff] flex items-center justify-center text-[#742690] group-hover:bg-[#742690] group-hover:text-white transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-[#742690] transition-colors">
              My Searches
            </h3>
            <p className="text-gray-500 text-sm">
              View your recent medicine lookup history.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl border border-[#e0f7e8] shadow-sm hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 mb-4 mx-auto rounded-lg bg-[#e6f7ed] flex items-center justify-center text-[#209953] group-hover:bg-[#209953] group-hover:text-white transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-[#209953] transition-colors">
              Nearby Pharmacies
            </h3>
            <p className="text-gray-500 text-sm">
              Access a list of medical stores near your area.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl border border-[#f5edd9] shadow-sm hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 mb-4 mx-auto rounded-lg bg-[#f5f0e4] flex items-center justify-center text-[#946702] group-hover:bg-[#946702] group-hover:text-white transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-[#946702] transition-colors">
              Stock Overview
            </h3>
            <p className="text-gray-500 text-sm">
              Check medicine availability: In stock vs Out of stock.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
