// import axios from "axios";
import React, { useState } from "react";
// import backend from "../utils/backend_setting";
import axios from "../utils/backend_setting";
import { useHistory } from "react-router-dom";
import { Form, Container, Button, Row, Col, Modal, Image } from "react-bootstrap";
import successPng from "../assets/images/success.png";
export default function VerifyPage(props) {
  let redirect = useHistory();
  let { state: register_data } = props.location;
  // let register_data = {phone: "3434"};
  const [show, setShow] = useState(false);
  // Verify page can only be routed from the register page.
  // If it was routed manually without any data, we redirect to the home page.
  if (!register_data) {
    // @TODO: redirect to the no access page.
    redirect.push("/"); // redirects to home page.
  }

  let [displayCode, setCode] = React.useState("");
  let [errorVisible, setErrorVisible] = React.useState({ visibility: "hidden" });

  let changeCode = (event) => setCode(event.target.value);

  let makeErrorVisible = () => setErrorVisible({ visibility: "visible" });
  let makeErrorHidden = () => setErrorVisible({ visibility: "hidden" });

  async function onSubmit(event) {
    event.preventDefault();

    let verify_post = {
      ...register_data,
      code: displayCode,
    };

    await axios.post("/client/verify", verify_post).then((res) => {
      if (res.status === 200) {
        // The backend responded

        if (res.data.status.code === 606 || res.data.status.code === 508) {
          //verification success
          makeErrorHidden();
          setShow(1);
          // redirect.push("/login", register_data);
        } else {
          // backend sent an error.
          // Could not verify the otp
          makeErrorVisible();
        }
      } else {
        makeErrorVisible();
      }
    });
  }

  return (
    // <div>
    //   <Form title="Verification" onSubmit={OnSubmit}>
    //     <TextField className="text-success" value={`The OTP was send to  ${register_data.phone}.`} />
    //     <FormField fieldName="OTP" id="code" autoComplete="off" type="text" placeholder="Enter the OTP sent" value={displayCode} onChange={changeCode} />
    //     <TextField className="text-danger" style={errorVisible} value="OTP could not be verified." />
    //     <FormButton value="Verify" />
    //   </Form>
    // </div>
    <Container fluid className="register-container">
      <Row className="register-row">
        <Col md={6}>
          <h1>Verification</h1>
          <Form className="py-3" onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>OTP</Form.Label>
              <Form.Control required type="name" placeholder="Enter OTP" name="OTP" onChange={(e) => changeCode(e)} />
            </Form.Group>
            <p className="text-danger" style={errorVisible}>
              OTP could not be verified
            </p>
            <Button variant="primary" size={"md"} type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>

      <Modal show={show} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body className="success-modal">
          <Image fluid src={successPng} />
          <p className="text-muted">Your OTP was successfully verified</p>
          <Button
            variant={"success"}
            onClick={() => {
              redirect.push("/login");
            }}
          >
            Continue to Login
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
