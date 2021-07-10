const mongoose = require("mongoose");
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
         clientID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
         },

         doctorID: {
            type: mongoose.Schema.Types.ObjectId,
         },

         clinicID: {
            // type: mongoose.Schema.Types.ObjectId
            type: String
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

         street: String,
         city: String,
         state: String,
         landmark: String, 
         pincode: Number,

         problem: {
            type: String
         }
      }
   },


   doctor: {
      // auth: true,
      name: "doctor",
      plugins: [],

      // plugins: [passportLocalMongoose],

      schema: {
         firstName: {
            type: String,
            required: true
         },
         lastName: {
            type: String,
            required: true
         },

         qualifications: {
            type: Buffer
         },

         clinicID: {
            type: mongoose.Schema.Types.ObjectId
         }
      }
   },


   clinic: {
      name: "clinic",
      plugins: [],

      // location of the clinic
      
      
      schema: {
         name: {
            type: String,
            required: true
         },

         group: Boolean,
         //location: null,

         doctors: Array,

         latitude: Number,
         longitude: Number,
      
      }
   }
};