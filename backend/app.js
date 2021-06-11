// Required Libraries
const express = require("express");
const app = express();
const BP = require("body-parser");
const cors = require("cors");
const twilio = require("twilio");


// @@@ IMPORTANT @@@ //
// @TODO: Twilio is gonna be a HUUUUGGEE problem. shift to MessageBird.



// API's
const DB = require("./database");


// This is a temporary AUTH process made with a dummy account
// @TODO: Apply the real email AUTH tokens here 
const TWILIO = require("./twilio_creds.js");


// Port settings currently made for localhost environment;
// @TODO: Set the url and port settings to be suitable cloud host. 
const DEFAULT_PORT = 5000;
let port = null;

// Setting up the server port.
if(process.env.PORT !== undefined && process.env.port !== null) port = process.env.PORT;
else port = DEFAULT_PORT;

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded( {extended: true} ));
app.use(express.json());


// Routes

let signin = require("./routes/signin");
let register = require("./routes/register");
let verify = require("./routes/verify");
let payment = require("./routes/razorpay");
let client_appointment = require("./routes/client_appointment");


app.use("/signin", signin);
app.use('/register', register);
app.use('/register/verify', verify); // @TEMP: verify can be generic
app.use("/razorpay", payment);
// app.use("/appointment/client", client_appointment);
// app.use("/appointment/doctor", doctor_appointment); //@TODO


app.route("/test/verify")
   .post(async (req, res) => {
      let client = twilio(TWILIO.ID, TWILIO.AUTH);

      let params = req.body;

      client.verify.services(TWILIO.SERVICE_ID)
      .verificationChecks
      .create({to: "+919165257248", code: params.code})
      .then((res)=>{console.log("Success")})
      .catch((err) => { console.error("ERROR")});
   })

   app.route("/test/send")
   .post(async (req, res) => {
      let client = twilio(TWILIO.ID, TWILIO.AUTH);

      let params = req.body;

      client.verify.services(TWILIO.SERVICE_ID)
      .verifications
      .create({to: "+919165257248", channel:"sms"})
      .then((res)=>{console.log("Success")})
      .catch((err) => { console.error("ERROR"); console.error(err)});
   })



// Starting up the backend
app.listen(port, async () => {
   console.debug("Server hosted on port: " + port);

   // initialising database.
   await DB.initDB();
})









//      NOTES      //

// #FRONT_ERRORS: Create error classes to be sent to the frontend for better debugging in the future.
// #TWILIO_ERRORS: Handle Errors properly
// #SEND_RESPONSE: Send usable responses to the frontend