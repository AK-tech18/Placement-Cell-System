console.log("🔥 adminRoutes loaded");
const express = require("express");
const router = express.Router();
const db = require("../config/db");

const {
  getAllApplications,
  updateApplicationStatus,
  addJob
} = require("../controllers/adminController");


// ================= EXISTING =================
router.get("/applications", getAllApplications);
router.put("/applications/:id", updateApplicationStatus);
router.post("/jobs", addJob);


// ================= 🔥 ANALYTICS =================

// 📊 STATS (cards)
router.get("/stats", (req, res) => {
  const stats = {};

  db.query("SELECT COUNT(*) AS total FROM students", (e1, r1) => {
    if (e1) return res.status(500).json(e1);
    stats.totalStudents = r1[0].total;

    db.query(
      "SELECT COUNT(*) AS placed FROM applications WHERE status='placed'",
      (e2, r2) => {
        if (e2) return res.status(500).json(e2);
        stats.placedStudents = r2[0].placed;

        db.query(
          "SELECT COUNT(DISTINCT company) AS companies FROM jobs",
          (e3, r3) => {
            if (e3) return res.status(500).json(e3);
            stats.companies = r3[0].companies;

            stats.placementPercent =
              stats.totalStudents === 0
                ? 0
                : Math.round(
                    (stats.placedStudents / stats.totalStudents) * 100
                  );

            res.json(stats);
          }
        );
      }
    );
  });
});


// 📊 BRANCH-WISE PLACEMENT
router.get("/branch-stats", (req, res) => {
  const sql = `
    SELECT s.branch, COUNT(*) as placed
    FROM applications a
    JOIN students s ON a.student_id = s.id
    WHERE a.status = 'placed'
    GROUP BY s.branch
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});


// 📊 STATUS DISTRIBUTION
router.get("/status-stats", (req, res) => {
  const sql = `
    SELECT status, COUNT(*) as count
    FROM applications
    GROUP BY status
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});


module.exports = router;