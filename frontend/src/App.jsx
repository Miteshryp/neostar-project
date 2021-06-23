import React from "react";
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

function App() {
  return (
    <div className="App">
      <Router>
        <NavbarTop />
        <Switch>
        <Route path="/dashboard" component={Dashboard} />
          <Route path="/signin" component={SignInPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/verify" component={VerifyPage} />
          <Route path="/about" component={AboutPage} />          
          <Route path="/booking" component={BookingPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
