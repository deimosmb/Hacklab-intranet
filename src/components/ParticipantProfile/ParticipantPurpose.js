import React, { useState } from "react";
import { ParticipantProfileHeader } from "./../ParticipantProfileHeader";
import { ProfileItem } from "./Profile";
import ChangeGenericParticipant from "./../ChangeParticipant/Purpose";
import IconButton from "./../IconButton";
import { MessageBlock, Text } from "./../../core/message";
import "./index.scss";

const ParticipantGoal = ({ data }) => {
  const [active, setActive] = useState(false);
  const [success, setSuccess] = useState(false);
  //const [validationErrors, setValidationErrors] = useState({});

  const handleOnClick = () => {
    setActive(!active);
  };
  const { name, purpose } = data;
  const values = {
    setActive,
    setSuccess,
  };
  return (
    <>
      <h2 className="profile-head">{name}</h2>
      <ParticipantProfileHeader>
        <span>DOEL</span>
        <IconButton onClick={handleOnClick} />
      </ParticipantProfileHeader>
      <div className="profile">
        {!active && <ProfileItem name={purpose} />}
        {active && <ChangeGenericParticipant {...values} />}

        <MessageBlock
          onTransitionEnd={() => setSuccess(false)}
          className={`success ${success ? "message-block-transition" : ""}`}
        >
          <Text className="success">
            Aanpassen van het doel van de deelnemer is gelukt
          </Text>
        </MessageBlock>
      </div>
    </>
  );
};

export default ParticipantGoal;
