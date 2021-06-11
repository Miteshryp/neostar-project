module.exports = {
   type: {
      invalidParameters: {
         code: 201,
         decription: "Registration parameters corrupted"
      },





      signinFail: {
         code: 404,
         description: "Signin Failed: Record not found." 
      },
      signinSuccess: {
         code: 401, 
         description: "Signin Successful."
      },



      // registrationSuccess: {
      //    code: 601,
      //    description: "Registration Completed."
      // },




      sentCodeSucess : {
         code: 501,
         description: "OTP sent successfully"
      },
      sentCodeFail: {
         code: 504, 
         description:  "Could not send the OTP."
      },

      duplicateEntry: {
         code: 612,
         description: "Entry Already Registered"
      },



      verificationFail: {
         code: 604,
         description: "OTP verification failed.",
      },
      verificationSuccess: {
         code: 606,
         description: "OTP Verified successfully"
      },
      otpExpired: {
         code: 608,
         description: "OTP was already verified."
      }
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