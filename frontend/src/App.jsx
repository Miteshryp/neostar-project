import React from "react";
import {BrowserRouter as Browser, Switch, Route, Link} from "react-router-dom";

import RegisterPage from "./Register";
import SignInPage from "./Signin";
import AboutPage from "./About"
import HomePage from "./Home"
import VerifyPage from "./Verify"
import BookingPage from "./Booking";

function App() {

  return (
    <div className="App">
      <Browser>
        <Switch>

          <Route path="/signin" component={SignInPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/verify" component={VerifyPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/booking" component={BookingPage} />
          <Route path="/" component={HomePage} />

        </Switch>
      </Browser>
    </div>
  );
}

export default App;
