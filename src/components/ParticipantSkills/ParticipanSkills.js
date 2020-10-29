import React from "react";
import PropTypes from "prop-types";
import { ContentHeader } from "../ContentHeader";

const ParticipantSkills = () => {
  return (
    <>
      <ContentHeader>
        <span>VAARDIGHEDEN</span>
      </ContentHeader>
      <div className="profile">
        <p>Hier komen de skills / tools van de deelnemer te staan.</p>
      </div>
    </>
  );
};

ParticipantSkills.propTypes = {
  data: PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    purpose: PropTypes.string,
  }),
};

export default ParticipantSkills;
