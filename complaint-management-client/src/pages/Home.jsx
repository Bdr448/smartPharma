"use client";
import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Availability from "./Availability";
import MedicineSearch from "./MedicineSearch";
import PharmacyDashboard from "./PharmacyDashboard";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Shared animated section
const AnimatedSection = ({ id, children }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
};

// Text content block
const SectionText = ({ title, paragraph }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="text-center px-6 md:px-20 py-16"
  >
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
      {title}
    </h2>
    <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
      {paragraph}
    </p>
  </motion.div>
);

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="scroll-smooth space-y-0">
        {/* Hero */}
        <AnimatedSection id="hero">
          <HeroSection />
        </AnimatedSection>

        {/* Medicine Search */}
        <AnimatedSection id="search">
          <MedicineSearch />
        </AnimatedSection>

        {/* Between Search & Availability */}
        <SectionText
          title="Find Medicines Instantly"
          paragraph="Search any medicine and instantly check availability at nearby pharmacies. No more walking around in emergencies—get results right from your screen."
        />

        {/* Availability */}
        <AnimatedSection id="availability">
          <Availability />
        </AnimatedSection>

        {/* Between Availability & Dashboard */}
        <SectionText
          title="Live Stock & Location Info"
          paragraph="Know which stores have your medicines, their price, and even directions. Whether it’s urgent or routine, we keep things simple and accurate for you."
        />

        {/* Pharmacy Dashboard */}
        <AnimatedSection id="pharmacy-dashboard">
          <PharmacyDashboard />
        </AnimatedSection>

        {/* Between Dashboard & Footer */}
        <SectionText
          title="Pharmacy Owners, Stay Updated"
          paragraph="Easily manage your medicine stock, respond to user queries, and view analytics on most searched medicines. Smart tools for smart store management."
        />

        {/* Footer */}
        <footer className="py-20 bg-[#111] text-gray-400 text-center">
          © 2025 SmartPortal. All rights reserved.
        </footer>
      </main>
    </>
  );
};

export default Home;
