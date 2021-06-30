// ---------------------------------- Doctor's Profile ---------------------------------------


const logger = require("node-color-log");

const express = require("express");
const passport = require("passport");

const response = require("../helper/response");
const routine = require("../helper/routine");

const router = express.Router();

router.route("/")
      .get(async (req, res) => {
         if(req.isUnauthenticated()) {
            logger.error("No Login detected");
            return res.send(response.createResponse(response.type.authFail));
         }
      });

module.exports = router;