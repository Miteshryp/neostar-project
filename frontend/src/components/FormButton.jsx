import React from "react"

export default function FormButton(props) {

   let {colorMode} = props;
   return (
      <div className="container ml-auto mr-auto mb-3 text-center">
         <button className={`btn btn-${colorMode} btn-lg btn-block btn-outline-success`} type="submit"> {props.value} </button>
      </div>
   );
}