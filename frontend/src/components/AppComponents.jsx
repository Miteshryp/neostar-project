import React from "react"

class BasicComponents {

}

class Components extends BasicComponents{ 
   
   Navbar(props) {
      return (
      <div> 
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand text-light"> Brand_Icon </a>

            <ul className="navbar-nav ml-auto mr-0 my-2 my-lg-0">
               <li className="nav-item mr-2">
                  <Link className="app-link" to="/" > Home </Link>
               </li>
               <li className="nav-item mr-2">
                  <Link className="app-link" to="/about" > About </Link>
               </li>
               <li className="nav-item mr-2">
                  <Link className="app-link" to="/signin" > Sign In </Link> 
               </li>
               <li className="nav-item mr-2">
                  <Link className="app-link" to="/register" > Register  </Link>
               </li>

            </ul>
         </nav>
      </div>
      );
   }

   FormComponents = {
      FormButton = function (props) {
         return (
            <div className="container ml-auto mr-auto text-center">
               <button className="btn btn-dark btn-outline-success" type="submit"> {props.value} </button>
            </div>
         );
      },

      FormField = function (props) {
         return (
            <div className="row">
               <div className="col">
                  <p> {props.fieldName}: </p>
               </div>
               <div className="col">
                  <input id={props.id} name={props.id} type={props.type} placeholder={props.placholder} visibility={props.visibility} autoComplete={props.autoComplete} value={props.value} onChange={props.onChange}></input>
               </div>
            </div>
         );
      }
   }



}


class AppComponents extends Components {
   // Create Functions
}


export default new AppComponents();