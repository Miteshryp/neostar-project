const express = require("express");

const response = require("./helper/response");
const routine = require("./helper/routine");
const logger = require("node-color-log");

const passport = require("passport")

let router = express.Router();


router.route('/')
      .get((req, res) => {

         if(req.isAuthenticated()) {
            logger.info("User already Authenticated.")
            logger.debug(req.user);
            return res.send(response.createDataResponse(req.user, response.type.signinSuccess));
         }
         else {
            logger.warn("User is not Authenticated. Signin Failed");
            logger.debug(req.session);
            return res.send(response.createResponse(response.type.signinFail));
         }
      })
      .post(async (req, res) => {

         let params = req.body;
         let response = await routine.verifySignIn(params, req, res);

         logger.debug("\n\n******** Signin Routing END ********\n\n");

      })
   
module.exports = router;