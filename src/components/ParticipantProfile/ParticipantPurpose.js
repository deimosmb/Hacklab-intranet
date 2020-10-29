import React, { useState } from "react";
import PropTypes from "prop-types";
import { ContentHeader } from "../ContentHeader";
import { ProfileItem } from "./Profile";
import ChangeGenericParticipant from "./../ChangeParticipant/Purpose";
import IconButton from "./../IconButton";
import { Notification } from "./../../core/Notification";
import { useDispatch, useSelector } from "react-redux";
import { changeParticipantSuccessState } from "./../../actions/ParticipantActions";
import "./index.scss";

const ParticipantGoal = ({ data }) => {
  const [active, setActive] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const { successState } = useSelector((state) => state.ParticipantsReducer);

  const handleOnClick = () => {
    setActive(!active);
    setSuccess(false);
  };

  const { name, purpose } = data;
  const values = {
    setActive,
    setSuccess,
  };
  return (
    <>
      <h2 className="profile-head">{name}</h2>
      <ContentHeader>
        <span>DOEL</span>
        <IconButton onClick={handleOnClick} />
        {successState && (
          <Notification
            onAnimationEnd={() => dispatch(changeParticipantSuccessState())}
            color="success"
            message={`Niewe deelnemer ${name} toegevoegd!`}
          />
        )}
      </ContentHeader>
      <div className="profile">
        {!active && <ProfileItem name={purpose} />}
        {active && <ChangeGenericParticipant {...values} />}
        {success && (
          <Notification
            onAnimationEnd={() => setSuccess(false)}
            color="success"
            message={`Aanpassen van het doel van de deelnemer ${name} is gelukt!`}
          />
        )}
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
