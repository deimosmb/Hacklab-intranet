import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

export const ParticipantsItem = ({
  name,
  location_id,
  startdate,
  status,
  onClick,
  locations,
}) => (
  <div onClick={onClick} className="participants-item">
    <div>
      <div className="participants-item-header">{name}</div>
      <div className="participants-item-parts">
        <span>
          Hacklab {locations.filter((l) => l.uid === location_id)[0].name}
        </span>
        <span>{startdate}</span>
        <span>{status}</span>
      </div>
      <div className="participants-item-parts">Skills.....</div>
    </div>
    <span className="fa fa-angle-right" />
  </div>
);

ParticipantsItem.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  location: PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
  }),
  startdate: PropTypes.string,
  status: PropTypes.string,
  onClick: PropTypes.func,
};
