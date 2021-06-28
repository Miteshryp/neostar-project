import React, { useState, useEffect } from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import axios from "../utils/backend_setting";
import logo from "../assets/images/neostarlogo.png";
function NavbarTop() {
  const [user, setuser] = useState(0); //Not logged in
  console.log(user);
  useEffect(() => {
    const checkUser = async () => {
      await axios.get("/signin").then((res) => {
        if (res.status === 200) {
          // response received.
          if (res.data.status.code === 401) {
            // signin successful;
            setuser(res.data.data);
          }
        }
      });
    };
    checkUser();
  }, []);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <Image src={logo} fluid style={{ width: "8rem" }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>

          {user ? (
            <>
              <Nav.Link href="/logout">Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/signin">Login</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarTop;
