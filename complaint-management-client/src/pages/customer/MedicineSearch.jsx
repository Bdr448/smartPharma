"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function MedicineSearch({ onResults }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [minStock, setMinStock] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams({
      name,
      location,
      ...(minStock && { minStock }),
      ...(maxPrice && { maxPrice }),
      ...(onlyAvailable ? { onlyAvailable: true } : {}),
    });

    try {
      const res = await fetch(
        `http://localhost:5000/api/search?${params.toString()}`
      );
      const data = await res.json();
      if (res.ok) {
        onResults(data);
      } else {
        console.error("Error fetching:", data);
        onResults([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      onResults([]);
    }
  };

  return (
    <section
      ref={ref}
      className="py-24 px-4 flex justify-center items-center bg-gradient-to-br from-[#f8f5fc] to-[#ebe6f3]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1 }}
        className="backdrop-blur-md bg-white/60 border border-[#d8d1ea] rounded-2xl p-10 max-w-xl w-full shadow-xl text-[#2c2c3d]"
      >
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl font-extrabold text-center mb-6 text-[#5a4d79]"
        >
          Search for <span className="text-[#6b5ca3]">Medicines</span>
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm text-[#5a4d79]">
              Medicine Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Paracetamol"
              required
              className="w-full px-4 py-2 bg-white border border-[#d3cae4] text-[#2c2c3d] placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a192cc]"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-[#5a4d79]">
              Your Location / Pincode
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter city or pincode"
              className="w-full px-4 py-2 bg-white border border-[#d3cae4] text-[#2c2c3d] placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a192cc]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm text-[#5a4d79]">
                Stock ≥
              </label>
              <input
                type="number"
                value={minStock}
                onChange={(e) => setMinStock(e.target.value)}
                placeholder="e.g. 10"
                className="w-full px-4 py-2 bg-white border border-[#d3cae4] text-[#2c2c3d] rounded-md placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-[#5a4d79]">
                Max Price
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="e.g. 100"
                className="w-full px-4 py-2 bg-white border border-[#d3cae4] text-[#2c2c3d] rounded-md placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="accent-[#6b5ca3]"
            />
            <label className="text-sm text-[#5a4d79]">
              Show only available
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#6b5ca3] hover:bg-[#5c4a91] transition rounded-md text-white font-semibold shadow-md"
          >
            Check Availability
          </button>
        </form>
      </motion.div>
    </section>
  );
}
