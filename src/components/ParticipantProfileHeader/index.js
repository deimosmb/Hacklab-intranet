import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

export const ParticipantProfileHeader = ({ children }) => (
  <div className="profile-header">
    <div>{children}</div>
  </div>
);

ParticipantProfileHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
