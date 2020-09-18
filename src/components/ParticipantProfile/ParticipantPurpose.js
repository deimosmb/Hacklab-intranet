import React, { useState } from "react";
import PropTypes from "prop-types";
import { ParticipantProfileHeader } from "./../ParticipantProfileHeader";
import { ProfileItem } from "./Profile";
import ChangeGenericParticipant from "./../ChangeParticipant/Purpose";
import IconButton from "./../IconButton";
import { MessageBlock, Text } from "./../../core/message";
import "./index.scss";

const ParticipantGoal = ({ data }) => {
  const [active, setActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [success, setSuccess] = useState(false);
  //const MessageBlockRef = useRef(null);
  const [transition, setTransition] = useState("message-block-transition");
  //const [validationErrors, setValidationErrors] = useState({});

  const handleOnClick = () => {
    //if (counter === 0 || counter === 5) {
    // MessageBlockRef.current.transitionstart = () => console.log("STARED");
    // console.log(MessageBlockRef.current);
    //MessageBlockRef.current.transitionCancel();
    // console.log(transition);
    // setTransition("");
    setActive(!active);

    //}
  };

  const { name, purpose } = data;
  const values = {
    setTransition,
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
          onTransitionEnd={() => {
            setSuccess(false);
            setCounter((prev) => (prev === 5 ? 0 : (prev += 1)));
            console.log("SUCCCESS", success, counter);
          }}
          className={`success ${success ? transition : ""}`}
        >
          <Text className="success">
            {`Aanpassen van het doel van de deelnemer ${name} is gelukt`}
          </Text>
        </MessageBlock>
      </div>
    </>
  );
};

ParticipantGoal.propTypes = {
  data: PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    purpose: PropTypes.string,
  }),
};

export default ParticipantGoal;
