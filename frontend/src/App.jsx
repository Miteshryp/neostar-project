import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavbarTop from "./components/Navbar";

import RegisterPage from "./pages/Register";
import SignInPage from "./pages/Signin";
import AboutPage from "./pages/About";
import HomePage from "./pages/Home";
import VerifyPage from "./pages/Verify";
import BookingPage from "./pages/Booking";

import "./App.scss";
import Dashboard from "./pages/Dashboard";
import { UserContext } from "./contexts/UserContext";

function App() {
  const { user } = useContext(UserContext);

  return (
    <div className="App">
      <Router>
        <NavbarTop />

        <Switch>
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/" component={HomePage} />

          {console.log("USERNAME", user)}
          {/* {user ? ( */}
          {/* <> */}
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/booking" component={BookingPage} />
          {/* </> */}
          {/* ) : ( */}
          {/* <> */}
          <Route path="/login" component={SignInPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/verify" component={VerifyPage} />
          {/* </> */}
          {/* )} */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
