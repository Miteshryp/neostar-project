const express = require("express")

const router = express.Router();


const login = require("./Client/login");
const register = require("./Client/register");
const verify = require("./Client/verify");
const payment = require("./payment");
const profile = require("./Client/profile");


router.use("/login", login);
router.use('/register', register);
router.use('/verify', verify);
router.use("/payment", payment);
router.use("/profile", profile);


module.exports = router;