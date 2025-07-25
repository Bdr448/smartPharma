import { motion } from "framer-motion";

export default function Profile() {
  return (
    <div className="min-h-screen pt-28 px-6 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-300 to-white text-transparent bg-clip-text mb-6 text-center">
          Your Profile
        </h2>

        <form className="space-y-6">
          <div>
            <label className="text-sm text-gray-300">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-white/10 border border-gray-600 text-white rounded-lg focus:outline-none"
              value="John Doe"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-white/10 border border-gray-600 text-white rounded-lg focus:outline-none"
              value="john@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold"
          >
            Update Profile
          </button>
        </form>
      </motion.div>
    </div>
  );
}
