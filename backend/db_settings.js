const mongoose = require("mongoose");

module.exports = {
   client: {
      name: "client",
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
         email: {
            type: String,
            required: true
         },
         password: {
            type: String,
            required: true
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