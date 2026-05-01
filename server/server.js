const express = require("express");
const cors = require("cors");

const app = express();

// 🔥 GLOBAL DEBUG (VERY IMPORTANT)
app.use((req, res, next) => {
  console.log("HIT:", req.method, req.url);
  next();
});

app.use(cors());
app.use(express.json());

// 🔥 SAFE IMPORTS (avoid inline require issues)
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

// 🔥 ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// 🔥 TEST ROUTE (CONFIRM SERVER RUNNING)
app.get("/", (req, res) => {
  res.send("API Running");
});

// 🔥 EXTRA TEST (CONFIRM JOB ROUTES MOUNTED)
app.get("/api/jobs/test", (req, res) => {
  res.send("Jobs route working ✅");
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});