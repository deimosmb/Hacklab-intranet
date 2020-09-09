import React from "react";
import "./Button.scss";

export const Button = ({ name, className, ...rest }) => (
  <button className={`button ${className}`} {...rest}>
    {name}
  </button>
);
