import React, { useContext, useState, useEffect } from "react";
import { validate, min, required } from "../../core/Validation";
import { ChangeParticipantAPI } from "./ChangeParticipantAPI";
import { ParticipantsContext } from "../../context/participants-context";
import { Message, Text } from "./../../core/message";
import { TextArea } from "./../../core/Form";

const Purpose = (props) => {
  const [, dispatch] = useContext(ParticipantsContext);

  const [validationErrors, setValidationErrors] = useState({});

  const [values, setValues] = useState({});
  const { purpose } = props;
  useEffect(() => {
    setValues({
      purpose,
    });
  }, [purpose]);

  const rules = {
    purpose: [
      (v) => required(v, "Het doel mag niet leeg zijn!"),
      (v) => min(v, 20),
    ],
  };

  const handleValidation = (event) => {
    const { value, name } = event.target;
    const errors = {};
    validate({ name, value, rules, errors });
    setValidationErrors((prev) => ({ ...prev, ...errors }));
  };

  // const handleOnBlur = (e) => {
  //   const values = { [e.target.id]: e.target.textContent };
  //   handleSubmit(e, values);
  // };

  const handleChange = (event) => {
    const { value, name } = event.target;
    handleValidation(event);
    return setValues((prevstate) => {
      return { ...prevstate, [name]: value };
    });
  };

  const handleSubmit = (event, values) => {
    event.preventDefault();
    const errors = {};
    Object.keys(values).forEach((name) => {
      validate({ name, value: values[name], rules: rules, errors });
    });
    setValidationErrors((prev) => ({ prev, ...errors, success: false }));

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
      const s = purpose !== values.purpose;
      setValidationErrors({ success: s });
      return props.setActive(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextArea
        name="purpose"
        placeholder="Doel..."
        onChange={handleChange}
        onBlur={handleValidation}
        value={values.purpose}
      />
      <Message>
        <Text className="error">{validationErrors.purpose}</Text>
      </Message>
    </form>
  );
};

export default Purpose;
