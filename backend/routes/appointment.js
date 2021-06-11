const express = require("express");
const DB = require("../database")

let database = DB.getModel("appointment");


let router = express.Router();


router.route("/")
      .post(async (req, res) => {
         let params = req.body;

         
      })