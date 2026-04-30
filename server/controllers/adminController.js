const db = require("../config/db");

// ➕ ADD JOB
exports.addJob = (req, res) => {
  const {
    title,
    company,
    min_cgpa,
    allowed_branches,
    max_backlogs,
    recruiter_id,
  } = req.body;

  const sql = `
    INSERT INTO jobs (title, company, min_cgpa, allowed_branches, max_backlogs, recruiter_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, company, min_cgpa, allowed_branches, max_backlogs, recruiter_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Job added successfully" });
    }
  );
};

// 📄 GET ALL APPLICATIONS
exports.getAllApplications = (req, res) => {
  const sql = `
    SELECT a.id, j.title, j.company, u.name AS student, a.status
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    JOIN students s ON a.student_id = s.id
    JOIN users u ON s.user_id = u.id
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// 🔄 UPDATE STATUS
exports.updateApplicationStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = "UPDATE applications SET status = ? WHERE id = ?";

  db.query(sql, [status, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ msg: "Status updated" });
  });
};