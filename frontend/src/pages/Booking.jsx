import React, { useState, useContext } from "react";

import axios from "../utils/backend_setting";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import successPng from "../assets/images/success.png";

// import AppointmentCard from "../components/AppointmentCard";
import { Container, Row, Col, Button, Form, Modal, Image } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: 28.70406, lng: 77.102493 }}>
      {props.isMarkerShown ? (
        <>
          <Marker
            onClick={(e) => {
              // e.preventDefault();
              props.setState({ ...props.state, clinicID: "DELHI" });
            }}
            position={{ lat: 28.70406, lng: 77.102493 }}
          />
          <Marker
            onClick={(e) => {
              // e.preventDefault();
              props.setState({ ...props.state, clinicID: "NAGPUR" });
            }}
            position={{ lat: 20.70406, lng: 77.102493 }}
          />
          <Marker
            onClick={(e) => {
              // e.preventDefault();
              props.setState({ ...props.state, clinicID: "UTTAR PRADESH" });
            }}
            position={{ lat: 28.70406, lng: 78 }}
          />
        </>
      ) : (
        <></>
      )}
    </GoogleMap>
  ))
);

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

export default function BookingPage() {
  let redirect = useHistory();

  const { user } = useContext(UserContext);

  const [show, setShow] = useState(0);
  const [bookingData, setBookingData] = useState({
    street: "",
    issueDate: new Date(),
    appointmentDate: new Date(),
    problem: "",
    location: "",
    city: "",
    state: "",
    landmark: "",
    pincode: "",
    clinicID: "",
  });
  // let { state: user } = props.location;

  if (!user) {
    console.error("ERROR: Cannot book an appointment without a signin");
    redirect.push("/login");
  }

  const payFunction = async function () {
    const script_res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!script_res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    let data = null;
    await axios.post("/client/payment").then(async (res) => {
      data = {};
      if (res.status === 200) {
        // response received.
        data = res.data;


      }

      const options = {
        key: payment_id,
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: "Payment",
        description: "Thank you for nothing. Please give us some money",
        image: null,
        handler: async function (response) {
          console.log("Payment Process Complete");
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);


                  // @Todo
        await axios.post("/client/booking", bookingData).then((res) => {
          // redirect.push("/dashboard");
          setShow(!show);
        });
        },
        prefill: {
          name: user.name,
          email: user.username,
          phone_number: user.phone,
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    });
  };

  return (
    <Container className="py-3">
      <Row>
        <Col className="py-2">
          <h4>
            Welcome, {user.firstName} {user.lastName}
          </h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form className="py-3">
            <h5 className="pb-3">Enter Details to book an appointment</h5>

            <MapComponent
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?sensor=false&callback=initMap"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              state={bookingData}
              setState={setBookingData}
            />
            <h3 className="my-4">Chosen clinic</h3>

            {bookingData.clinicID ? "Chosen Clinic is " + bookingData.clinicID : "You haven't selected any clinic"}

            <hr />

            <Form.Group className="my-2" controlId="clinicSelect">
              <Form.Label>Street/Flat</Form.Label>
              <Form.Control placeholder="Street/Flat Address" onChange={(e) => setBookingData({ ...bookingData, street: e.target.value })}></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="state">
              <Form.Label>City</Form.Label>
              <Form.Control placeholder="Enter City" onChange={(e) => setBookingData({ ...bookingData, city: e.target.value })}></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control placeholder="Enter State" onChange={(e) => setBookingData({ ...bookingData, state: e.target.value })}></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="landmark">
              <Form.Label>Landmark</Form.Label>
              <Form.Control placeholder="Enter Landmark" onChange={(e) => setBookingData({ ...bookingData, landmark: e.target.value })}></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="pincode">
              <Form.Label>Pincode / Area Code</Form.Label>
              <Form.Control placeholder="000000" onChange={(e) => setBookingData({ ...bookingData, pincode: e.target.value })}></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="clinicSelect">
              <Form.Label>Appointment Date and Time</Form.Label>
              <Row>
                <Col>
                  <DatePicker
                    selected={bookingData.appointmentDate}
                    onChange={(date) => setBookingData({ ...bookingData, appointmentDate: date })}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy p"
                    type="date"
                    name="date"
                    required
                    value={bookingData.date}
                    placeholder="Appointment date"
                    timeIntervals={15}
                    className="form-control"
                    minDate={new Date()}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="my-2" controlId="problem" onChange={(e) => setBookingData({ ...bookingData, problem: e.target.value })}>
              <Form.Label>Describe reason for appointment</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Regular Checkup, problem ..." />
            </Form.Group>

            <Button onClick={payFunction}>Submit</Button>
          </Form>
        </Col>
      </Row>

      <Modal show={show} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body className="success-modal">
          <Image fluid src={successPng} />
          <p className="text-muted text-center">Your Appointment booking was successful!</p>
          <Button
            variant={"success"}
            onClick={() => {
              redirect.push("/dashboard");
            }}
          >
            Continue to Dashboard
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
