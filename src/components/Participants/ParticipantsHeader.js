import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./../../core/Form";
import { ParticipantProfileHeader } from "./../ParticipantProfileHeader";

//list of participants
const ParticipantsHeader = () => (
  <ParticipantProfileHeader>
    <span>Deelnemers</span>
    <Link to="/nieuwedeelnemer" style={{ padding: 0 }}>
      <Button className="fa fa-plus button-inverse" name=" NIEUWE DEELNEMER" />
    </Link>
  </ParticipantProfileHeader>
);

export default ParticipantsHeader;
