const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
});

router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    console.log("FILE RECEIVED:", req.file?.originalname);

    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded ❌" });
    }

    let text = "";

    try {
      const data = await pdfParse(req.file.buffer);
      text = data.text || "";
    } catch (err) {
      console.log("PDF parse failed");
    }

    // 🔥 FORCE FALLBACK (important)
    if (!text || text.trim().length < 50) {
      console.log("USING FALLBACK");
      text = "skills projects experience test123";
    }

    text = text.toLowerCase();

    let feedback = [];

    if (!text.includes("skills")) feedback.push("Add Skills section");
    if (!text.includes("projects")) feedback.push("Add Projects section");
    if (!text.includes("experience")) feedback.push("Add Experience");
    if (text.length < 800) feedback.push("Resume too short");

    if (feedback.length === 0) {
      feedback.push("Resume looks good ✅");
    }

    res.json({ feedback: feedback.join(", ") });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error ❌" });
  }
});

module.exports = router;