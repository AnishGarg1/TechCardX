const express = require("express");
const { signup, login, sendToken, verifyToken, checkUsername } = require("../controllers/Auth");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/send-token", sendToken);
router.get("/verify/:token", verifyToken);
router.get("/check-username/:username", checkUsername);

module.exports = router;