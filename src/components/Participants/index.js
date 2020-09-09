import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { ParticipantsApi } from "./ParticipantsApi";
import { Button } from "./../../core/Form";
import { Participant } from "./Participant";
import { ParticipantsContext } from "./../../context/participants-context";
import { ParticipantProfileHeader } from "./../ParticipantProfileHeader";

//list of participants
export default function Participants() {
  const [state, dispatch] = useContext(ParticipantsContext);

  const history = useHistory();

  useEffect(() => {
    if (!state.participants.status) {
      return ParticipantsApi(
        (json) => {
          if (state.debug)
            console.log("FIRST CALL OF ALL PARTICIPANTS JSON: ", json);
          dispatch({
            type: "ALL_PARTICIPANTS",
            payload: json,
          });
        },
        (error) => console.log(error)
      );
    }
  }, [dispatch, state.debug, state.participants.status]);

  return (
    <>
      <ParticipantProfileHeader>
        <span> </span>
        <Link to="/nieuwedeelnemer" style={{ padding: 0 }}>
          <Button
            className="fa fa-plus button-inverse"
            name=" NIEUWE DEELNEMER"
          />
        </Link>
      </ParticipantProfileHeader>
      {state.participants.data.length > 0 ? (
        state.participants.data.map((value) => (
          <Participant
            key={value.uid}
            onClick={() => history.push(`/deelnemer/${value.uid}`)}
            {...value}
          />
        ))
      ) : (
        <div>Er zijn nog geen deelnemers toevoegd of actief gemaakt!</div>
      )}
    </>
  );
}
