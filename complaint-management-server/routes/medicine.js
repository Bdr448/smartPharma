// routes/medicine.js
const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");

// ✅ Add new medicine
router.post("/", async (req, res) => {
  try {
    const newMedicine = new Medicine(req.body);
    const savedMedicine = await newMedicine.save();
    res.status(201).json(savedMedicine);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding medicine" });
  }
});

// ✅ Get all medicines
router.get("/", async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching medicines" });
  }
});

// ✅ Get medicine by ID
router.get("/:id", async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res.json(medicine);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update medicine
router.put("/:id", async (req, res) => {
  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res.json(updatedMedicine);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating medicine" });
  }
});

// ✅ Delete medicine
router.delete("/:id", async (req, res) => {
  try {
    const deletedMedicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!deletedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    res.json({ message: "Medicine deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting medicine" });
  }
});

module.exports = router;
