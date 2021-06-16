import axios from "axios";
import React from "react";

import { useHistory } from "react-router-dom";
import backend from "../utils/backend_setting";
import AppointmentCard from "../components/AppointmentCard";

const payment_id = "rzp_test_Uqqdn4DKUadEKR";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export default function BookingPage(props) {
  let redirect = useHistory();
  let { state: signin_data } = props.location;

  if (!signin_data) {
    console.error("ERROR: Cannot book an appointment without a signin");
    redirect.push("/signin");
  }

  console.log("RECEIVED AT BOOKING: ");
  console.log(signin_data);

  const OnClick = async function () {
    const script_res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!script_res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    let data = null;
    const res = await axios.post(backend.url_path + backend.payment);
    if (res.status === 200) {
      // response received.
      console.log(res);
      data = res.data;
    }

    console.log(data);

    const options = {
      key: payment_id,
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Payment",
      description: "Thank you for nothing. Please give us some money",
      image: null,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: signin_data.name,
        email: signin_data.email,
        phone_number: signin_data.phone,
      },
    };
    const paymentObject = new window.Razorpay(options);
    console.log("Payment Object: ");
    console.log(paymentObject);
    paymentObject.open();
  };

  return (
    <div>
      <div className="container text-center mb-auto mt-4 align-top">
        <div className="row">
          <div className="col m-3">
            <button className="btn btn-success ml-auto mr-auto" onClick={OnClick}>
              {" "}
              Book an Appointment{" "}
            </button>
          </div>

          <div className="col m-3">
            {/*Intro: (Name, Details) and DP*/}
            <div className="row">
              <div className="col">
                <h1> {signin_data.name} </h1>
              </div>

              <div className="col"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
