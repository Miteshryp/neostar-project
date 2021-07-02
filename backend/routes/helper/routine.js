const logger = require("node-color-log");

const twilio = require("twilio");
const passport = require("passport");

const DB = require("../../database");
const options = require("../../schema");
const response = require("./response");

const TWILIO = {
  ID: process.env.TWILIO_ID,
  AUTH: process.env.TWILIO_AUTH,
  SERVICE_ID: process.env.TWILIO_SERVICE_ID,
};
const client = twilio(TWILIO.ID, TWILIO.AUTH);

// ------------------------------------ Log In ---------------------------------------------

function isValidSignin(params) {
  return !(params.username === undefined || params.username === null || params.password === undefined || params.password === null);
}

async function verifyLogin(creds, req, res) {
  logger.debug("\n\n********* Signin Routine *********\n\n");
  if (!isValidSignin(creds)) {
    // ERROR: the request data is invalid
    logger.error("Signin request parameters are corrupted.");
    logger.debug("\n\n******** Signin Routing END ********\n\n");
    return response.createResponse(response.type.invalidParameters);
  }

  await passport.authenticate("local", (err, user, info) => {
    if (err) {
      logger.error("Authentication Error");
      logger.debug("\n\n******** Signin Routing END ********\n\n");
      return res.send(response.createResponse(response.type.signinFail));
    }
    if (!user) {
      logger.error("Authentication Failed");
      logger.debug("\n\n******** Signin Routing END ********\n\n");
      return res.send(response.createResponse(response.type.signinFail));
    }

    logger.info("Authentication Successful");

    // creating a session
    req.login(user, (err) => {
      if (err) {
        logger.error("Session could not be created");
        logger.debug("\n\n******** Signin Routing END ********\n\n");
        return res.send(response.createResponse(response.type.codeRed));
      }
      logger.info("Session created successfully");
      logger.debug("\n\n******** Signin Routing END ********\n\n");
      return res.send(response.createDataResponse(hideCredentials(creds), response.type.signinSuccess));
    });
  })(req, res, (err) => {
    logger.error(err);
  });

  logger.debug("\n\n******** Signin Routing END ********\n\n");
}

// ----------------------------------- Registration -----------------------------------------

function isValidRegister(params) {
  if (params.name === undefined || params.name === null || params.phone === undefined || params.phone === null || params.username === undefined || params.username === null) {
    // ERROR: the request data is invalid
    console.error("Undefined / Null Arguments Received");
    return false;
  }
  return true;
}

async function verifyRegister(creds, req, res) {
  const Client = DB.getModel(options.client);

  if (!isValidRegister(creds)) {
    // ERROR: the request data is invalid
    return response.createResponse(response.type.invalidParameters);
  }

  // Search for the name and phone in the database;

  // @TODO: Modularize the 2 checks, else this could become a huge hassel in the future.
  //        We might need to modularize the database model class methods for this to just
  //        return promises, but then again we might not.
  //        Give this a thought.
  let entry = await Client.find({ username: creds.username });
  if (entry !== undefined && entry !== null) {
    // The given phone and name already exists.
    logger.error("The Email Already exists in the database.");
    return response.createResponse(response.type.duplicateEntry);
  }

  // @TODO: Decide if the phone number has to be unique to each account.
  entry = await Client.find({ phone: creds.phone });
  if (entry !== undefined && entry !== null) {
    // The phone number is already registered.
    logger.error("The phone number has already been registered");
    return response.createResponse(response.type.duplicateEntry);
  }

  return response.createResponse(response.type.validRegistration);
}

async function hideCredentials(user) {
  let ret = user;
  delete ret.id;
  delete ret.password;
  delete ret.hash;
  delete ret.salt;

  return ret;
}

// ---------------------------------- OTP System -------------------------------------------

function handleSendError(err) {
  logger.error("The OTP could not be send");
  logger.warn(err);
  return response.createResponse(response.type.sentCodeFail);
}

function handleCheckError(err) {
  switch (err.code) {
    case 22114:
      logger.error(" Incorrect Code Entered");
      logger.warn(err);
      return response.createResponse(response.type.verificationFail);

    case 20404:
      logger.error("Verification request refused");
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
    let otpResponse = await client.verify.services(TWILIO.SERVICE_ID).verifications.create({ to: phone, channel: "sms" });

    logger.info(`OTP sent to ${otpResponse.to}`);
    return response.createResponse(response.type.sentCodeSucess);
  } catch (err) {
    return handleSendError(err);
  }
}

async function checkOTP(phone, otp) {
  try {
    let checkResponse = await client.verify.services(TWILIO.SERVICE_ID).verificationChecks.create({ to: phone, code: otp });

    if (checkResponse.status === "approved") {
      // Verification successful! Insert the name and phone into the database
      logger.info(`OTP verified: ${phone} - ${otp}`);
      return response.createResponse(response.type.verificationSuccess);
    } else {
      // OTP verification failed
      logger.error("Verification failed");
      res.send(response.createResponse(response.type.verificationFail));
    }
  } catch (err) {
    return handleCheckError(err);
  }
}

module.exports = { isValidSignin, verifyLogin, verifyRegister, hideCredentials, sendOTP, checkOTP };
