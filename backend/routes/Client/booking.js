const logger = require("node-color-log");
const express = require("express");

const DB = require("../../database");
const options = require("../../schema")
const routine = require("../helper/routine");
const response = require("../helper/response");

const AUTH_FAIL = response.createResponse(response.type.authFail);

const router = express.Router();

router.route("/")
      .get(async (req, res) => {
         if(req.isUnauthenticated()) {
            logger.error("User authentication not found. Cannot return the bookings.")
            return res.send(AUTH_FAIL);
         }

         let Appointment = DB.getModel(options.appointment);
         let db_response = await Appointment.find({client_id: req.user._id});

         let ret = {};

         if(db_response) ret = db_response;
         return res.send(response.createDataResponse(ret, response.type.bookingSuccess));
      })

      
      .post( async (req, res) => {

         if(req.isUnauthenticated()) {
            logger.error("User must login before booking.");
            return res.send(AUTH_FAIL);
         }

         // create an appointment and store in the database
         let params = req.body;
         let Appointment = DB.getModel(options.appointment);

         params.client_id = req.user._id;
         params.confirmed = false; // the doctor will confirm the appointment
         // rest of the parameters are passed by the frontend.         

         let db_response = await Appointment.insert(params);
         
         if(!db_response){
            return res.send(response.createResponse(response.type.bookingFail));
         }

         logger.info("Booking Stored successfully");
         return res.send(response.createResponse(response.type.bookingSuccess))
      });



module.exports = router;