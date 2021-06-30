const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

module.exports = {
   client: {
      auth: true, // Parameter that shows this collection stores accounts
      name: "client",
      plugins: [passportLocalMongoose],
      schema:
      {
         firstName: {
            type: String,
            required: true
         },
         lastName: {
            type: String, 
            required: true
         },
         phone: {
            type: String, 
            required: true
         },
         username: {
            type: String,
            required: true
         },
         password: {
            type: String,
         },
         // Street City State Landmark pin
            // house: {type: String, required: true},
            // street: {type: String},
            // city: {type: String, required: true}
         street: String,
         city: String,
         state: String,
         landmark: String,
         pincode: Number,

         // appointments: {
         //    type: m
         // }
      }
   },

   appointment: {
      name: "appointment", 
      plugins: [],
      schema: {
         client_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
         },

         doctorID: {
            type: mongoose.Schema.Types.ObjectId,
         },

         issueDate: {
            type: Date, 
            required: true
         },

         appointmentDate: {
            type: Date
         },

         confirmed: {
            type: Boolean,
            required: true
         },

         problem: {
            type: String
         }
      }
   },


   doctor: {
      auth: true,
      name: "doctor",
      plugins: [passportLocalMongoose],

      schema: {
      }
   },


   clinic: {
      name: "clinic",
      plugins: [],
      
      schema: {
      }
   }
};