const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

// ====== Middlewares ======
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form-data

// ====== Serve static files for uploaded images ======
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // ✅ ensures image is directly accessible

// ====== Health check ======
app.get("/", (req, res) => res.send("✅ Server is live"));

// ====== Routes ======
const uploadRoute = require("./routes/upload");
app.use("/api/upload", uploadRoute);

const searchRoute = require("./routes/search");
app.use("/api/search", searchRoute);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const medicineRoutes = require("./routes/medicine");
app.use("/api/medicines", medicineRoutes);

// ====== DB Connection + Start Server ======
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(
        `📂 Serving images at: http://localhost:${PORT}/uploads/<filename>`
      );
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
