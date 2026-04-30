const db = require("../config/db");

// ================= CREATE JOB =================
exports.createJob = (req, res) => {
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
      res.json({ msg: "Job Created Successfully" });
    }
  );
};

// ================= GET ELIGIBLE JOBS =================
exports.getEligibleJobs = (req, res) => {
  const studentId = req.params.id;

  db.query(
    "SELECT * FROM students WHERE id=?",
    [studentId],
    (err, studentResult) => {
      if (err) return res.status(500).json(err);
      if (studentResult.length === 0) return res.json([]);

      const student = studentResult[0];

      db.query("SELECT * FROM jobs", (err, jobs) => {
        if (err) return res.status(500).json(err);

        const eligibleJobs = jobs.filter((job) => {
          const branches = job.allowed_branches
            .split(",")
            .map((b) => b.trim());

          return (
            student.cgpa >= job.min_cgpa &&
            student.backlogs <= job.max_backlogs &&
            branches.includes(student.branch)
          );
        });

        res.json(eligibleJobs);
      });
    }
  );
};

// ================= APPLY JOB =================
exports.applyJob = (req, res) => {
  const { student_id, job_id } = req.body;

  if (!student_id || !job_id) {
    return res.status(400).json({ msg: "Missing data" });
  }

  const checkSql = `
    SELECT * FROM applications 
    WHERE student_id = ? AND job_id = ?
  `;

  db.query(checkSql, [student_id, job_id], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length > 0) {
      return res.json({ msg: "Already Applied" });
    }

    const insertSql = `
      INSERT INTO applications (student_id, job_id)
      VALUES (?, ?)
    `;

    db.query(insertSql, [student_id, job_id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Applied Successfully" });
    });
  });
};

// ================= GET APPLIED JOBS =================
exports.getAppliedJobs = (req, res) => {
  const student_id = req.params.id;

  const sql = `
    SELECT j.id as job_id, j.title, j.company, a.status
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    WHERE a.student_id = ?
  `;

  db.query(sql, [student_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};