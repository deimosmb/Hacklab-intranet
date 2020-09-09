import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ParticipantsContext } from "./../../context/participants-context";
import { GetParticipantsProfile } from "./ParticipantProfileAPI";
import "./index.scss";

const Data = (props) => {
  const [state, dispatch] = useContext(ParticipantsContext);

  const { id } = useParams();

  useEffect(() => {
    if (
      state.participants.data &&
      state.participants.data.filter((p) => p.uid.toString() === id)[0]
    ) {
      return props.setData(
        state.participants.data.filter((p) => p.uid.toString() === id)[0]
      );
    }
    GetParticipantsProfile(
      (json) => {
        props.setData(json);
        dispatch({
          type: "ADD_PARTICIPANT",
          payload: json,
        });
      },
      (error) => console.log(error),
      id
    );
  }, [dispatch, id, props, state.participants.data]);

  return null;
};

export default Data;
