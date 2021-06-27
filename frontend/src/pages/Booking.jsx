import React, {useState} from "react";

import axios from "../utils/backend_setting";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
// import AppointmentCard from "../components/AppointmentCard";
import { Container, Row, Col, Button, Form} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";

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

  const [bookingData, setBookingData] = useState({
    location: "",
    date: new Date(),
    problem: ""
  })

  console.log("BOOKDATA",bookingData)
  let redirect = useHistory();
  let { state: signin_data } = props.location;

  if (!signin_data) {
    console.error("ERROR: Cannot book an appointment without a signin");
    redirect.push("/signin");
  }

  console.log("RECEIVED AT BOOKING: ");
  console.log(signin_data);

  const payFunction = async function () {
    const script_res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!script_res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    let data = null;
    await axios.post('/payment').then((res)=>{
      data = {};
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
          email: signin_data.username,
          phone_number: signin_data.phone,
        },
      };
      const paymentObject = new window.Razorpay(options);
      console.log("Payment Object: ");
      console.log(paymentObject);
      paymentObject.open();
    
  
    });
    

  };

  return (
    <Container className="py-3">
      <Row>
        <Col className="py-2">
          <h4>Welcome, {signin_data.name}</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form className="py-3">
            <h5 className="pb-3">Enter Details to book an appointment</h5>
            <Form.Group className="my-2" controlId="clinicSelect">
              <Form.Label>City and Clinic</Form.Label>
              <Form.Control
                as="select"
                defaultValue={"Select"}
                onChange={(e) =>
                  setBookingData({ ...bookingData, location: e.target.value })
                }
              >
                <option disabled>Select</option>

                <option>Clinic - Delhi</option>
                <option>Clinic - Mumbai</option>
                <option>Clinic - Bangalore</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="clinicSelect">
              <Form.Label>Appointment Date and Time</Form.Label>
              <Row>
                <Col>
                  <DatePicker
                    selected={bookingData.date}
                    onChange={(date) =>
                      setBookingData({ ...bookingData, date })
                    }
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
            <Form.Group
              className="my-2"
              controlId="problem"
              onChange={(e) =>
                setBookingData({ ...bookingData, problem: e.target.value })
              }
            >
              <Form.Label>Describe reason for appointment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Regular Checkup, problem ..."
              />
            </Form.Group>

            <Button onClick={payFunction}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
