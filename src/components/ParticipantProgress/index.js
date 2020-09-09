import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ParticipantProgressApi } from "./ParticipantProgressApi";
import { ProgressItem } from "./ProgressItem";
import CreateParticipantProgress from "./../CreateParticipantProgress";
import { ParticipantsContext } from "./../../context/participants-context";
import { ParticipantProfileHeader } from "./../ParticipantProfileHeader";

function ParticipantsProgress() {
  const [active, setActive] = useState(false);
  const [state, dispatch] = useContext(ParticipantsContext);
  const [isActiveClass, setIsActiveClass] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (state.progress.filter((a) => a.participantId === id).length === 0) {
      ParticipantProgressApi(
        (json) => {
          dispatch({
            type: "ADD_PROGRESS",
            loading: true,
            id: id,
            payload: json,
          });
        },
        (error) => console.log(error),
        id
      );
    }
  }, [id, dispatch, state.progress]);

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
      <CreateParticipantProgress
        active={active}
        setActive={setActive}
        id={id}
      />
      {state.progress.filter((a) => a.participantId === id).length === 0
        ? "Er is nog geen voortang van deze deelnemer toegevoegd. Klik op nieuwe notitie om voortang toe te voegen"
        : state.progress
            .filter((a) => a.participantId === id)
            .map((value) => (
              <ProgressItem
                key={value.uid}
                values={{ isActiveClass, setIsActiveClass, ...value }}
              />
            ))}
    </div>
  );
}

export default ParticipantsProgress;
