const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password@18",
  database: "placement_db"
});

db.connect((err) => {
  if (err) {
    console.log("DB Error ❌:", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

module.exports = db;