import React from "react"

import {
   BroserRouter as Browser, 
   Link,
   Route,
   Switch,
   useHistory
} from "react-router-dom";

function NavElementList(props) {
   return (
      <ul className="navbar-nav ml-auto mr-0 my-2 my-lg-0">
         {props.children}
      </ul>
   )
}

function NavElement(props) {
   let redirect = useHistory();

   const OnClick = async function(event) {
      redirect.push(props.to);
   }

   return (
      <li className="nav-item mr-2 app-navbar-element" onClick={OnClick}>
         {props.value}
         {/* <Link className="app-navbar-link" to={props.to} > {props.value} </Link> */}
      </li>
   );
}


function Navbar () {
   return (
   <div> 
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
         <a className="navbar-brand text-light"> Brand_Icon </a>

         <NavElementList>
            <NavElement value="Home" to="/" />
            <NavElement value="About" to="/about" />
            <NavElement value="Register" to="/register" />
            <NavElement value="Sign In" to="/signin" />
         </NavElementList>
      </nav>
   </div>
   );
}


export default Navbar;