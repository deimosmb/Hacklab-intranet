import React, { useEffect, useRef } from "react";

export const ModalClose = ({ onCloseModal }) => {
  const modalCloseButton = useRef(null);

  useEffect(() => {
    modalCloseButton.current.focus();
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
      <svg className="_modal-close-icon" viewBox="0 0 40 40">
        <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
      </svg>
    </button>
  );
};
