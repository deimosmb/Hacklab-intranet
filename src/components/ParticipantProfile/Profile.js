import React from "react";
import PropTypes from "prop-types";

export const ProfileItem = (props) => (
  <div className="profile-data">
    {props.label && <span className="profile-label">{props.label}</span>}
    {props.name}
  </div>
);

ProfileItem.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};
