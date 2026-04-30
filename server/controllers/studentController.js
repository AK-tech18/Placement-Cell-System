const db = require("../config/db");

// SAVE STUDENT PROFILE
exports.saveProfile = (req, res) => {
  const { user_id, cgpa, branch, backlogs } = req.body;

  const sql = `
    INSERT INTO students (user_id, cgpa, branch, backlogs)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
    cgpa = ?, branch = ?, backlogs = ?
  `;

  db.query(
    sql,
    [user_id, cgpa, branch, backlogs, cgpa, branch, backlogs],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Profile Saved Successfully" });
    }
  );
};

// 🔥 ADD THIS
exports.getAllStudents = (req, res) => {
  const sql = `
    SELECT s.id, u.name, u.email, s.branch, s.cgpa, s.backlogs
    FROM students s
    JOIN users u ON s.user_id = u.id
    ORDER BY u.name ASC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
    res.json(result);
  });
};