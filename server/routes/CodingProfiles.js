const express = require("express");
const { saveUsernames } = require("../controllers/CodingProfile");
const router = express.Router();

// Save Username
router.post("/saveUsernames", saveUsernames);

module.exports = router;