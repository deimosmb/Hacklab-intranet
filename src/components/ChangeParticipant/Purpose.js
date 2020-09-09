import React, { useContext } from "react";
import { validate, min, required } from "../../core/Validation";
import { ChangeParticipantAPI } from "./ChangeParticipantAPI";
import { ParticipantsContext } from "../../context/participants-context";
import { Message, Text } from "./../../core/message";

const Purpose = (props) => {
  const [, dispatch] = useContext(ParticipantsContext);

  const handleOnBlur = (e) => {
    const values = { [e.target.id]: e.target.textContent };
    handleSubmit(e, values);
  };

  const rules = {
    purpose: [
      (v) => required(v, "Het doel mag niet leeg zijn!"),
      (v) => min(v, 20),
    ],
  };

  const handleSubmit = (event, values) => {
    event.preventDefault();
    const errors = {};
    Object.keys(values).forEach((name) => {
      validate({ name, value: values[name], rules: rules, errors });
    });
    props.setValidationErrors((prev) => ({ prev, ...errors, success: false }));

    //error is set to null when a rule[s] are passed
    const success =
      Object.keys(errors).filter((e) => errors[e] !== null).length === 0;
    if (success) {
      const data = { uid: props.uid, ...values };
      ChangeParticipantAPI(
        data,
        (json) => {
          dispatch({
            type: "CHANGE_PARTICIPANT",
            payload: json,
          });
        },
        () =>
          console.error(
            "Er ging iets mis met het aanpassen van het doel van de deelnemer"
          )
      );
      const s = props.purpose !== values.purpose;
      props.setValidationErrors({ success: s });
      return props.setActive(false);
    }
  };

  return (
    <>
      <div
        className="profile-data profile-editmode"
        style={{ minHeight: "1.5rem" }}
        id="purpose"
        type="text"
        suppressContentEditableWarning={true}
        onBlur={handleOnBlur}
        contentEditable="true"
      >
        {props.purpose}
      </div>
      <Message>
        <Text className="error">{props.validationErrors.purpose}</Text>
      </Message>
    </>
  );
};

export default Purpose;
