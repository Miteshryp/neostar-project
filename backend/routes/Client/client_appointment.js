const express = require("express");
const DB = require("../../database");
const options = require("../../db_settings"); 

const routine = require("../helper/routine");
// const appointment_list = DB.getModel(options.appointment);

let router = express.Router();


router.route("/")
      .post(async (req, res) => {
         let params = req.body;

      })


module.exports = router;