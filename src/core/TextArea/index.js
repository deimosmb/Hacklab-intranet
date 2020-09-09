import React from "react";
import "./../index.scss";

export const TextArea = ({ className, name, ...rest }) => (
  <textarea className="textarea textinput" name={name} id={name} {...rest} />
);
