const express = require("express");
const logger = require("node-color-log");

const response = require("./helper/response");
const routine = require("./helper/routine");

const router = express.Router();


router.route("/")
      .post(async (req, res) => {
         let params = req.body; // This has to be in accordance to the schema


         let checkRegistration = await routine.verifyRegister(params)
         switch(checkRegistration.status) {
            case response.type.invalidParameters:
               res.send(checkRegistration)
               return;
               break;
            case response.type.verificationFail:
               res.send(checkRegistration);
               return;
               break;
            case response.type.verificationSuccess:
               console.log("Registration Queued")
               break;
               // Proceed with sending the otp.
         }
   
         // Sending the code to the mobile number.
         // @INFO: The code sent is valid for 10 mins

         let otpResponse = await routine.sendOTP(params.phone);
         logger.debug("OTP Response - ");
         logger.debug(otpResponse);
         res.send(otpResponse);
      
      })


module.exports = router;