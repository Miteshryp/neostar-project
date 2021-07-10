const logger = require("node-color-log");
const express = require("express");

const response = require("./helper/response");

const router = express.Router();


router.route("/")
      .get((req, res) => {
          if(req.isUnauthenticated()) {
            logger.error("User logout could not go through.");
            return res.send(response.createResponse(response.type.logoutFail));
         }

         req.logout();
         logger.warn("User logged out.");
         return res.send(response.createResponse(response.type.logoutSuccess));
      })



module.exports = router;