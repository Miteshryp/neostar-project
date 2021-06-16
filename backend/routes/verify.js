const express = require("express");
const DB = require("../database");
const response = require("./helper/response");

// Initialise Database.
const options = require("../db_settings.js");
const client_list = DB.getModel(options.client);

const routine = require("./helper/routine");
const logger = require("node-color-log");

const router = express.Router();


router.route("/")
      .post(async(req, res) => {

         let params = req.body; // @TODO: Apply checks on passed params

         // // Duplicate Check
         let checkDuplicate = await routine.verifyRegister(params);
         switch(checkDuplicate.status) {
            case response.type.duplicateEntry:
               res.send(checkDuplicate); // Specific Error already logged in the method
               return;

            case response.type.invalidParameters:
               res.send(checkDuplicate); // Specific Error alreadt logged in the method
               return;
               
            case response.type.validRegistration:
               logger.info("Registration Verification successful");
               break;
         }



         // Checking the OTP
            let checkResponse = await routine.checkOTP(params.phone, params.code);
            logger.debug("OTP Verify - ");
            logger.debug(checkResponse);

            // insert into database if the otp was correct.
            if(checkResponse.status === response.type.verificationSuccess) {
                  // Hashing the password @SECURITY
                  params.password = await routine.hashPassword(params.password);

                  await client_list.insert(params);
                  logger.info("Query Registered in DB");
            }

            res.send(checkResponse);

      });

module.exports = router;