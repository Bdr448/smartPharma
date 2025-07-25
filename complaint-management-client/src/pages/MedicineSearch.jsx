"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function MedicineSearch() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-24 px-4 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1 }}
        className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-10 max-w-xl w-full shadow-2xl text-white"
      >
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent"
        >
          Search for <span className="text-blue-400">Medicines</span>
        </motion.h2>

        <form className="space-y-5">
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Medicine Name
            </label>
            <input
              type="text"
              placeholder="e.g. Paracetamol, Azithromycin"
              className="w-full px-4 py-2 bg-white/10 text-white rounded-md border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Your Location / Pincode
            </label>
            <input
              type="text"
              placeholder="Enter city or pincode"
              className="w-full px-4 py-2 bg-white/10 text-white rounded-md border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition rounded-md text-white font-semibold shadow-md"
          >
            Check Availability
          </button>
        </form>
      </motion.div>
    </section>
  );
}
