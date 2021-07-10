module.exports = {
   type: {
      invalidParameters: {
         code: 201,
         decription: "Registration parameters corrupted"
      },


      signinFail: {
         code: 404,
         description: "Signin Failed: Email not registered." 
      },
      siginInvalidCreds: {
         code: 405,
         description: "Signin Failed. Credentials are Invalid"
      },
      signinSuccess: {
         code: 401, 
         description: "Signin Successful."
      },


      validRegistration: {
         code: 301,
         description: "The Fields are valid for registration"
      },
      invalidRegistration: {
         code: 304,
         description: "The Fields are invalid for registration"
      },


      sentCodeSucess : {
         code: 501,
         description: "OTP sent successfully"
      },
      sentCodeFail: {
         code: 504, 
         description:  "Could not send the OTP."
      },
      otpExpired: {
         code: 508,
         description: "OTP was already verified."
      },




      duplicateEntry: {
         code: 612,
         description: "Entry Already Registered"
      },

      invalidVerification: {
         code: 603,
         description: "The Parameters passed in are corrupted."  
      },

      verificationFail: {
         code: 604,
         description: "OTP verification failed.",
      },
      verificationSuccess: {
         code: 606,
         description: "OTP Verified successfully"
      },


      logoutSuccess: {
         code: 240,
         description: "Logged out Successfully"
      },

      logoutFail: {
         code: 444,
         description: "Logout Unsuccessful"
      },





      authCreationFail: {
         code: 434,
         description: "Authentication Unsuccessful. Session not created."
      },

      authCreationSuccess: {
         code: 234, 
         description: "Authentication Successful. Session created."
      },


      

      authFail: {
         code: 454,
         description: "Authentication session not detected."
      },

      


      bookingSuccess: {
         code: 234,
         description: "Appointment Booking Queued."
      },

      bookingFail: {
         code: 494,
         description: "Appointment could not be booked."
      },

      noBookingFound: {
         code: 712,
         description: "No Bookings were found for the user"
      },


      noData: {
         code: 300, 
         description: "No Data found"
      },

      codeRed: {
         code: 1404,
         description: "Something went wrong!"
      },















      appointmentRescheduled: {
         code: 911,
         description: "Appointment has been rescheduled."
      },
      appointmentConfirmed: {
         code: 912,
         description: "Appointment has been confirmed"
      },
   
   
   },


   // The format of the data to be returned is as such: 
   // {
   //    status: The error or success response code which was sent by the server. This will
   //            tell us about the errors faced by the backend.
   //    data: It contains the data sent by the backend, if any.
   // }



   createResponse: function(status_response) {
      return {
         status: status_response
      };
   },

   createDataResponse: function(data, status_response) {
      return {
         data: data,
         status: status_response
      }
   }
}