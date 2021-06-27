const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

module.exports = {
   client: {
      auth: true,
      name: "client",
      plugins: [passportLocalMongoose],
      schema:
      {
         name: {
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
         address: String //{
         //    house: {type: String, required: true},
         //    street: {type: String},
         //    city: {type: String, required: true}
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

         description: {
            type: String
         }
      }
   }
};