const express = require("express");
const { TaskRouterGrant } = require("twilio/lib/jwt/AccessToken");

const router = express.Router();

const login = require("./Doctor/login");
const profile = require("./Doctor/profile");
const appointment = require("./Doctor/appointment");

router.use("/login", login);
router.use("/appointment", appointment);
router.use("/profile", profile);

module.exports = router;