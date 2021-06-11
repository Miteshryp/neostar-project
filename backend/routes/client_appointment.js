const express = require("express");
const DB = require("../database");
const options = require("../db_settings"); 

let appointment_list = DB.getModel(options.appointment);

let router = express.Router();


router.route("/")
      .post(async (req, res) => {
         let params = req.body;

         let entry = await appointment_list.find({email: params.email})
      })


module.exports = router;