// -------------------------------- Doctor's Appointment -------------------------------------


const logger = require("node-color-log");
const express = require("express");

const response = require("../helper/response");
const DB = require("../../database");
const options = require("../../schema");

const router = express.Router();


router.route("/")
      .get(async (req, res) => {
         if(req.isUnauthenticated()) {
            logger.error("Login could detected. Cannot return Appointment list [DOCTOR]");
            return res.send(response.createResponse(response.type.authFail));
         }
         
         // @TODO: Check if the user logged in is doctor.
         

         // @TODO: Doctor maybe a part of a clinic? Think about this system
         //        implementation.
         
         let Appointment = DB.getModel(options.appointment);

         // get appointment details
         let appointment_details = Appointment.find({doctor_id: req.user._id});
         if(!appointment_details) {
            logger.warn("No Appointments Found.");
            return res.send(response.createResponse(response.type.noData));
         }

         // A custom object has to be created here containing all the details
         // in a single object

         // get client details
         let Client = DB.getModel(options.client);
         let client_details = Client.findById(db_response.client_id);
         if(!client_details) {
            logger.error("User no found. FATAL ERROR (This cannot happen naturally)");
            return res.send(response.createResponse(response.type.codeRed));
         }

         // get doctor details
         let Doctor = DB.getModel(options.doctor);
         let doctor_details = Doctor.findById(appointment_details.doctor_id);
         if(!doctor_details)
         

         //combine and send the data
         let data = {
            client: routine.hideCredentials(client_details),
            doctor: routine.hideCredentials(doctor_details),

         }
      });


module.exports = router;