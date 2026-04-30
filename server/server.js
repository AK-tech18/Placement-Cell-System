require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// 🔥 GLOBAL DEBUG (optional but useful)
app.use((req, res, next) => {
  console.log("HIT:", req.method, req.url);
  next();
});

app.use(cors());
app.use(express.json());

// 🔥 ROUTES IMPORT
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

// 🔥 ROUTES USE
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// 🔥 TEST ROUTE (CHECK SERVER)
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// 🔥 EXTRA TEST
app.get("/api/jobs/test", (req, res) => {
  res.send("Jobs route working ✅");
});

// 🔥 IMPORTANT (RENDER PORT FIX)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});