import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "./utils/backend_setting";

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
import DoctorDashboad from "./pages/DoctorDashboard";
import DoctorHome from "./pages/DoctorHome";

function App() {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    axios.get("/client/login").then((res) => {
      setUser(res.data.data);
    });
  }, [setUser]);

  return (
    <div className="App">
      <Router>
        <NavbarTop />

        <Switch>
          <Route exact path="/" component={HomePage} />

          {/* {user ? (
            <> */}
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/booking" component={BookingPage} />
          {/* </>
          ) : (
            <> */}
          <Route path="/doctor" component={DoctorHome} />
          <Route path="/doctor-dashboard" component={DoctorDashboad} />

          <Route path="/login" component={SignInPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/verify" component={VerifyPage} />
          {/* </>
          )} */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
