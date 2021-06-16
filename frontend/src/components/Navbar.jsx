import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import logo from "../assets/images/neostarlogo.png";
function NavbarTop() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <Image src={logo} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
          <Nav.Link href="/signin">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarTop;
