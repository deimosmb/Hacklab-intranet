import React from "react";
import PropTypes from "prop-types";
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

ModalActivation.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  rest: PropTypes.object,
};
