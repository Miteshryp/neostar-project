const express = require("express");
const logger = require("node-color-log");
const Razorpay = require("razorpay");
const shortid = require("shortid");

const creds = {
   key_id: process.env.RAZORPAY_KEY_ID,
   key_secret: process.env.RAZORPAY_KEY_SECRET
}


let router = express.Router();

const razorpay = new Razorpay(creds);

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
            logger.debug("\n\nRazorpay: ")
            logger.debug(response + "\n\n");

            res.json({
               id: response.id,
               currency: response.currency,
               amount: response.amount
            })
         } catch (error) {
            logger.error("ERROR: ");
            logger.error(error)
         }


      })

module.exports = router;