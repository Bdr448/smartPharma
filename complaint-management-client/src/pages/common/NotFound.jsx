import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
      <motion.h1
        className="text-6xl font-extrabold bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.h1>
      <p className="text-gray-400 text-lg mt-4 mb-6">
        Page not found. You seem lost in space.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
      >
        Go to Home
      </Link>
    </div>
  );
}
