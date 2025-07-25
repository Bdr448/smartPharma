import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/10 shadow-md border-b border-white/20 px-6 py-3 flex items-center justify-between"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Left - Logo */}
      <Link
        to="/"
        className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text tracking-wider"
      >
        SmartPortal
      </Link>

      {/* Right - Section Links + Menu */}
      <div className="flex items-center space-x-4 text-white font-medium relative">
        {/* New Section Links */}
        <a href="#search" className="hover:text-gray-300 transition">
          Search Medicine
        </a>
        <a href="#availability" className="hover:text-gray-300 transition">
          Availability
        </a>
        <a
          href="#pharmacy-dashboard"
          className="hover:text-gray-300 transition"
        >
          Pharmacy Dashboard
        </a>

        {/* Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-white hover:text-gray-300 p-2 rounded-md border border-white/20 bg-white/5 transition"
        >
          <Menu size={22} />
        </button>

        {/* Dropdown Links */}
        {open && (
          <div className="absolute right-0 top-12 w-44 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/20 text-sm text-white py-2 z-50">
            <Link
              to="/profile"
              className="block px-4 py-2 hover:bg-white/5 transition"
            >
              Profile
            </Link>
            <Link
              to="/login"
              className="block px-4 py-2 hover:bg-white/5 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block px-4 py-2 hover:bg-white/5 transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
