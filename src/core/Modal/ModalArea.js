import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { toggleScrollLock } from "./index";
import "./index.scss";

import { ModalClose } from "./ModalClose";

function ModalArea(props) {
  const aria = useRef(null);

  const [active, setActive] = useState(false);

  useEffect(() => {
    aria.current.focus();
    setActive(true);
  }, []);

  //when clicked on the transparent outside section of the modal
  const onClickOutside = (event) => {
    if (aria.current && aria.current.contains(event.target)) {
      console.log(aria.current, event.target);
      return;
    }
    handleTransition();
  };

  const handleTransition = () => {
    setActive(false);
  };

  const onCloseModal = () => {
    if (!active) {
      props.onClose();
      toggleScrollLock();
      aria.current.blur();
    }
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
      className={`modal-container ${
        active ? "modal-container-transition" : ""
      }  `}
      onKeyDown={onKeyDown}
      onClick={onClickOutside}
    >
      <div
        className={`modal-area ${active ? "modal-area-transition" : ""}  `}
        onTransitionEnd={onCloseModal}
        ref={aria}
        onFocus={() => console.log("focused", active)}
      >
        <ModalClose onCloseModal={handleTransition} />
        <div className="modal-body">{props.children}</div>
      </div>
    </aside>,
    document.getElementById("root")
  );
}

export default ModalArea;
