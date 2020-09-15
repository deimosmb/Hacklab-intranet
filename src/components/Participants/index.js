import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { ParticipantsApi } from "./ParticipantsApi";
import { Button } from "./../../core/Form";
import { Participant } from "./Participant";
import { useSelector, useDispatch } from "react-redux";
import { ParticipantProfileHeader } from "./../ParticipantProfileHeader";
import { allParticipants } from "./../../actions/ParticipantActions";

//list of participants
export default function Participants() {
  const history = useHistory();

  const { data, status, debug } = useSelector(
    (state) => state.ParticipantsReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!status) {
      return ParticipantsApi(
        (json) => {
          if (debug) console.log("FIRST CALL OF ALL PARTICIPANTS JSON: ", json);
          dispatch(allParticipants(json));
        },
        (error) => console.log(error)
      );
    }
  }, [dispatch, debug, status]);

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
      {data.length > 0 ? (
        data.map((value) => (
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
