"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Dummy medicine availability data
const medicines = [
  {
    id: 1,
    name: "Paracetamol",
    availability: "Available",
    pharmacy: "Wellness Pharmacy",
  },
  {
    id: 2,
    name: "Azithromycin",
    availability: "Out of Stock",
    pharmacy: "City Medico",
  },
  {
    id: 3,
    name: "Ibuprofen",
    availability: "Available",
    pharmacy: "Health First",
  },
];

export default function Availability() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-24 px-4 text-white">
      <motion.h1
        className="text-4xl font-extrabold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent mb-10 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Medicine Availability Status
      </motion.h1>

      <motion.div
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
      >
        <table className="w-full text-left">
          <thead>
            <tr className="text-white/80 border-b border-white/20">
              <th className="pb-3">Medicine</th>
              <th className="pb-3">Availability</th>
              <th className="pb-3">Pharmacy</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((m) => (
              <tr key={m.id} className="hover:bg-white/5 transition">
                <td className="py-2">{m.name}</td>
                <td className="py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      m.availability === "Available"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {m.availability}
                  </span>
                </td>
                <td className="py-2">{m.pharmacy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </section>
  );
}
