import React from "react";
import "./../index.scss";

export const TextInput = ({ name, title, ...rest }) => (
  <input className="textinput" id={name} type="text" name={name} {...rest} />
);
