import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

export const ContentHeader = ({ children }) => (
  <div className="profile-header">
    <div>{children}</div>
  </div>
);

ContentHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
