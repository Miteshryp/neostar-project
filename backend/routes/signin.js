const express = require("express");
const DB = require("../database");
const twilio = require("twilio");

let response = require("../response");

let options = require("../db_settings.js"); // database settings
let client_list = DB.getModel(options.client);

let TWILIO = require("../twilio_creds.js");
const { EndUserTypeContext } = require("twilio/lib/rest/numbers/v2/regulatoryCompliance/endUserType");
let client = twilio(TWILIO.ID, TWILIO.AUTH);


let router = express.Router();


function isParamValid(params) {
   return  !(params.email === undefined || params.email === null || params.password === undefined || params.password === null);
}

async function signinVerified(params) {
   if(!isParamValid(params)) {
      // ERROR: the request data is invalid
      console.error("ERROR: Signin request parameters are corrupted.");
      return response.invalidParameters;
   }

   console.debug("PARAMS: ")
   console.debug(params);

   // Check whether the given number is in the client_list
   let entry = await client_list.find({email: params.email});
   if(entry === undefined || entry === null) {
      // Phone number not found in the database, i.e. hasnt been registered yet.
      console.error("The Phone Number has not been registered yet.");
      return response.signinFail;
   }


   // @TODO: Some other credential checks in the future.
   //Password check
   if(params.password !== entry.password) {
      console.error("ERROR: Incorrect Password");

      // @TODO: return specific signin error: we should get to know which field was incorrect.
      return response.type.signinFail;
   }


   // All the checks are survived, meaning the credentials are correct
   return response.type.signinSuccess;
}


router.route('/')
      .post(async (req, res) => {
         // Check the phone number in the list.
         // Return the data if the number is recorded in the database
         // else return the #FRONT_ERROR

         let params = req.body;

         // if(!isParamValid(params)) {
         //    // ERROR: the request data is invalid
         //    console.error("ERROR: Signin request parameters are corrupted.");
         //    res.send(response.invalidParameters);
         // }

         // console.debug("PARAMS: ")
         // console.debug(params);

         // // Check whether the given number is in the client_list
         // let entry = await client_list.find({email: params.email});
         // if(entry === undefined || entry === null) {
         //    // Phone number not found in the database, i.e. hasnt been registered yet.
         //    console.error("The Phone Number has not been registered yet.");
         //    res.send(response.signinFail);
         //    return;
         // }


         // // @TODO: Some other credential checks in the future.
         // //Password check
         // if(params.password !== entry.password) {
         //    console.error("ERROR: Incorrect Password");

         //    // @TODO: return specific signin error: we should get to know which field was incorrect.
         //    res.send(response.createResponse(response.type.signinFail));
         //    return;
         // }


         console.debug("CORRECT CREDENTIALS");
         console.debug("RECEIVED");
         console.debug(entry);

         // Phone number exists.
         console.log("SENDING LOGIN DATA: ")
         console.log(entry);
         res.send(response.createDataResponse(entry, response.type.signinSuccess));
      })
   
module.exports = router;