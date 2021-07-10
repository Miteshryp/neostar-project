// -------------------------------- Doctor's Login ----------------------------------------

const logger = require("node-color-log")
const express = require("express");
const response = require("../helper/response");

const router = express.Router();

router.route("/")
      .get(async (req,res) => {
         if(req.isUnauthenticated()){
            logger.warn("Login not detected");
            return res.send(response.createResponse(response.type.signinFail));
         }

         //  @TODO: Some attribute of doctor schema that identifies
         // the logged in account as a doctor has to be 
         // checked here
      });


module.exports = router;