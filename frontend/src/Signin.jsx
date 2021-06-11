import React from "react";
import Navbar from "./Components/Navbar"
import axios from "axios";

import {Link} from "react-router-dom";

import Form from "./Components/Form";
import FormField from "./Components/FormField";
import TextField from "./Components/TextField";
import FormButton from "./Components/FormButton";

import backend from "./backend_setting";
import {useHistory} from "react-router-dom";

function SignInPage(props) {
   let redirect = useHistory();


   console.log(props.location.state);
   const checkProps = async function() {
      if(props.location.state) { // signin info was passed.
         // check if the info passed is correct
         console.log("Data PASSED: ");
         console.log(props.location.state);
         let res = await axios.post(backend.url_path + backend.signin, props.location.state);
         if(res.status === 200) { // response received.
            
            if(res.data.status.code === 401) { // signin successful
               console.log("The Signin data stored is valid. REDIRECTING ....");
               redirect.push("/booking", res.data.data); // booking page gets the signin data
            } else {
               console.error("ERROR: The signin data passed is invalid.");
            }

         }
         else {
            console.error("ERROR: response not received. PROTOCOL ERROR.");
         }

      }
   }
   checkProps();

   let [signin_data, setSignIn] = React.useState({
      email: null,
      password: null,
      name: null,
      phone: null,
      address: null,
   });
   const changeInput = (event) => {
      let field = event.target.name;
      let value = event.target.value;

      setSignIn( (prev) =>{ 
         return {...prev, [field]: value}
      });
   }
   
   let [errorStyle, setError] = React.useState({visibility: "hidden"});
   const makeErrorVisible = () => { 
      setError({visibility: "visible"})
   }
   const makeErrorHidden = () => { 
      setError({visibility: "hidden"})
   }


   const OnSubmit = async (event) => {
      event.preventDefault();

      //@TODO: Check if the necessary fields are filled or not.

      // Check with the database if the account exists
      let res = await axios.post(backend.url_path + backend.signin, signin_data);
      
      if(res.status === 200) { //response received.
         console.log("RECEIVED: ");
         console.log(res);
         if(res.data) {
            // @TODO: backend response
            if(res.data.status.code === 401) { //signin success
               // data received.
               setSignIn((prev) => { 
                  return {...(res.data.data)}
               });

               console.log("PRINTING: ");
               console.log(res.data.data);
               // Book an appointment.

               console.log("DATA IS NOW:")
               redirect.push("/booking", res.data.data);
            }

            else if(res.data.status.code === 404) { // signin failed: record not found
               console.error("ERROR: Invalid Credentials");
               makeErrorVisible();
            }
            else{ 
               console.error("HERE");
            }
         } else {
            console.error("ERROR: The res.data field was invalid");
         }

      } else {
         console.error("ERROR: Server Response not received. PROTOCOL ERROR");
      }
   }


   return (
      <div class="app-green-background"> 
         <Navbar />

         <Form title="Sign In" onSubmit={OnSubmit} >

               {/* Email */} 
               <FormField fieldName="Email" id="email" autoComplete="on" type="email"
               placeholder="Email" value={signin_data.email} onChange={changeInput} />
               
               {/* Password */}
               <FormField fieldName="Password" id="password" autoComplete="off" type="password"
               placeholder="Password" value={signin_data.password} onChange={changeInput} />

               <TextField class="text-danger" style={errorStyle} value="Invalid Credentials." />
               <FormButton value="Sign In" colorMode="light"/>
               <Link class="app-link" to="/register"> Sign Up </Link> 
         </Form>

      </div>
   );;
}

export default SignInPage;