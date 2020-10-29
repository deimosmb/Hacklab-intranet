import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { toggleScrollLock } from "./index";
import "./index.scss";

import { ModalClose } from "./ModalClose";

function ModalArea({
  onClose,
  isTransistion,
  type = "normal",
  to,
  setIsTransistion,
  setIsActive,
  className = null,
  desktop = true,
  mobile = true,
  children,
}) {
  const aria = useRef(null);

  const [active, setActive] = useState(false);

  useEffect(() => {
    aria.current.focus();
    toggleScrollLock();
    setActive(true);
  }, []);

  useEffect(() => {
    if (isTransistion) {
      handleTransition();
    }
  }, [isTransistion]);

  const handleMainTransitionEnded = () => {
    if (isTransistion) {
      setIsActive(false);
      setIsTransistion(false);
    }
  };

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
      handleTransition();
    }
  };

  const typeCheckingContainer = (type) => {
    switch (type) {
      case "normal":
      case "small":
      case "center":
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
      case "sliderright":
        return `modal-container-slider ${
          active ? "modal-container-slider-transition" : ""
        }  `;
      default:
        break;
    }
  };

  const typeCheckingArea = (type) => {
    switch (type) {
      case "small":
        return `modal-area-small ${
          active ? "modal-area-small-transition" : ""
        }  `;
      case "normal":
        return `modal-area-normal ${
          active ? "modal-area-normal-transition" : ""
        }  `;
      case "center":
        return `modal-area-center ${
          active ? "modal-area-center-transition" : ""
        }  `;
      case "sliderbottom":
        return `modal-slider-bottom ${
          active ? "modal-slider-bottom-transition" : ""
        }  `;
      case "sliderleft":
        return `modal-slider-left ${
          active ? "modal-slider-left-transition" : ""
        }  `;
      case "sliderright":
        return `modal-slider-right ${
          active ? "modal-slider-right-transition" : ""
        }  `;
      default:
        break;
    }
  };

  const desktopStyle = desktop ? "desktop" : "mobile-only";
  const mobileStyle = mobile ? "mobile" : "desktop-only";

  return ReactDOM.createPortal(
    <aside
      tag="aside"
      aria-modal="true"
      tabIndex="-1"
      role="dialog"
      type={type}
      className={`${typeCheckingContainer(
        type
      )} ${desktopStyle} ${mobileStyle}`}
      onKeyDown={onKeyDown}
      onClick={onClickOutside}
      onTransitionEnd={handleMainTransitionEnded}
    >
      <div
        className={`${className ? className + " ," : ""} ${typeCheckingArea(
          type
        )}`}
        onTransitionEnd={onCloseModal}
        ref={aria}
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
