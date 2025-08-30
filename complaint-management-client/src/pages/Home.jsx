"use client";
import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

// Icons
import { FaSearch, FaStore, FaChartLine, FaArrowRight } from "react-icons/fa";
import { MdEmergency } from "react-icons/md";

// Components
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Availability from "./customer/Availability";
import MedicineSearch from "./customer/MedicineSearch";
import PharmacyDashboard from "../pages/pharmacy/PharmacyDashboard";
import MedicineUpload from "../pages/pharmacy/MedicineUpload";

const AnimatedSection = ({ id, children, className = "" }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  React.useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
    else controls.start({ opacity: 0, y: 30 });
  }, [inView, controls]);

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      className={`scroll-mt-24 w-full ${className}`}
    >
      {children}
    </motion.section>
  );
};

const FeatureCard = ({ icon, title, description, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
  >
    <div className={`text-3xl mb-4 ${color}`}>{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useAuth();

  const features = [
    {
      icon: <FaSearch />,
      title: "Instant Search",
      description: "Find medicines across multiple pharmacies in seconds",
      color: "text-[#272290]",
    },
    {
      icon: <MdEmergency />,
      title: "Emergency Access",
      description: "Critical medicine availability during urgent situations",
      color: "text-[#479863]",
    },
    {
      icon: <FaStore />,
      title: "Pharmacy Locator",
      description: "See nearby stores with directions and contact info",
      color: "text-[#706296]",
    },
    {
      icon: <FaChartLine />,
      title: "Stock Analytics",
      description: "Real-time inventory tracking and demand patterns",
      color: "text-[#681676]",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <HeroSection />

        {/* Registration Promotion Banner */}
        {!user && (
          <AnimatedSection
            id="register-promo"
            className="py-8 bg-gradient-to-r from-[#272290] to-[#479863] px-4"
          >
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  Ready to experience seamless medicine access?
                </h3>
                <p className="text-gray-100">
                  Join thousands of users finding medicines faster
                </p>
              </div>
              <Link
                to="/register"
                className="flex items-center gap-2 px-6 py-3 bg-white text-[#272290] rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                Register Now <FaArrowRight />
              </Link>
            </div>
          </AnimatedSection>
        )}

        {/* Unauthenticated User Content */}
        {!user && (
          <>
            <AnimatedSection id="features" className="py-16 bg-white px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-[#272290] to-[#479863] bg-clip-text text-transparent">
                      Why Choose SmartPharma?
                    </span>
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Bridging the gap between patients and pharmacies with smart
                    technology
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </>
        )}

        {/* Customer Dashboard */}
        {user?.role === "customer" && (
          <>
            <AnimatedSection id="search" className="py-0 bg-white px-0">
              <div className="w-full">
                <MedicineSearch onResults={setSearchResults} />
              </div>
            </AnimatedSection>

            <AnimatedSection
              id="availability"
              className="py-0 bg-gradient-to-b from-white to-gray-50 px-0"
            >
              <div className="w-full">
                <Availability medicines={searchResults} />
              </div>
            </AnimatedSection>
          </>
        )}

        {/* Pharmacy Dashboard */}
        {user?.role === "pharmacy" && (
          <>
            <AnimatedSection
              id="pharmacy-dashboard"
              className="py-0 bg-white px-0"
            >
              <div className="w-full">
                <PharmacyDashboard />
              </div>
            </AnimatedSection>

            <AnimatedSection
              id="medicine-upload"
              className="py-0 bg-gradient-to-b from-white to-gray-50 px-0"
            >
              <div className="w-full">
                <MedicineUpload />
              </div>
            </AnimatedSection>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#272290] text-white py-12 w-full">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">SmartPharma</h3>
              <p className="text-gray-300">
                Connecting healthcare needs with pharmacy solutions
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link to="#features" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="#for-customers" className="hover:text-white">
                    For Patients
                  </Link>
                </li>
                <li>
                  <Link to="#pharmacy-dashboard" className="hover:text-white">
                    For Pharmacies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <p className="text-gray-300">support@smartpharma.com</p>
              <p className="text-gray-300">+91 9876543210</p>
            </div>
          </div>
          <div className="border-t border-[#3a3a8a] mt-8 pt-8 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} SmartPharma. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
