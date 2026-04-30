const express = require("express");
const router = express.Router();

console.log("✅ jobRoutes loaded"); // 🔥 debug

const jobController = require("../controllers/jobController");

// 🔥 TEST ROUTE
router.get("/test", (req, res) => {
  res.send("Jobs route working ✅");
});

// CREATE JOB
router.post("/create", jobController.createJob);

// GET ELIGIBLE JOBS
router.get("/eligible/:id", jobController.getEligibleJobs);

// APPLY JOB
router.post("/apply", jobController.applyJob);

// GET APPLIED JOBS
router.get("/applied/:id", jobController.getAppliedJobs);

module.exports = router;