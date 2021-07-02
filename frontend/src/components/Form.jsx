import React from "react";

export default function Form(props) {
  return (
    <div className="app-center app-form-card">
      <div className="card form-signin">
        <h2 className="card-title mt-2"> {props.title} </h2>
        <form className="card-text m-2" action="/" onSubmit={props.onSubmit}>
          {props.children}
          {/* <div className="row">
                  <div className="col">
                     <p> Name: </p>
                  </div>
                  <div className="col">
                     <input id="name" name="name" type="text" placeholder="Name" autoComplete="off" value={displayName} onChange={changeName}></input>
                  </div>
            </div> */}

          {/* <div className="row">
                  <div className="col">
                     <p> Phone No: </p>
                  </div>
                  <div className="col">
                     <input id="phone" name="phone" type="text" placeholder="Phone No." autoComplete="off" value={number} onChange={changePhone}></input>
                  </div>
               </div>

               <button className="btn btn-dark btn-outline-success" type="submit"> Register </button> <br/>
               <Link className="app-link" to="/login"> Already signed up? </Link> */}
        </form>
      </div>
    </div>
  );
}
