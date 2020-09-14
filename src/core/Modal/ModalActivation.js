import React from "react";

export const ModalActivation = ({ children, onClick, ...rest }) => {
  //prevent scrolling after modal is shown
  const toggleScrollLock = () => {
    document.querySelector("html").classList.toggle("scroll-lock");
  };

  const modalClick = () => {
    toggleScrollLock();
    onClick();
  };

  return (
    <button className="modal-button" onClick={modalClick} {...rest}>
      {children}
    </button>
  );
};
