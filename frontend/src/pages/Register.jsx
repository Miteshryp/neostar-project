import React, { useState } from "react";

import axios from "../utils/backend_setting";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

function RegisterPage() {
  let redirect = useHistory();

  let [input, setInput] = useState({ name: "", phone: "", email: "", password: "", address: "" });
  let [errorStyle, setErrorStyle] = useState({ display: "none" });

  const makeErrorVisible = () => setErrorStyle({ display: "block" });
  const makeErrorHidden = () => setErrorStyle({ display: "none" });

  const changeInput = (event) => {
    let field = event.target.name;
    let value = event.target.value;
    console.log("field", field);
    console.log("value", value);

    setInput((prev) => {
      return { ...prev, [field]: value };
    });
  };

  async function onSubmit(event) {
    event.preventDefault();

    await axios.post("/register", input).then((res) => {
      console.log(res);
      if (res.data) {
        switch (res.data.status.code) {
          case 501: //sentCodeSuccess
            makeErrorHidden();
            console.log("Redirecting ..... ");
            redirect.push("/verify", input);
            break;

          case 612: // duplicate data.
            console.error("ERROR: Credentials already issued for another account");
            makeErrorVisible();
            break;
          default:
            console.error("ERROR: Could not send code");
            console.error("ERROR code sent: " + res.data.status.code);
        }
      }
    });
  }

  return (
    <Container fluid className="register-container">
      <Row className="register-row">
        <Col md={6}>
          <h1>Register</h1>
          <Form className="py-3" onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email" placeholder="Enter email" name="email" onChange={(e) => changeInput(e)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" placeholder="Password" name="password" onChange={(e) => changeInput(e)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control required type="name" placeholder="Enter name" name="name" onChange={(e) => changeInput(e)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control required type="tel" placeholder="+91 1234567890" name="phone" onChange={(e) => changeInput(e)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control required as="textarea" type="text" placeholder="Enter your address" name="address" onChange={(e) => changeInput(e)} />
            </Form.Group>
            <p className="text-danger" style={errorStyle}>Email / Phone already registered in an account.</p>
            <Button variant="primary" size={"md"} type="submit">
              Submit
            </Button>
            <div className="py-2 text-center">
              Already have an account ?{" "}
              <Link className="app-link" to="/signin">
                Login Here
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;
