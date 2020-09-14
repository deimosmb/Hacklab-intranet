import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./index.scss";

import { ModalClose } from "./ModalClose";

function ModalArea(props) {
  const aria = useRef(null);

  useEffect(() => {
    aria.current.focus();
  }, []);

  //prevent scrolling after modal is shown
  const toggleScrollLock = () => {
    document.querySelector("html").classList.toggle("scroll-lock");
  };

  //when clicked on the transparent outside section of the modal
  const onClickOutside = (event) => {
    if (aria.current && aria.current.contains(event.target)) {
      console.log(aria.current, event.target);
      return;
    }
    onCloseModal();
  };

  const onCloseModal = () => {
    props.onClose();
    toggleScrollLock();
    aria.current.blur();
  };

  //27 === ESC button
  const onKeyDown = (event) => {
    if (event.keyCode === 27) {
      onCloseModal();
    }
  };

  return ReactDOM.createPortal(
    <aside
      tag="aside"
      aria-modal="true"
      tabIndex="-1"
      role="dialog"
      className="modal-container"
      onKeyDown={onKeyDown}
      onClick={onClickOutside}
    >
      <div
        className="modal-area"
        ref={aria}
        onFocus={() => console.log("focused")}
      >
        <ModalClose onCloseModal={onCloseModal} />
        <div className="modal-body">{props.children}</div>
      </div>
    </aside>,
    document.body
  );
}

export default ModalArea;
