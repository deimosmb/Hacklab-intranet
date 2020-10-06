import React from "react";
import PropTypes from "prop-types";
import { Button } from "./../../core/Form";
import { ModalArea } from "./../../core/Modal";
import { useDispatch } from "react-redux";
import { removeProgress } from "../../actions/ProgressActions";
import { RemoveParticipantProgressAPI } from "./RemoveParticipantProgressAPI";

export const RemoveParticipantProgress = ({ values }) => {
  const {
    uid,
    participant_id,
    setIsActiveConfirm,
    isActiveConfirm,
    setSuccess,
    //success,
  } = values;

  const dispatch = useDispatch();

  const onCancelRemoveparticipantProgress = () => {
    setIsActiveConfirm(false);
  };

  const onRemoveParticipantProgress = () => {
    const values = { uid, participant_id };
    RemoveParticipantProgressAPI(
      values,
      (json) => {
        setSuccess(true);
        dispatch(removeProgress(json));
      },
      (error) => console.json(error)
    );
    setIsActiveConfirm(false);
  };

  return (
    <>
      {isActiveConfirm ? (
        <ModalArea onClose={() => setIsActiveConfirm(false)}>
          <div>
            <p>
              Weet je zeker om de voortgang notitie te verwijderen? Dit kan niet
              ongedaan worden gemaakt!
            </p>
          </div>
          <form style={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              name="Annuleer"
              onMouseDown={(event) => event.preventDefault()}
              onClick={onCancelRemoveparticipantProgress}
            ></Button>
            <Button
              name="Ja"
              onMouseDown={(event) => event.preventDefault()}
              onClick={onRemoveParticipantProgress}
            ></Button>
          </form>
        </ModalArea>
      ) : (
        <></>
      )}
    </>
  );
};

RemoveParticipantProgress.propTypes = {
  setIsActiveClass: PropTypes.func,
  isActiveClass: PropTypes.object,
  onBlur: PropTypes.func,
  values: PropTypes.shape({
    uid: PropTypes.string,
    participant_id: PropTypes.string,
  }),
};
