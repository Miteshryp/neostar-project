const express = require("express")

const router = express.Router();


const login = require("./Client/login");
const register = require("./Client/register");
const verify = require("./Client/verify");
const profile = require("./Client/profile");
const booking = require("./Client/booking");
const payment = require("./payment");


router.use("/login", login);
router.use('/register', register);
router.use('/verify', verify);
router.use("/payment", payment);
router.use("/profile", profile);
router.use("/booking", booking);


module.exports = router;