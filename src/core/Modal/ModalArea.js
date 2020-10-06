import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { toggleScrollLock } from "./index";
import "./index.scss";

import { ModalClose } from "./ModalClose";

function ModalArea({
  onClose,
  transist = false,
  type = "normal",
  to,
  children,
}) {
  const aria = useRef(null);

  const [active, setActive] = useState(false);

  useEffect(() => {
    aria.current.focus();
    setActive(true);
  }, []);

  useEffect(() => {
    if (transist) {
      console.log("TANSIST", transist);
      handleTransition();
    }
  }, [transist]);

  //when clicked on the transparent outside section of the modal
  const onClickOutside = (event) => {
    if (aria.current && aria.current.contains(event.target)) {
      return;
    }
    toggleScrollLock();
    handleTransition();
  };

  const handleTransition = () => {
    setActive(false);
  };

  const onCloseModal = () => {
    if (!active) {
      onClose();
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

  const typeCheckingArea = (type) => {
    switch (type) {
      case "normal":
        return `modal-area ${active ? "modal-area-transition" : ""}  `;
      case "sliderbottom":
        return `modal-slider-bottom ${
          active ? "modal-slider-bottom-transition" : ""
        }  `;
      case "sliderleft":
        return `modal-slider-left ${
          active ? "modal-slider-left-transition" : ""
        }  `;
      default:
        break;
    }
  };

  const typeCheckingContainer = (type) => {
    switch (type) {
      case "normal":
        return `modal-container ${
          active ? "modal-container-transition" : ""
        }  `;
      case "sliderbottom":
        return `modal-container-slider ${
          active ? "modal-container-slider-transition" : ""
        }  `;
      case "sliderleft":
        return `modal-container-slider ${
          active ? "modal-container-slider-transition" : ""
        }  `;
      default:
        break;
    }
  };

  return ReactDOM.createPortal(
    <aside
      tag="aside"
      aria-modal="true"
      tabIndex="-1"
      role="dialog"
      type={type}
      className={typeCheckingContainer(type)}
      onKeyDown={onKeyDown}
      onClick={onClickOutside}
    >
      <div
        className={typeCheckingArea(type)}
        onTransitionEnd={onCloseModal}
        ref={aria}
        //onFocus={() => console.log("focused", active)}
      >
        <ModalClose onCloseModal={handleTransition} />
        <div className="modal-body">{children}</div>
      </div>
    </aside>,
    to || document.getElementById("root")
  );
}

ModalArea.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  rest: PropTypes.object,
};

export default ModalArea;
