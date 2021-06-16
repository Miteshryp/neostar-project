import React from "react"

export default function FormField(props) {
   return (
      // <div className="row">
      //    <div className="col">
      //       <p> {props.fieldName}: </p>
      //    </div>
      //    <div className="col">
      //       <input id={props.id} name={props.id} type={props.type} placeholder={props.placholder} visibility={props.visibility} autoComplete={props.autoComplete} value={props.value} onChange={props.onChange}></input>
      //    </div>
      // </div>

      
      <input id={props.id} className="form-control" name={props.id} type={props.type} placeholder={props.placeholder} visibility={props.visibility} autoComplete={props.autoComplete} value={props.value} onChange={props.onChange}></input>
   );
}