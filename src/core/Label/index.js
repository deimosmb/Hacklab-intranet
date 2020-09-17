import React from "react";
import PropTypes from "prop-types";
import "./../index.scss";

export const Label = ({ htmlFor, children, ...rest }) => (
  <label className="textlabel" htmlFor={htmlFor} {...rest}>
    {children}
  </label>
);

Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  rest: PropTypes.object,
};
