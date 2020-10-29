import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./../../core/Form";
import { ContentHeader } from "../ContentHeader";

//list of participants
const ParticipantsHeader = () => (
  <ContentHeader>
    <span>Deelnemers</span>
    <Link to="/nieuwedeelnemer" style={{ padding: 0 }}>
      <Button className="fa fa-plus button-inverse" name=" NIEUWE DEELNEMER" />
    </Link>
  </ContentHeader>
);

export default ParticipantsHeader;
