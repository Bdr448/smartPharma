"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Availability({ medicines = [] }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filter, setFilter] = useState("All");

  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [loadingMedicine, setLoadingMedicine] = useState(false);

  const isLoading = medicines.length === 0;

  useEffect(() => {
    if (medicines.length > 0) {
      const el = document.getElementById("availability");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [medicines]);

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filtered = medicines.filter((m) => {
    if (filter === "Available") return m.stock > 0;
    if (filter === "Out of Stock") return m.stock <= 0;
    return true;
  });

  const sortedMedicines = [...filtered].sort((a, b) => {
    const valA = (a[sortKey] || "").toString().toLowerCase();
    const valB = (b[sortKey] || "").toString().toLowerCase();
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // ✅ Row click fetch function
  const fetchMedicineDetails = async (id) => {
    try {
      setLoadingMedicine(true);
      const res = await axios.get(`/api/medicines/${id}`);
      setSelectedMedicine(res.data);
    } catch (err) {
      console.error("Error fetching medicine:", err);
    } finally {
      setLoadingMedicine(false);
    }
  };

  const LoadingRow = () => (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <tr key={i} className="animate-pulse">
          <td className="py-3">
            <div className="h-4 w-32 bg-[#d8d1ea]/30 rounded" />
          </td>
          <td className="py-3">
            <div className="h-4 w-40 bg-[#d8d1ea]/30 rounded" />
          </td>
          <td className="py-3">
            <div className="h-4 w-24 bg-[#d8d1ea]/30 rounded" />
          </td>
        </tr>
      ))}
    </>
  );

  return (
    <section
      id="availability"
      ref={ref}
      className="py-24 px-4 text-[#2c2c3d] bg-gradient-to-br from-[#f8f5fc] to-[#e9e4f4]"
    >
      <motion.h1
        className="text-4xl font-extrabold text-center mb-10 text-transparent bg-gradient-to-r from-[#5f529c] via-[#8b78c4] to-[#5f529c] bg-clip-text"
        initial={{ opacity: 0, y: -30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Medicine Availability Status
      </motion.h1>

      {/* Filter */}
      <div className="mb-6 max-w-4xl mx-auto flex justify-end">
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none px-4 py-2 pr-10 bg-white/40 text-[#3e3662] rounded-md shadow-sm border border-[#cabfe4] backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#9b84ca]"
          >
            <option>All</option>
            <option>Available</option>
            <option>Out of Stock</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5c4d99]">
            ▼
          </div>
        </div>
      </div>

      {/* Table */}
      <motion.div
        className="bg-white/50 backdrop-blur-xl border border-[#dcd3ef] rounded-xl p-6 shadow-lg max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
      >
        <table className="w-full text-left">
          <thead>
            <tr className="text-[#5c4d99] border-b border-[#cec3ec] cursor-pointer select-none">
              <th className="pb-3" onClick={() => handleSort("name")}>
                Medicine{" "}
                {sortKey === "name" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="pb-3" onClick={() => handleSort("pharmacyName")}>
                Pharmacy{" "}
                {sortKey === "pharmacyName" &&
                  (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th className="pb-3" onClick={() => handleSort("stock")}>
                Availability{" "}
                {sortKey === "stock" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <LoadingRow />
            ) : sortedMedicines.length > 0 ? (
              sortedMedicines.map((m) => (
                <tr
                  key={m._id}
                  className="hover:bg-white/20 transition cursor-pointer"
                  onClick={() => fetchMedicineDetails(m._id)}
                >
                  <td className="py-2">{m.name}</td>
                  <td className="py-2">{m.pharmacyName}</td>
                  <td className="py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        m.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {m.stock > 0 ? "Available" : "Out of Stock"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-4 text-center text-gray-500">
                  No medicines found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMedicine && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={() => setSelectedMedicine(null)}
              >
                ✖
              </button>

              {loadingMedicine ? (
                <p>Loading...</p>
              ) : (
                <>
                  <img
                    src={
                      selectedMedicine.photo
                        ? `http://localhost:5000${selectedMedicine.photo}`
                        : "/medicine.jpg"
                    }
                    alt={selectedMedicine.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedMedicine.name}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {selectedMedicine.description}
                  </p>
                  <div className="space-y-2">
                    <p>
                      <strong>Expiry Date:</strong>{" "}
                      {selectedMedicine.expiryDate}
                    </p>
                    <p>
                      <strong>Composition:</strong>{" "}
                      {selectedMedicine.composition}
                    </p>
                    <p>
                      <strong>Alternatives:</strong>{" "}
                      {(selectedMedicine.alternatives || []).join(", ")}
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
