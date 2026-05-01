require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./config/db"); // ✅ DB connect

const app = express();

// 🔥 DEBUG LOG
app.use((req, res, next) => {
  console.log("HIT:", req.method, req.url);
  next();
});

// 🔥 MIDDLEWARE
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// ================= ROUTES =================
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const resumeRoutes = require("./routes/resumeRoutes"); // 🔥 NEW

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/resume", resumeRoutes); // 🔥 NEW

// ================= TEST ROUTES =================
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/api/jobs/test", (req, res) => {
  res.send("Jobs route working ✅");
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({ msg: "Internal Server Error" });
});

// ================= PORT =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});