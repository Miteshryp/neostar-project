const { response } = require("express");
const express = require("express")

const response = require("../helper/response");


let router = express.Router();


router.route("/")

   .get( (req, res) => {
      if(req.isAuthenticated()) {
      }
   })