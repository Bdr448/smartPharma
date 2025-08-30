const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");

router.get("/", async (req, res) => {
  try {
    const { name, location, minStock, maxPrice, onlyAvailable } = req.query;

    const query = {};

    if (name) query.name = new RegExp(name, "i");
    if (location) query.location = new RegExp(location, "i");
    if (minStock) query.stock = { ...query.stock, $gte: parseInt(minStock) };
    if (maxPrice) query.price = { ...query.price, $lte: parseFloat(maxPrice) };
    if (onlyAvailable === "true") query.stock = { ...query.stock, $gt: 0 };

    const medicines = await Medicine.find(query);
    res.json(medicines);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
