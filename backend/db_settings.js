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

         date: {
            type: Date, 
            required: true
         }
      }
   }
};