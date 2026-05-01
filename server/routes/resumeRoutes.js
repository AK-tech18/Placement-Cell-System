const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🔥 SAFE UPLOAD
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded ❌" });
    }

    const data = await pdfParse(req.file.buffer);

    if (!data.text) {
      return res.status(400).json({ msg: "Invalid PDF ❌" });
    }

    const text = data.text.toLowerCase();

    let feedback = [];

    if (!text.includes("skills")) {
      feedback.push("Add Skills section");
    }

    if (!text.includes("projects")) {
      feedback.push("Add Projects section");
    }

    if (!text.includes("experience")) {
      feedback.push("Add Experience");
    }

    if (text.length < 800) {
      feedback.push("Resume too short");
    }

    if (feedback.length === 0) {
      feedback.push("Resume looks good ✅");
    }

    res.json({
      feedback: feedback.join(", "),
    });

  } catch (err) {
    console.error("RESUME ERROR:", err);
    res.status(500).json({ msg: "Server error in resume upload ❌" });
  }
});

module.exports = router;