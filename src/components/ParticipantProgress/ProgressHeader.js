import React from "react";
import "./index.scss";

export const ProgressHeader = ({ active, setActive }) => (
  <div className="progress-header">
    <div>
      <span>VOORTGANG</span>
      <button
        className="progress-addprogress fa fa-plus"
        type="button"
        onClick={() => setActive(!active)}
      >
        {" "}
        NIEUWE NOTITIE
      </button>
    </div>
  </div>
);
