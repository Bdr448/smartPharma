"use client";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Syringe,
  Pill,
  Thermometer,
  Hospital,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";

const floatingIcons = [
  {
    Icon: Stethoscope,
    top: "10%",
    left: "5%",
    color: "text-[#742690]/10",
    size: "w-6 h-6",
  },
  {
    Icon: Pill,
    top: "20%",
    left: "85%",
    color: "text-[#209953]/10",
    size: "w-8 h-8",
  },
  {
    Icon: Thermometer,
    top: "30%",
    left: "75%",
    color: "text-[#946702]/10",
    size: "w-7 h-7",
  },
  {
    Icon: Syringe,
    top: "15%",
    left: "50%",
    color: "text-[#262669]/10",
    size: "w-5 h-5",
  },
  {
    Icon: HeartPulse,
    top: "65%",
    left: "80%",
    color: "text-[#515191]/10",
    size: "w-6 h-6",
  },
  {
    Icon: Hospital,
    top: "60%",
    left: "25%",
    color: "text-[#742690]/10",
    size: "w-9 h-9",
  },
  {
    Icon: ShieldCheck,
    top: "70%",
    left: "15%",
    color: "text-[#396190]/10",
    size: "w-5 h-5",
  },
];

export default function HeroSection() {
  return (
    <section className="min-h-screen flex justify-center items-center relative overflow-hidden px-4 bg-white">
      {/* 🔹 Background Video with Blur */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 blur-[2px]"
      >
        <source src="/landing-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔹 Subtle floating icons */}
      {floatingIcons.map(({ Icon, top, left, color, size }, index) => (
        <motion.div
          key={index}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [0, -10, 0], opacity: [0, 0.1, 0] }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: index * 0.3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={`absolute z-0 select-none ${color} ${size}`}
          style={{ top, left }}
        >
          <Icon className="w-full h-full" />
        </motion.div>
      ))}

      {/* 🔹 Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl w-full text-center px-6"
      >
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-sm uppercase tracking-widest text-[#706296] mb-4 font-medium drop-shadow-md"
        >
          Pharmacy Finder
        </motion.h3>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight drop-shadow-lg"
        >
          Find <span className="text-[#742690] drop-shadow-md">Medicines</span>{" "}
          Near You
          <br /> in{" "}
          <span className="text-[#1a7a3f] drop-shadow-md">Real-Time</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg text-gray-800 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
        >
          Instantly check availability, compare prices, and locate nearby
          pharmacies with up-to-date stock information.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-10"
        >
          <motion.a
            href="#search"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-[#742690] text-white rounded-md shadow-md hover:shadow-lg transition-all font-medium"
          >
            Search Medicines
          </motion.a>
          <motion.a
            href="#pharmacies"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-white border border-[#209953] text-[#1a7a3f] rounded-md hover:bg-[#209953]/10 transition-all font-medium shadow-md"
          >
            View Pharmacies
          </motion.a>
        </motion.div>

        {/* Bottom Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-6 text-sm text-gray-800 mt-12 drop-shadow-md"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#396190]" />
            <span>Verified Stores</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-[#515191]" />
            <span>Emergency Stocks</span>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-[#946702]" />
            <span>Cold Storage</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
