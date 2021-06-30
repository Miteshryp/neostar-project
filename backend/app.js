// Required Libraries
const logger = require("node-color-log");
const dotenv = require("dotenv").config();
if(dotenv.error) {
   logger.error("DotENV failed to initialise");
   logger.warn(dotenv.error)
   return;
}
const express = require("express");
const app = express();
const cors = require("cors");

const options = require("./schema")

const session = require("express-session");
const passport = require("passport");

const DB = require("./database");

//
// ------------------------------------- END OF IMPORTS --------------------------------------
//




const DEFAULT_PORT = 5000;
let port = null;

// Setting up the server port.
if(process.env.PORT !== undefined && process.env.port !== null) port = process.env.PORT;
else port = DEFAULT_PORT;


app.use(cors( {
   origin: "http://localhost:3000",
   credentials: true
   }
));
app.use(express.static("public"));
app.use(express.urlencoded( {extended: false} ));
app.use(express.json());


// Cookies and Sessions
app.use(session({
   secret: process.env.COOKIE_SECRET,
   saveUninitialized: false,
   resave: false
   // cookie: {secure: true} // This is for HTTPS sites.
}))

app.use(passport.initialize());
app.use(passport.session());

logger.debug("Passport Initiated");

//
// ------------------------------------- END OF SETUP --------------------------------------------
//






// Routes

const client = require("./routes/client");
const doctor = require("./routes/doctor");
const logout = require("./routes/logout");




app.use("/client", client);
app.use("/doctor", doctor);
app.use("/logout", logout)
// app.use("/signin", signin);
// app.use('/register', register);
// app.use('/register/verify', verify); // @TEMP: verify can be generic
// app.use("/payment", payment);
// app.use("/logout", client_logout);
// app.use("/booking", client_booking)


//
// -------------------------------------- END OF ROUTES -------------------------------------
//




// Starting up the backend
app.listen(port, async () => {
   console.debug("Server hosted on port: " + port);

   // initialising database.
   await DB.initDB();
   DB.getModel(options.client); // initialising passport here
})