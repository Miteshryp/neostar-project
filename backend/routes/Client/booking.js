const logger = require("node-color-log");
const express = require("express");

const DB = require("../../database");
const options = require("../../schema")
const routine = require("../helper/routine");
const response = require("../helper/response");

 
const router = express.Router();

const AUTH_FAIL = response.createResponse(response.type.authFail);

router.route("/")
      .get(async (req, res) => {
         if(req.isUnauthenticated()) {
            logger.error("User authentication not found. Cannot return the bookings.")
            return res.send(AUTH_FAIL);
         }

         // @TODO: Check parameters to see if the user is a client

         let Appointment = DB.getModel(options.appointment);
         let db_response = await Appointment.findAll({client_id: req.user._id});

         if(db_response) return res.send(response.createDataResponse(routine.hideCredentials(db_response), response.type.bookingSuccess));
         else return res.send(response.createResponse(response.type.noBookingFound));
      })

      
      .post( async (req, res) => {

         if(req.isUnauthenticated()) {
            logger.error("User must login before booking.");
            return res.send(AUTH_FAIL);
         }

         // @TODO: Check parameters to see if the user is a client

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