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