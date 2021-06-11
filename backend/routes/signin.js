const express = require("express");
const DB = require("../database");
const twilio = require("twilio");

let response = require("../response");

let options = require("../db_settings.js"); // database settings
let client_list = DB.getModel(options.client);


let router = express.Router();

function isParamValid(params) {
   return  !(params.email === undefined || params.email === null || params.password === undefined || params.password === null);
}

async function signinVerified(creds) {
   if(!isParamValid(creds)) {
      // ERROR: the request data is invalid
      console.error("ERROR: Signin request parameters are corrupted.");
      return response.invalidParameters;
   }

   console.debug("PARAMS: ");
   console.debug(creds);

   // Check whether the given number is in the client_list
   let entry = await client_list.find({email: creds.email});
   if(entry === undefined || entry === null) {
      // Phone number not found in the database, i.e. hasnt been registered yet.
      console.error("The Phone Number has not been registered yet.");
      return response.createResponse(response.type.signinFail);
   }


   // @TODO: Some other credential checks in the future.
   //Password check
   if(creds.password !== entry.password) {
      console.error("ERROR: Incorrect Password");

      // @TODO: return specific signin error: we should get to know which field was incorrect.
      return response.createResponse(response.type.signinFail);
   }

   console.debug("CORRECT CREDENTIALS");
   console.debug("RECEIVED");
   console.debug(entry);

   // All the checks are survived, meaning the credentials are correct
   return response.createDataResponse(entry, response.type.signinSuccess);
}


router.route('/')
      .post(async (req, res) => {

         let params = req.body;

         let entry = await signinVerified(params);
         if(entry.status !== response.type.signinSuccess) {
            console.error("ERROR: Signin Failed - ")
         }

         console.log("SENDING - ")
         console.log(entry)

         // Phone number exists.
         res.send(entry);
      })
   
module.exports = router;