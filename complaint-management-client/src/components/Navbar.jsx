"use client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 h-16 backdrop-blur-lg bg-white/10 shadow-md border-b border-white/20 px-6 py-3 flex items-center justify-between"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-extrabold bg-gradient-to-r from-[#272290] via-[#706296] to-[#681676] text-transparent bg-clip-text tracking-wider"
      >
        SmartPortal
      </Link>

      {/* Nav Links */}
      <div className="flex items-center space-x-6 font-semibold text-gray-100 relative">
        {/* 👥 CUSTOMER links */}
        {user?.role === "customer" && (
          <>
            <a href="#search" className="hover:text-[#aaa8ff] transition">
              Search
            </a>
            <a href="#availability" className="hover:text-[#aaa8ff] transition">
              Availability
            </a>
          </>
        )}

        {/* 🏪 PHARMACY links */}
        {user?.role === "pharmacy" && (
          <>
            <a
              href="#pharmacy-dashboard"
              className="hover:text-[#aaa8ff] transition"
            >
              Dashboard
            </a>
            <a
              href="#medicine-upload"
              className="hover:text-[#aaa8ff] transition"
            >
              Upload
            </a>
          </>
        )}

        {/* ❌ Not Logged In — Show Login/Register in Navbar */}
        {!user && (
          <>
            <Link to="/login" className="hover:text-[#aaa8ff] transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-[#aaa8ff] transition">
              Register
            </Link>
          </>
        )}

        {/* ✅ Logged In — Show dropdown with Profile + Logout */}
        {user && (
          <>
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-200 hover:text-white p-2 rounded-md border border-white/20 bg-white/5 transition"
            >
              <Menu size={22} />
            </button>

            {open && (
              <div className="absolute right-0 top-12 w-44 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/20 text-sm text-gray-100 py-2 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-white/5 transition"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-white/5 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
