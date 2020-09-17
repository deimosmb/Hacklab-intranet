import React from "react";
import PropTypes from "prop-types";
import "./../index.scss";

export const TextArea = ({ className, name, ...rest }) => (
  <textarea className="textarea textinput" name={name} id={name} {...rest} />
);

TextArea.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  rest: PropTypes.object,
};
