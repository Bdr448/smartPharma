// 📦 Upload Route
const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");
const upload = require("../middleware/upload"); // middleware for image upload

// 🔹 Test Route
router.get("/test", (req, res) => {
  res.send("✅ Upload route working");
});

// 🔹 Upload Medicine (POST with image)
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const {
      name,
      pharmacyName,
      contact,
      location,
      stock,
      price,
      description,
      expiry,
      composition,
      alternatives,
    } = req.body;

    // Basic validation
    if (!name || !pharmacyName || !contact || !location || !stock || !price) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled" });
    }

    // ✅ Save uploaded image path to `photo` (schema field)
    const photo = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.photo || "";

    const newMedicine = new Medicine({
      name,
      pharmacyName,
      contact,
      location,
      stock: Number(stock || 0),
      price: Number(price || 0),
      photo, // ✅ match schema field
      description,
      expiry: expiry ? new Date(expiry) : null,
      composition,
      alternatives: alternatives
        ? Array.isArray(alternatives)
          ? alternatives
          : alternatives.split(",").map((a) => a.trim())
        : [],
    });

    await newMedicine.save();

    res.status(201).json({
      message: "✅ Medicine uploaded successfully",
      medicine: newMedicine,
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ error: "❌ Server error while uploading" });
  }
});

// 🔹 Get All Medicines (GET)
router.get("/", async (req, res) => {
  try {
    const medicines = await Medicine.find().sort({ createdAt: -1 });
    res.status(200).json(medicines);
  } catch (error) {
    console.error("❌ Fetch error:", error);
    res.status(500).json({ error: "❌ Server error while fetching medicines" });
  }
});

module.exports = router;
