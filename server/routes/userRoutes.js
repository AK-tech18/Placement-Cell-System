const express = require("express");
const router = express.Router();

const { changePassword, logoutAll } = require("../controllers/userController");

router.post("/change-password", changePassword);
router.post("/logout-all", logoutAll);

module.exports = router;