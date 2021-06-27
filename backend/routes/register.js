const express = require("express");
const logger = require("node-color-log");

const response = require("./helper/response");
const routine = require("./helper/routine");

const router = express.Router();


router.route("/")
      .post(async (req, res) => {
         let params = req.body; // This has to be in accordance to the schema

         logger.debug("PARAMS - ");
         logger.debug(params)

         let checkRegistration = await routine.verifyRegister(params)
         logger.debug("------>>> Received from Verify Register <<<-----")
         logger.debug(checkRegistration)
         switch(Number(checkRegistration.status.code) ) {
            case response.type.invalidParameters.code:
               logger.debug("Entered Invalid Params");
               res.send(checkRegistration)
               return;
               break;
            case response.type.verificationFail.code:
               logger.debug("Entered Verification Fail");
               res.send(checkRegistration);
               return;
               break;
            case response.type.duplicateEntry.code:
               logger.debug("Entered Duplicate Entry");
               res.send(checkRegistration);
               return;
            case response.type.verificationSuccess.code:
               console.log("Registration Queued")
               break;

            default: 
               logger.debug(checkRegistration.status.code)
               // Proceed with sending the otp.
         }


         logger.debug(" ----- Out of Switch Case ----");
   
         // Sending the code to the mobile number.
         // @INFO: The code sent is valid for 10 mins

         let otpResponse = await routine.sendOTP(params.phone);
         logger.debug("OTP Response - ");
         logger.debug(otpResponse);
         res.send(otpResponse);
      
      })


module.exports = router;