const express = require("express");
const DB = require("../database");
const twilio = require("twilio");
const response = require("../response");
const _ = require("lodash");

// Initialise Database.
const options = require("../db_settings.js");
const client_list = DB.getModel(options.client);

// Connect to Twilio client
let TWILIO = require("../twilio_creds.js");
const client = twilio(TWILIO.ID, TWILIO.AUTH);



const router = express.Router();


router.route("/")
      .post(async(req, res) => {

         let params = req.body; // @TODO: Apply checks on passed params

         // Duplicate Check
         let entry = await client_list.find({phone: params.phone});
         if(entry !== undefined && entry !== null) {
            // The phone number already exists.
            console.error("Invalid verification request: The number " + params.phone + " is already verified and stored in the database with the email " + entry.email);
            
            res.send(response.createResponse(response.type.duplicateEntry));
            return;
         }


         // Checking the OTP
         await client.verify.services(TWILIO.SERVICE_ID).verificationChecks
            .create({to : params.phone, code: params.code})
            .then( async (verification_check) => {
               console.debug("Status: " + verification_check.status);

               // checking the otp
               if(verification_check.status === "approved") {
                  // Verification successful! Insert the name and phone into the database 
                  await client_list.insert(params);
                  console.log("Verification SUCCESSFUL ")
                  res.send(response.createResponse(response.type.verificationSuccess));
                  console.log("RESPONDED SUCCESS")
               }  
               else {
                  // OTP verification failed
                  console.error("Verification FAILED");
                  res.send(response.createResponse(response.type.verificationFail));
                  console.log("RESPONDED FAIL");
               }
            })
            .catch( async (err) => {
               switch(err.code) {
                  case 22114: console.log("ERROR - Incorrect Code Entered");
                              res.send(response.createResponse(response.type.verificationFail));
                              break;
                  case 20404: console.log("ERROR - verification request refused. Did you already approve the code?");
                              res.send(response.createResponse(response.type.otpExpired));
               }
            });
      });

module.exports = router;