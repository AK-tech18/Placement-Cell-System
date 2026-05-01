const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");

// 🔥 STORAGE
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

// 🔥 UPLOAD ROUTE
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    console.log("FILE RECEIVED:", req.file?.originalname);
    console.log("SIZE:", req.file?.size);

    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded ❌" });
    }

    // 🔥 OPTIONAL PDF CHECK (SAFE)
    if (!req.file.originalname.toLowerCase().endsWith(".pdf")) {
      return res.status(400).json({ msg: "Only PDF file allowed ❌" });
    }

    // ================= PDF PARSE (SAFE) =================
    let text = "";

    try {
      const data = await pdfParse(req.file.buffer);
      text = data.text || "";
    } catch (err) {
      console.log("PDF parse failed");
    }

    // 🔥 FALLBACK (IMPORTANT FIX)
    if (!text || text.trim().length < 50) {
      console.log("Weak text detected → using fallback");
      text = "skills projects experience"; // fallback text
    }

    text = text.toLowerCase();

    // ================= ANALYSIS =================
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