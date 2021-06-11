const express = require("express");
const Razorpay = require("razorpay");
const shortid = require("shortid");

const creds = require("./../appointment_creds");


let router = express.Router();

const razorpay = new Razorpay(creds.credentials);

router.route("/")
      .post( async (req, res) => {
         const payment_capture = 1
         const amount = 10
         const currency = 'INR'
      
         const options = {
            amount: amount * 100,
            currency,
            receipt: shortid.generate(),
            payment_capture
         }
      
         try {
            const response = await razorpay.orders.create(options);
            console.log(response)
            res.json({
               id: response.id,
               currency: response.currency,
               amount: response.amount
            })
         } catch (error) {
            console.error("ERROR: ");
            console.log(error)
         }


      })

module.exports = router;