"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Dashboard() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="py-24 px-4 flex justify-center items-center min-h-screen bg-[#F5F5F5]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1 }}
        className="bg-white p-10 w-full max-w-4xl text-center rounded-2xl shadow-lg border border-[#E1E1E1]"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#742690] via-[#209953] to-[#946702] bg-clip-text text-transparent"
        >
          Welcome to your <span className="text-[#479863]">Dashboard</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg text-[#546048] mb-8"
        >
          Track your recent medicine searches, nearby pharmacy availability, and
          compare real-time stock data.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1 - Prosecco & Oysters accent */}
          <div className="bg-white p-6 rounded-xl border border-[#742690]/30 shadow-sm hover:scale-105 transition hover:shadow-md hover:border-[#742690]/60">
            <h3 className="text-xl font-semibold text-[#742690] mb-2">
              My Searches
            </h3>
            <p className="text-sm text-[#706296]">
              View your recent medicine lookup history.
            </p>
          </div>

          {/* Card 2 - Cold Matcha accent */}
          <div className="bg-white p-6 rounded-xl border border-[#209953]/30 shadow-sm hover:scale-105 transition hover:shadow-md hover:border-[#209953]/60">
            <h3 className="text-xl font-semibold text-[#209953] mb-2">
              Nearby Pharmacies
            </h3>
            <p className="text-sm text-[#098036]">
              Access a list of medical stores near your area.
            </p>
          </div>

          {/* Card 3 - Dark Ocean accent */}
          <div className="bg-white p-6 rounded-xl border border-[#CEOP81]/30 shadow-sm hover:scale-105 transition hover:shadow-md hover:border-[#946702]/60">
            <h3 className="text-xl font-semibold text-[#946702] mb-2">
              Stock Overview
            </h3>
            <p className="text-sm text-[#888898]">
              Check medicine availability: In stock vs Out of stock.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
