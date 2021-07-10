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

         let user_id = req.user._id;
         let doctor_clinic_id = req.user.clinicID;
         // @TODO: Perform server side check to prevent Server Injection Attack.

         // get appointment details
         let appointment_details = await Appointment.findAll({clinicID: doctor_clinic_id });
         if(!appointment_details) {
            logger.warn("No Appointments Found.");
            return res.send(response.createResponse(response.type.noData));
         }

         // A custom object has to be created here containing all the details
         // in a single object

         let Client = DB.getModel(options.client);
         let data = {
            appointments: []
         }

         appointment_details.forEach( async (element) => {
            // get client details
            
            let client_details = await Client.findById(element.clientID);
            if(!client_details) {
               logger.error("User no found. FATAL ERROR (This cannot happen naturally)");
               return;
            }


            // combine and send the data
            // @TODO: Structure the data nicely.
            data.appointments.push({
               client: routine.hideCredentials(client_details),
               appointment: element
            });

         });

         // @TODO: Make a new response for this return
         return res.send(response.createDataResponse(data, response.type.bookingSuccess));
      })
      .post(async (req, res) => {
         let params = req.body;

         let client_id= params.clientID;
         let approve = params.approve;

         const Appointment = DB.getModel(options.appointment);

         // @TODO: Parse and check the params to prevent Injection Attacks.
         if(approve) {
            await Appointment.update({clientID: client_id}, {confirmed: true, doctorID: req.user._id});        
            return res.send(response.createResponse(response.type.appointmentConfirmed));
         }

         else {
            // Now the new date has to be passed in the schema.
            let new_date = params.newDate;
            await Appointment.update({clientID: client_id}, {appointmentDate: new_date, confirmed: true});
            return res.send(response.createResponse(response.type.appointmentRescheduled));
         }
      });


module.exports = router;