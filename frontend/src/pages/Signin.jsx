import React, { useState, useEffect, useContext } from "react";

import axios from "../utils/backend_setting";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function SignInPage() {
  let redirect = useHistory();
  const { user, setUser } = useContext(UserContext);
  let [signIn, setSignIn] = React.useState({
    username: "",
    password: "",
  });
  const changeInput = (event) => {
    let field = event.target.name;
    let value = event.target.value;

    setSignIn((prev) => {
      return { ...prev, [field]: value };
    });
  };

  useEffect(() => {
    if (user) redirect.push("/dashboard");
  });
  let [errorStyle, setErrorStyle] = useState({ display: "none" });

  const makeErrorVisible = () => setErrorStyle({ display: "block" });
  const makeErrorHidden = () => setErrorStyle({ display: "none" });

  const onSubmit = async (event) => {
    event.preventDefault();

    console.log("input", signIn);
    //@TODO: Check if the necessary fields are filled or not.

    // Check with the database if the account exists
    // let res = await axios.post(backend.url_path + backend.signin, signIn);
    await axios.post("/client/login", signIn).then((res) => {
      console.log("RES - ");
      console.log(res);

      if (res.status === 200) {
        //response received.
        if (res.data) {
          // @TODO: backend response
          if (res.data.status.code === 401) {
            //login success
            // data received.

            makeErrorHidden();

            setUser(res.data.data);
            redirect.push("/dashboard");
          } else if (res.data.status.code === 404) {
            // signin failed: record not found
            console.error("ERROR: Invalid Credentials");
            setUser(res.data.data);
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
              <Form.Control required type="email" placeholder="Enter email" name="username" onChange={(e) => changeInput(e)} />
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
