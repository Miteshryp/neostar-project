const TWILIO = {
   ID: process.env.TWILIO_ID,
   AUTH: process.env.TWILIO_AUTH,
   SERVICE_ID: process.env.TWILIO_SERVICE_ID
}

const twilio  = require("twilio");
const client = twilio(TWILIO.ID, TWILIO.AUTH);

const response = require("./response");

const options = require("../../db_settings");
const DB = require("../../database");
const client_list = DB.getModel(options.client);
const appointment_list = DB.getModel(options.appointment);

const logger = require("node-color-log");
const bcrypt = require("bcrypt");




// // // // // // //
//
//  Hash Functions
//
// // // // // // //

async function hashPassword(password) {
   let hash = await bcrypt.hash(password, (Number)(process.env.DB_SALT_ROUNDS));
   return hash;
}





// // // // // // // 
//                
// Sign In        
//                
// // // // // // //


function isValidSignin(params) {
   return !( params.email === undefined || params.email === null
          || params.password === undefined || params.password === null
          );
}


// @BUG: There are 2 verifySignIn process going when we confirm the OTP.
//       One of them is always failing saying the number has not been registered.
//       Investigate this.

// @BUG: The function returns the hash stored in the database, when it should only
//       send the details.
//       Maybe this will be solved using cookies and sessions.
async function verifySignIn(creds) {

   logger.debug("\n\n********* Signin Routine *********\n\n");

   if(!isValidSignin(creds)) {
      // ERROR: the request data is invalid
      logger.error("Signin request parameters are corrupted.");
      logger.debug("\n\n******** Signin Routing END ********\n\n");
      return response.createResponse(response.type.invalidParameters);
   }

   logger.debug("Credentials Passed: ");
   logger.debug(creds);
   
   
   // Credentials check

   let entry = await client_list.find({email: creds.email});
   if(entry === undefined || entry === null) {
      // Phone number not found in the database, i.e. hasn't been registered yet.

      logger.error("The Phone Number has not been registered yet.");
      logger.debug("\n\n******** Signin Routing END ********\n\n");
      return response.createResponse(response.type.signinFail);
   }


   // @TODO: Some other credential checks in the future.
   //Password check
   let result = await checkPassword(creds.password, entry.password); // Checking the password with security features.
   
   if(!result) {
      logger.error("ERROR: Incorrect Password");
      logger.debug("\n\n******** Signin Routing END ********\n\n");
      // @TODO: return specific signin error: we should get to know which field was incorrect.
      return response.createResponse(response.type.signinFail);
   }

   logger.debug("Correct Creds: Match Found ->");
   logger.debug(entry);


   logger.debug("\n\n******** Signin Routing END ********\n\n");

   // All the checks are survived, meaning the credentials are correct
   return response.createDataResponse(entry, response.type.signinSuccess);
}


async function checkPassword(password, hash) {
   let result = await  bcrypt.compare(password, hash);
   logger.debug("RESULT: " + result)
   return result;
}













// // // // // // // // 
//                 
// Registration    
//                 
// // // // // // // //

function isValidRegister(params) {
   if(params.name === undefined || params.name === null
   || params.phone === undefined || params.phone === null
   || params.email === undefined || params.email === null) {
      // ERROR: the request data is invalid 
      console.error("Undefined / Null Arguments Received");
      return false;
   }
   return true;
}


async function verifyRegister(creds) {
   if(!isValidRegister(creds)) {
      // ERROR: the request data is invalid 
      return response.createResponse(response.type.invalidParameters);
   }
   
   // Search for the name and phone in the database;
   
   // @TODO: Modularize the 2 checks, else this could become a huge hassel in the future.
   //        We might need to modularize the database model class methods for this to just 
   //        return promises, but then again we might not.
   //        Give this a thought.
   let entry = await client_list.find({email: creds.email});
   if(entry !== undefined && entry !== null) {
      // The given phone and name already exists.
      logger.error("The Email Already exists in the database.");
      logger.debug(entry);
      return response.createResponse(response.type.duplicateEntry);
   }

   // @TODO: Decide if the phone number has to be unique to each account.
   entry = await client_list.find({phone: creds.phone});
   if(entry !== undefined && entry !== null) {
      // The phone number is already registered.
      logger.error("The phone number has already been registered");
      return response.createResponse(response.type.duplicateEntry);
   }


   return response.createResponse(response.type.validRegistration);
}















// // // // // // //
//                   
//  OTP System       
//                   
// // // // // // // 

function handleSendError(err) {
   logger.error("The OTP could not be send");
   logger.warn(err);
   return response.createResponse(response.type.sentCodeFail);
}

function handleCheckError(err) {
   switch(err.code) {
      case 22114: logger.error(" Incorrect Code Entered");
                  logger.warn(err)
                  return response.createResponse(response.type.verificationFail);

      case 20404: logger.error("Verification request refused");
                  logger.warn("Did you already approve the code?");
                  return response.createResponse(response.type.otpExpired);

      default: 
               logger.error("Unknown OTP error occurred");
               logger.warn(err);
               return response.createResponse(response.type.verificationFail);
   }
}

async function sendOTP(phone) {
      try {
         let otpResponse = await client.verify.services(TWILIO.SERVICE_ID)
         .verifications
         .create({to: phone, channel: 'sms' });

         logger.info(`OTP sent to ${otpResponse.to}`);
         return response.createResponse(response.type.sentCodeSucess);
      }
      catch(err) {
         return handleSendError(err);
      }
}

async function checkOTP(phone, otp) {
   try {
      let checkResponse = await client.verify.services(TWILIO.SERVICE_ID)
      .verificationChecks
      .create({to: phone, code: otp});

      if(checkResponse.status === "approved") {
         // Verification successful! Insert the name and phone into the database 
         logger.info(`OTP verified: ${phone} - ${otp}`);
         return response.createResponse(response.type.verificationSuccess);
      }  
      else {
         // OTP verification failed
         logger.error("Verification failed");
         res.send(response.createResponse(response.type.verificationFail));
      }
   }
   catch(err) {
      return handleCheckError(err);
   }

}


module.exports = {hashPassword, verifySignIn, verifyRegister, sendOTP, checkOTP}