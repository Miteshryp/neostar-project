import React, { useState } from "react";

import axios from "../utils/backend_setting";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

function SignInPage() {
  let redirect = useHistory();

  let [signIn, setSignIn] = React.useState({
    email: "",
    password: "",
  });
  const changeInput = (event) => {
    let field = event.target.name;
    let value = event.target.value;

    setSignIn((prev) => {
      return { ...prev, [field]: value };
    });
  };

  let [errorStyle, setErrorStyle] = useState({ display: "none" });

  const makeErrorVisible = () => setErrorStyle({ display: "block" });
  const makeErrorHidden = () => setErrorStyle({ display: "none" });

  const onSubmit = async (event) => {
    event.preventDefault();

    console.log("input", signIn);
    //@TODO: Check if the necessary fields are filled or not.

    // Check with the database if the account exists
    // let res = await axios.post(backend.url_path + backend.signin, signIn);
    await axios.post("/signin", signIn).then((res) => {
      if (res.status === 200) {
        //response received.
        console.log("RECEIVED: ");
        console.log(res);
        if (res.data) {
          // @TODO: backend response
          if (res.data.status.code === 401) {
            //signin success
            // data received.

            makeErrorHidden();
            setSignIn((prev) => {
              return { ...res.data.data };
            });

            console.log("PRINTING: ");
            console.log(res.data.data);
            // Book an appointment.

            console.log("DATA IS NOW:");
            redirect.push("/booking", res.data.data);
          } else if (res.data.status.code === 404) {
            // signin failed: record not found
            console.error("ERROR: Invalid Credentials");
            makeErrorVisible();
          } else {
            console.error("HERE");
          }
        } else {
          console.error("ERROR: The res.data field was invalid");
        }
      } else {
        console.error("ERROR: Server Response not received. PROTOCOL ERROR");
      }
    });
  };

  return (
    <Container fluid className="register-container">
      <Row className="register-row">
        <Col md={6}>
          <h1>SignIn</h1>
          <Form className="py-3" onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email" placeholder="Enter email" name="email" onChange={(e) => changeInput(e)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" placeholder="Password" name="password" onChange={(e) => changeInput(e)} />
            </Form.Group>
            <p className="text-danger" style={errorStyle}>
              Invalid Credentials
            </p>
            <Button variant="primary" size={"md"} type="submit">
              Submit
            </Button>
            <div className="py-2 text-center">
              Don't have an account ?{" "}
              <Link className="app-link" to="/register">
                Signup Here
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignInPage;
