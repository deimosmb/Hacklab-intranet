import React from "react";
import "./index.scss";

export const Participant = ({ name, location, startdate, status, onClick }) => (
  <div onClick={onClick} className="participants-item">
    <div>
      <div className="participants-item-header">{name}</div>
      <div className="participants-item-parts">
        <span>Hacklab {location}</span>
        <span>{startdate}</span>
        <span>{status}</span>
      </div>
      <div className="participants-item-parts">Skills.....</div>
    </div>
    <span className="fa fa-angle-right" />
  </div>
);
