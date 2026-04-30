const db = require("../config/db");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = (req, res) => {
  const { name, email, password, role } = req.body;
 
  const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, password, role], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ msg: "User Registered Successfully" });
  });
};

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.json({ msg: "User not found" });
    }

    const user = result[0];

    if (user.password !== password) {
      return res.json({ msg: "Wrong password" });
    }

    const token = "dummy-token";

    // 🔥 GET STUDENT ID
    db.query(
      "SELECT id FROM students WHERE user_id=?",
      [user.id],
      (err2, studentResult) => {

        let student_id = null;

        if (studentResult && studentResult.length > 0) {
          student_id = studentResult[0].id;
        }

        // ✅ FINAL RESPONSE
        res.json({
          token,
          user: {
            ...user,
            student_id: student_id // 🔥 IMPORTANT
          }
        });
      }
    );
  });
};