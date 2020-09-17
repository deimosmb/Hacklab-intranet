import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

export const Button = ({ name, className, ...rest }) => (
  <button className={`button ${className}`} {...rest}>
    {name}
  </button>
);

Button.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  rest: PropTypes.object,
};
