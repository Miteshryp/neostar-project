const express = require("express");

const response = require("./helper/response");
const routine = require("./helper/routine");
const logger = require("node-color-log");


let router = express.Router();


router.route('/')
      .post(async (req, res) => {

         let params = req.body;

         logger.debug("PARAMS: ");
         logger.debug(params);

         let entry = await routine.verifySignIn(params); // verifySignIn returns the data
                                                         //  response if sign in was successful
         if(entry.status !== response.type.signinSuccess) {
            console.error("ERROR: Signin Failed - ");
            res.send(entry); // If sign in fails, we have a error response here.
            return;
         }

         console.log("SENDING - ")
         console.log(entry);

         // Sign in Successful, return the data of the user.
         res.send(entry);
      })
   
module.exports = router;