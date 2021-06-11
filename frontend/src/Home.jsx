import React from "react";

import {
   BrowserRouter as Browser,
   Link, 
   Switch,
   Route
} from "react-router-dom";

import RegisterPage from "./Register"
import SignInPage from "./Signin"
import AboutPage from "./About"


// Components
import Navbar from "./Components/Navbar"

export default function HomePage() {
   const para = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."

   return (
      <div>
         <Navbar />

         <div className="intro-section">
            <div className="row">
               <div className="col">
                  <h1 className="app-home-title"> The Home Page </h1>
                  <p>
                     {para}
                  </p>
               </div>

               <div className="col intro-section-image">
               </div> 
            </div>
         </div>
      </div>
   );
}