const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🔥 UPLOAD + ANALYZE
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const data = await pdfParse(req.file.buffer);
    const text = data.text.toLowerCase();

    let feedback = [];

    // 🔥 BASIC CHECKS
    if (!text.includes("projects")) {
      feedback.push("Add Projects section");
    }

    if (!text.includes("skills")) {
      feedback.push("Add Skills section");
    }

    if (!text.includes("experience")) {
      feedback.push("Add Experience / Internship");
    }

    if (text.length < 1000) {
      feedback.push("Resume is too short");
    }

    if (feedback.length === 0) {
      feedback.push("Resume looks good ✅");
    }

    res.json({
      feedback: feedback.join(", "),
    });

  } catch (err) {
    res.status(500).json({ msg: "Error processing resume" });
  }
});

module.exports = router;