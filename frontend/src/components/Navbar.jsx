import React, { useContext } from "react";
import { Navbar, Nav, Image, Button } from "react-bootstrap";
import logo from "../assets/images/neostarlogo.png";
import { UserContext } from "../contexts/UserContext";
import axios from "../utils/backend_setting";
import { useHistory, Link } from "react-router-dom";

function NavbarTop() {
  const redirect = useHistory();
  const { user, setUser } = useContext(UserContext);
  const logoutUser = () => {
    axios.get("/logout").then((res) => {
      setUser(res.data.data);
      redirect.push("/login");
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
          <Link className="nav-link" to="/">
            Home
          </Link>
          {user ? (
            <>
              <Link className="nav-link" to="/profile">
                Profile
              </Link>

              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>

              <Button variant="danger" onClick={logoutUser}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/register">
                Register
              </Link>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarTop;
