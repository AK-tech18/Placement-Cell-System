const express = require("express");
const router = express.Router();

const db = require("../config/db");
const { getAllStudents } = require("../controllers/studentController");

// ================= GET ALL STUDENTS =================
router.get("/", getAllStudents);

// ================= UPDATE SKILLS =================
router.put("/update-skills/:id", (req, res) => {
  const { skills } = req.body;
  const studentId = req.params.id;

  if (!skills) {
    return res.status(400).json({ msg: "Skills required" });
  }

  db.query(
    "UPDATE students SET skills=? WHERE id=?",
    [skills, studentId],
    (err) => {
      if (err) {
        console.log("Update Skills Error:", err);
        return res.status(500).json({ msg: "Server error" });
      }

      res.json({ msg: "Skills updated successfully ✅" });
    }
  );
});

// ================= GET SINGLE STUDENT =================
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM students WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
});

module.exports = router;