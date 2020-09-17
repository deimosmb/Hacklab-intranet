import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { validate, min, required } from "../../core/Validation";
import { ChangeParticipantAPI } from "./ChangeParticipantAPI";
import { Message, Text } from "./../../core/message";
import { TextArea, Button } from "./../../core/Form";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { changeParticipant } from "../../actions/ParticipantActions";

const Purpose = ({ setSuccess, setActive }) => {
  const [validationErrors, setValidationErrors] = useState({});

  const [values, setValues] = useState({});

  const { id } = useParams();

  const { data } = useSelector((state) => state.ParticipantsReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const dataValues = data.filter((d) => d.uid.toString() === id);
    const { purpose } = dataValues[0] ?? "";
    setValues({
      purpose,
    });
  }, [data, id]);

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

  const handleChange = (event) => {
    const { value, name } = event.target;
    handleValidation(event);
    return setValues((prevstate) => {
      return { ...prevstate, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    Object.keys(values).forEach((name) => {
      validate({ name, value: values[name], rules: rules, errors });
    });
    setValidationErrors((prev) => ({ prev, ...errors, success: false }));
    console.log(values);
    //error is set to null when a rule[s] are passed
    const success =
      Object.keys(errors).filter((e) => errors[e] !== null).length === 0;
    if (success) {
      const data = { uid: id, ...values };
      ChangeParticipantAPI(
        data,
        (json) => {
          dispatch(changeParticipant(json));
          console.log(changeParticipant(json));
          setSuccess(true);
        },
        () => {
          console.error(
            "Er ging iets mis met het aanpassen van het doel van de deelnemer"
          );
          setSuccess(false);
        }
      );
      return setActive(false);
    }
  };

  return (
    <form>
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
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button name="AANPASSEN" onClick={handleSubmit} />
      </div>
    </form>
  );
};

Purpose.propTypes = {
  setSuccess: PropTypes.func,
  setActive: PropTypes.func,
};

export default Purpose;
