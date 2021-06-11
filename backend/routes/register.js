const express = require("express");
const DB = require("../database");
const response = require("../response")
const twilio = require("twilio")


// instantiating collection
const options = require("../db_settings.js");
const model = DB.getModel(options.client);

const TWILIO = require("../twilio_creds.js");
const client = twilio(TWILIO.ID, TWILIO.AUTH)


const router = express.Router();


router.route("/")
      .post(async (req, res) => {
         let params = req.body; // This has to be in accordance to the schema

         console.debug("RECEIVED in POST: \n" + params);

         if(params.name === undefined || params.phone === undefined || params.email === undefined) {
            // ERROR: the request data is invalid 
            console.error("Undefined Arguments Received");
            res.send(response.createResponse(response.type.invalidParameters));
            return;
         }
         
         // Search for the name and phone in the database;
         
         // @TODO: Modularize the 2 checks, else this could become a huge hassel in the future.
         //        We might need to modularize the database model class methods for this to just 
         //        return promises, but then again we might not.
         //        Give this a thought.
         let entry = await model.find({email: params.email});
         if(entry !== undefined && entry !== null) {
            // The given phone and name already exists.
            console.error("ERROR: The Email Already exists in the database." + entry)
            res.send(response.createResponse(response.type.duplicateEntry));
            return;
         }
         entry = await model.find({phone: params.phone});
         if(entry !== undefined && entry !== null) {
            // The phone number is already registered.
            console.error("ERROR: The phone number has already been registered");
            res.send(response.createResponse(response.type.duplicateEntry));
            return;
         }
   
   
         // Sending the code to the mobile number.
         // @INFO: The code sent is valid for 10 mins

         await client.verify.services(TWILIO.SERVICE_ID)
         .verifications
         .create({to: params.phone, channel: 'sms' })

         .then( async (verification) => {
            // console.log("Success! Code sent: \n ID:" + verification.sid)
            let response_data = response.type.sentCodeSucess;
            response_data.msg = "Successfully sent the code to the phone: " + params.phone;
            console.debug(response_data.msg);

            res.send(response.createResponse(response_data));
            return;
         })

         .catch( (err) => {
            // @TODO: Log these errors better
            if(err) {
               console.error("ERROR: Failed to sent the code");
               console.error(err);
               res.send(response.createResponse(response.type.sentCodeFail));
            }
            else console.log("Code Sent");
         });
      
      })


module.exports = router;





// Sends a sms to the number with a random code.

// await client.verify.services('VA5fc886048f0c889d170b2b4776856b63')
// .verifications
// .create({to: '+919165257248', channel: 'sms' })
// .then(verification => console.log("Success " + verification.sid))


// Checks for the supplied code.

// await client.verify.services('VA5fc886048f0c889d170b2b4776856b63')
// .verificationChecks
// .create({to : '+919165257248', code: '454218'})
// .then(verification_check => console.log("Status: " + verification_check.status));
