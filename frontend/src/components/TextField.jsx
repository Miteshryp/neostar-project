import React from "react"

export default function TextField(props) {
   return (
      <div className="container text-center" >
         <p style={props.style} className={props.class}> {props.value} </p>
      </div>
   )
}