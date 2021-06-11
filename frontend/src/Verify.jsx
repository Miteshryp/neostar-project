import axios from "axios";
import React from "react";
import Form from "./Components/Form";
import FormField from "./Components/FormField";
import TextField from "./Components/TextField"
import Navbar from "./Components/Navbar"
import backend from "./backend_setting"
import { useHistory } from "react-router-dom";
import FormButton from "./Components/FormButton";

export default function VerifyPage(props) {
   let redirect = useHistory();
   let {state: register_data} = props.location; 
   // let register_data = {phone: "3434"};

   // Verify page can only be routed from the register page.
   // If it was routed manually without any data, we redirect to the home page.
   if(!register_data) {
      // @TODO: redirect to the no access page.
      redirect.push("/"); // redirects to home page.
   }

   let [displayCode, setCode] = React.useState("");
   let [errorVisible, setErrorVisible] = React.useState({visibility: "hidden"});

   let changeCode = event => setCode(event.target.value);

   let makeErrorVisible = () => setErrorVisible({visibility: "visible"});
   let makeErrorHidden = () => setErrorVisible({visibility: "hidden"});

   async function OnSubmit(event) {
      event.preventDefault();

      let verify_post = {
         ...register_data,
         code: displayCode
      }

      console.log("Sending Response")
      let res = await axios.post(backend.url_path + backend.verification, verify_post);
      console.log("Response Received");
      if(res.status === 200) {
         // The backend responded
            if(res.data.status.code === 606) { //verification success
               makeErrorHidden();
               console.log("Verification successful");
               redirect.push("/signin", register_data);
            }
            else {
               // backend sent an error.
               // Could not verify the otp
               console.log("OTP verification failed")
               makeErrorVisible();
            }
      }
      else {
         console.error("ERROR: Protocol Error");
         makeErrorVisible();
      }
   }


   return (
   <div>
      <Navbar />

      <Form title="Verification" onSubmit={OnSubmit} >
         <TextField class="text-success" value={`The OTP was send to  ${register_data.phone}.`} />
         <FormField fieldName="OTP" id="code" autoComplete="off" type="text"
               placeholder="Enter the OTP sent" value={displayCode} onChange={changeCode} />
         <TextField class="text-danger" style={errorVisible} value="OTP could not be verified." />
         <FormButton value="Verify" />
      </Form>
   </div>
   )
}