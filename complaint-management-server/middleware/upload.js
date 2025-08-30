// middleware/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 📂 uploads फोल्डर ensure करें
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// 📦 Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, Date.now() + "-" + safeName);
  },
});

// 🛡 File filter (ext + mimetype दोनों चेक)
const fileFilter = (req, file, cb) => {
  const allowedExt = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (allowedExt.test(ext) && allowedExt.test(mime)) {
    cb(null, true);
  } else {
    cb(
      new Error("❌ Only image files (jpeg, jpg, png, gif) are allowed"),
      false
    );
  }
};

module.exports = multer({ storage, fileFilter });
