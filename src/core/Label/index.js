import React from "react";
import "./../index.scss";

export const Label = ({ htmlFor, children, ...rest }) => (
  <label className="textlabel" htmlFor={htmlFor} {...rest}>
    {children}
  </label>
);
