"use client";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Syringe,
  Pill,
  Thermometer,
  Hospital,
  HeartPulse,
  Biohazard,
  Droplet,
  Bandage,
  ShieldCheck,
} from "lucide-react";

const floatingIcons = [
  { Icon: Stethoscope, top: "12%", left: "8%", color: "text-blue-400/40" },
  { Icon: Pill, top: "25%", left: "70%", color: "text-pink-400/40" },
  { Icon: Bandage, top: "45%", left: "15%", color: "text-red-400/40" },
  { Icon: Thermometer, top: "35%", left: "60%", color: "text-green-400/40" },
  { Icon: Syringe, top: "18%", left: "40%", color: "text-purple-400/40" },
  { Icon: HeartPulse, top: "60%", left: "75%", color: "text-rose-400/40" },
  { Icon: Hospital, top: "55%", left: "30%", color: "text-cyan-400/40" },
  { Icon: ShieldCheck, top: "68%", left: "10%", color: "text-yellow-400/40" },
  { Icon: Biohazard, top: "80%", left: "50%", color: "text-lime-400/40" },
  { Icon: Droplet, top: "72%", left: "80%", color: "text-orange-400/40" },
];

export default function HeroSection() {
  return (
    <section className="min-h-screen flex justify-center items-center relative overflow-hidden px-4 -mt-[1px] bg-[linear-gradient(135deg,_#0b1f23_25%,_black_100%)]">
      {/* Optional animated overlay glow */}
      <motion.div
        initial={{ opacity: 0.2, scale: 1 }}
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute right-0 bottom-0 w-[80%] h-[80%] bg-black/30 blur-2xl rounded-full pointer-events-none"
      />

      {/* Floating Medical Icons */}
      {floatingIcons.map(({ Icon, top, left, color }, index) => (
        <motion.span
          key={index}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: [0, -10, 0], opacity: 0.5 }}
          transition={{
            duration: 6,
            delay: index * 0.2,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className={`absolute z-0 select-none ${color}`}
          style={{ top, left }}
        >
          <Icon className="w-6 h-6" />
        </motion.span>
      ))}

      {/* Center Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 max-w-3xl w-full text-center shadow-2xl mx-auto"
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-sm uppercase tracking-widest text-blue-400 mb-2"
        >
          Smart Pharmacy Search
        </motion.h3>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent"
        >
          Find Nearby Medicines <br />
          <span className="text-blue-400">Faster Than Ever</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg text-gray-300 mb-4"
        >
          Search medicine availability instantly across local pharmacies with
          live stock and contact info.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-md text-gray-400 mb-6"
        >
          Perfect for emergencies, chronic treatments, and quick access to
          essential meds nearby.
        </motion.p>

        <motion.a
          href="#search"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition"
        >
          Check Availability
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-sm text-gray-500 mt-6"
        >
          Access to medicine starts with information — we make that fast &
          effortless.
        </motion.p>
      </motion.div>
    </section>
  );
}
