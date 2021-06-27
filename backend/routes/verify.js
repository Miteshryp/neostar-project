const express = require("express");
const DB = require("../database");
const passport = require("../passport");
const response = require("./helper/response");

// Initialise Database.
const options = require("../db_settings.js");


const routine = require("./helper/routine");
const logger = require("node-color-log");
const { ReservationList } = require("twilio/lib/rest/taskrouter/v1/workspace/task/reservation");

const router = express.Router();


router.route("/")
      .post(async(req, res) => {

         const Client = DB.getModel(options.client);
         let params = req.body; // @TODO: Apply checks on passed params

         // // Duplicate Check
         let checkDuplicate = await routine.verifyRegister(params, req, res);
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
               let reg_response = await Client.insert(params);

               if(!reg_response) {
                  // The registration failed.
                  // @TODO - Handle the different types of error for registration.
                  return res.send(response.createResponse(response.type.invalidRegistration));
               }
            
               // The registration was successful. authenticate the user
               await passport.authenticate("local", (user, err, info) => {
                  if(err) {
                     logger.error("Authenticatoin Error");
                     return res.send(response.createResponse(response.type.verificationFail));
                  }


                  logger.info("Authentication Successful");
                  req.login(user, (err) => {  
                     if(err) {
                        logger.error("Session creation failed");
                        return res.send(response.createResponse(response.type.verificationFail));
                     }
                     logger.info("Session successfully created");
                     return res.send(response.createDataResponse(routine.hideCredentials(params), response.type.verificationSuccess));
                  })
               })(req, res, (err) => {
                  logger.error(err);
               });       

               
               return;        
            
         }

         res.send(checkResponse);

      });

module.exports = router;