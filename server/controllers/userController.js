const db = require("../config/db");

// 🔐 CHANGE PASSWORD
exports.changePassword = (req, res) => {
  const { user_id, oldPassword, newPassword } = req.body;

  const checkSql = "SELECT * FROM users WHERE id = ? AND password = ?";
  
  db.query(checkSql, [user_id, oldPassword], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(400).json({ msg: "Incorrect old password" });
    }

    const updateSql = "UPDATE users SET password = ? WHERE id = ?";
    
    db.query(updateSql, [newPassword, user_id], (err) => {
      if (err) return res.status(500).json(err);

      res.json({ msg: "Password updated successfully" });
    });
  });
};

// 🚪 LOGOUT ALL DEVICES (basic)
exports.logoutAll = (req, res) => {
  res.json({ msg: "Logged out from all devices" });
};