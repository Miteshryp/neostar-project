const express = require("express");
const logger = require("node-color-log");

const response = require("../helper/response");


let router = express.Router();


router.route("/")
   .get( (req, res) => {
      if(req.isUnauthenticated()) {
         logger.error("Login could not be detected.");
         res.send(response.createResponse(response.type.signinFail));
         return;
      }

      logger.debug("Login Detected");
      return res.send(req.user);
   })