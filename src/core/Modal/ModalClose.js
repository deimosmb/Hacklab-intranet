import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export const ModalClose = ({ onCloseModal }) => {
  const modalCloseButton = useRef(null);

  useEffect(() => {
    // modalCloseButton.current.focus();
  }, []);

  const onClose = () => {
    onCloseModal();
    modalCloseButton.current.blur();
  };

  return (
    <button
      aria-label="Close Modal"
      aria-labelledby="close-modal"
      className="_modal-close"
      onClick={onClose}
      ref={modalCloseButton}
    >
      <span id="close-modal" className="_hide-visual">
        Sluiten
      </span>
      <span className="fa fa-times fa-2x"></span>
    </button>
  );
};

ModalClose.propTypes = {
  onCloseModal: PropTypes.func,
};
