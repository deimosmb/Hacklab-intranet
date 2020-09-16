import React from "react";
import { toggleScrollLock } from "./index";

export const ModalActivation = ({ children, onClick, ...rest }) => {
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
