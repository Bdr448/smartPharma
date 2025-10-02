const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    pharmacyName: { type: String, required: true },
    contact: { type: String, required: true },
    location: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },

    photo: { type: String }, // Single image path string
    description: { type: String },
    expiry: { type: Date }, // ✅ match upload route & frontend
    composition: { type: String },
    alternatives: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medicine", medicineSchema);
