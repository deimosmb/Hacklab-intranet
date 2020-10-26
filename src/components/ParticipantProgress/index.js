import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Notification } from "./../../core/Notification";
import { ParticipantProgressApi } from "./ParticipantProgressApi";
import { ProgressItem } from "./ProgressItem";
import CreateParticipantProgress from "./../CreateParticipantProgress";
import { ParticipantProfileHeader } from "./../ParticipantProfileHeader";
import { useSelector, useDispatch } from "react-redux";
import { addProgress } from "../../actions/ProgressActions";

function ParticipantsProgress() {
  const [active, setActive] = useState(false);
  const progress = useSelector((state) => state.ProgressReducer.data);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (progress.filter((a) => a.participant_id === id).length === 0) {
      ParticipantProgressApi(
        (json) => {
          dispatch(addProgress(json));
        },
        (error) => console.log(error),
        id
      );
    }
  }, [dispatch, id, progress]);

  return (
    <div className="progress">
      <ParticipantProfileHeader>
        <span>VOORTGANG</span>
        <button
          className="progress-addprogress fa fa-plus"
          type="button"
          onClick={() => setActive(!active)}
        >
          {" "}
          NIEUWE NOTITIE
        </button>
      </ParticipantProfileHeader>
      <CreateParticipantProgress active={active} setActive={setActive} />
      {success && (
        <Notification
          className="participant-progress-notification-error"
          onAnimationEnd={() => setSuccess(false)}
          color="success"
          message="Verwijderen van voorgangs notitie is gelukt!"
        />
      )}
      {progress.filter((a) => a.participant_id === id).length === 0
        ? "Er is nog geen voortang van deze deelnemer toegevoegd. Klik op nieuwe notitie om voortang toe te voegen"
        : progress
            .filter((a) => a.participant_id === id)
            .map((value) => (
              <ProgressItem
                key={value.uid}
                values={{
                  success,
                  setSuccess,
                  ...value,
                }}
              />
            ))}
    </div>
  );
}

export default ParticipantsProgress;
