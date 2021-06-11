import React from "react";
import Navbar from "./Components/Navbar";
import axios from "axios";

import Form from "./Components/Form";
import FormField from "./Components/FormField";


import {Link, useHistory} from "react-router-dom";
import FormButton from "./Components/FormButton";
import backend from "./backend_setting";
import TextField from "./Components/TextField";

function RegisterPage() { 
   let redirect = useHistory();

   //States
   // @TODO: messy code. Organize the flow.
   
   let [input, setInput] = React.useState({name: "", phone: "", email: "", password: "", address: ""});
   let [errorStyle, setErrorStyle] = React.useState({visibility: "hidden"});

   const makeErrorVisible = () => setErrorStyle({visibility: "visible"});
   const makeErrorHidden = () => setErrorStyle({visibility: "hidden"});

   const changeInput = (event) => {
      let field = event.target.name;
      let value = event.target.value;

      setInput( (prev) => { 
         // console.log({...prev, [field]: value});
         return {...prev, [field]: value}; 
      });
   }
   

   async function OnSubmit(event) {
      event.preventDefault();


      // POST data
      let register_post = {
         email: input.email,
         password: input.password,
         name: input.name,
         phone: input.phone,
         address: input.address
      }

      // Send POST request to the backend.
      console.log(register_post);

      let res = await axios.post(backend.url_path + backend.register, register_post)
      // @TODO: Get the #RESPONSE type in the frontend.
      console.log(res);
      if(res.data) {
         switch(res.data.status.code) {
         case 501: //sentCodeSuccess
            makeErrorHidden();
            console.log("Redirecting ..... ");
            redirect.push("/verify", register_post);
            break;

         case 612: // duplicate data.
            console.error("ERROR: Credentials already issued for another account");
            makeErrorVisible();
         
         default:
            console.error("ERROR: Could not send code");
            console.error("ERROR code sent: " + res.data.status.code);
         }
      }  
   }


   return (
      <div>
         <Navbar />

         <div className="app-green-background">
            <Form title="Register" onSubmit={OnSubmit} >

               {/* Email */}
               <FormField fieldName="Email" id="email" autoComplete="off" type="email"
               placeholder="Email" value={input.email} onChange={changeInput} />
               
               {/* Password */}
               <FormField fieldName="Password" id="password" autoComplete="off" type="password"
               placeholder="Password" value={input.password} onChange={changeInput} />

               {/* Name */}
               <FormField fieldName="Name" id="name" autoComplete="off" type="text" 
               placeholder="Name" value={input.name} onChange={changeInput}  />

               {/* Phone */}
               <FormField fieldName="Phone No." id="phone" autoComplete="off" type="text"
               placeholder="Phone No." value={input.phone} onChange={changeInput} />

               {/* Address */}
               <FormField fieldName="address" id="address" autoComplete="off" type="text"
               placeholder="Address" value={input.address} onChange={changeInput} />

               <TextField style={errorStyle} class="text-danger" value="Email / Phone already registered in an account." />
               <FormButton colorMode="light" value="Register" />
               <Link class="app-link" to="/signin"> Already signed up? </Link> 
            </Form>
         
         </div>
      </div>
   );
}

export default RegisterPage;