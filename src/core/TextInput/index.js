import React from "react";
import PropTypes from "prop-types";
import "./../index.scss";

export const TextInput = ({ name, title, ...rest }) => (
  <input className="textinput" id={name} type="text" name={name} {...rest} />
);

TextInput.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  rest: PropTypes.object,
};
