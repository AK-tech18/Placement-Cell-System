const db = require("../config/db");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = (req, res) => {
  const { name, email, password, role } = req.body;

  const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, password, role], (err, result) => {
    if (err) {
      console.log("REGISTER ERROR:", err);
      return res.status(500).json({ msg: "DB error" });
    }

    res.json({ msg: "User Registered Successfully" });
  });
};

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Missing email or password" });
  }

  db.query("SELECT * FROM users WHERE email=?", [email], (err, result) => {
    if (err) {
      console.log("LOGIN DB ERROR:", err);
      return res.status(500).json({ msg: "DB error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ msg: "User not found" });
    }

    const user = result[0];

    if (user.password !== password) {
      return res.status(401).json({ msg: "Wrong password" });
    }

    const token = "dummy-token";

    // 🔥 GET STUDENT ID (FIXED)
    db.query(
      "SELECT id FROM students WHERE user_id=?",
      [user.id],
      (err2, studentResult) => {

        if (err2) {
          console.log("STUDENT FETCH ERROR:", err2);
          return res.status(500).json({ msg: "Student fetch error" });
        }

        let student_id = null;

        if (studentResult.length > 0) {
          student_id = studentResult[0].id;
        }

        // ✅ FINAL RESPONSE
        res.json({
          token,
          user: {
            ...user,
            student_id: student_id
          }
        });
      }
    );
  });
};