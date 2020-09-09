//import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

export default function (props) {
  //move it out of the normal dom tree
  return ReactDOM.createPortal(
    // <div className="modal-background">
    //   <main className="modal-content">
    //     <span className="modal-close" onClick={props.onClose}>
    //       &times;
    //     </span>
    //     {props.children}
    //     testing the shit
    //   </main>
    // </div>
    props.children,
    document.body
  );
}
