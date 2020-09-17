import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetParticipantsProfile } from "./ParticipantProfileAPI";
import { useSelector, useDispatch } from "react-redux";
import "./index.scss";
import { addParticipant } from "../../actions/ParticipantActions";
import PropTypes from "prop-types";

const Data = (props) => {
  const { id } = useParams();

  const { data } = useSelector((state) => state.ParticipantsReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.filter((p) => p.uid.toString() === id)[0]) {
      return props.setData(data.filter((p) => p.uid.toString() === id)[0]);
    }
    GetParticipantsProfile(
      (json) => {
        props.setData(json);
        dispatch(addParticipant(json));
      },
      (error) => console.log(error),
      id
    );
  }, [data, dispatch, id, props]);

  return null;
};

Data.propTypes = {
  setData: PropTypes.func,
};

export default Data;
