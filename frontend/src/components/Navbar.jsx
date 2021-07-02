import React, { useContext } from "react";
import { Navbar, Nav, Image, Button } from "react-bootstrap";
import logo from "../assets/images/neostarlogo.png";
import { UserContext } from "../contexts/UserContext";
import axios from "../utils/backend_setting";
import { useHistory } from "react-router-dom";

function NavbarTop() {
  const { user, setUser } = useContext(UserContext);
  // const history = useHistory();
  const logoutUser = () => {
    axios.get("/logout").then((res) => {
      console.log(res.data);
      setUser(res.data.data);
    });
  };
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
          {console.log("USER HAI", user)}
          {user ? (
            <>
              <Button variant="danger" onClick={logoutUser}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarTop;
