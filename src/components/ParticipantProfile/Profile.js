import React from "react";

export const ProfileItem = (props) => (
  <div className="profile-data">
    {props.label && <span className="profile-label">{props.label}</span>}
    {props.name}
  </div>
);
