const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");

// 🔥 SAFE STORAGE + LIMIT
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

// 🔥 UPLOAD ROUTE
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    console.log("FILE:", req.file); // DEBUG

    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded ❌" });
    }

    // 🔥 TYPE CHECK
    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ msg: "Only PDF allowed ❌" });
    }

    let data;
    try {
      data = await pdfParse(req.file.buffer);
    } catch (pdfErr) {
      console.error("PDF ERROR:", pdfErr);
      return res.status(400).json({ msg: "Invalid or corrupted PDF ❌" });
    }

    if (!data.text || data.text.trim().length === 0) {
      return res.status(400).json({ msg: "Empty PDF content ❌" });
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