import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ParticipantsApi } from "./ParticipantsApi";
import { ParticipantsItem } from "./ParticipantsItem";
import { useSelector, useDispatch } from "react-redux";
import { allParticipants } from "./../../actions/ParticipantActions";
import { useLocations } from "./../../hooks";

//list of participants
export default function ParticipantsList() {
  const history = useHistory();

  const locations = useLocations();

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

  if (data.length === 0)
    return <div>Er zijn nog geen deelnemers toevoegd of actief gemaakt!</div>;

  return data.map((value) => (
    <ParticipantsItem
      key={value.uid}
      onClick={() => history.push(`/deelnemer/${value.uid}`)}
      {...value}
      locations={locations}
    />
  ));
}
