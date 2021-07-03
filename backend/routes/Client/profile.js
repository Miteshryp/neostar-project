// ---------------------------------- Client's Profile ----------------------------------------
//
//

const express = require("express");
const logger = require("node-color-log");

const response = require("../helper/response");
const routine = require("../helper/routine");

let router = express.Router();

router.route("/").get((req, res) => {
  if (req.isUnauthenticated()) {
    logger.error("Login could not be detected.");
    res.send(response.createResponse(response.type.signinFail));
    return;
  }

  // @TODO: Check if the user is of type client.
  //        We cannot return the data if the user is a doctor.

  logger.debug("Login Detected");
  return res.send(response.createDataResponse(routine.hideCookieCredentials(req.user), null));
});

module.exports = router;
