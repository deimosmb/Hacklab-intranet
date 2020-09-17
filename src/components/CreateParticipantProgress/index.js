import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextArea, Button } from "./../../core/Form";
import { Message, Text } from "./../../core/message";
import { CreateParticipantProgressApi } from "./CreateParticipantProgressApi";
import { validate, min, required } from "./../../core/Validation";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./index.scss";
import { addProgress } from "../../actions/ProgressActions";

export default function CreateParticipantPogress({ setActive, active }) {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [data, setData] = useState({ participantId: id, content: "" });
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (event) => {
    const { value, name } = event.target;
    handleValidation(event);
    return setData((prevstate) => {
      return { ...prevstate, [name]: value };
    });
  };

  const rules = {
    content: [(v) => required(v), (v) => min(v, 10)],
  };

  const handleValidation = (event) => {
    const { value, name } = event.target;
    const errors = {};
    validate({ name, value, rules, errors });
    setValidationErrors({ ...errors });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    Object.keys(data).forEach((name) => {
      validate({ name, value: data[name], rules: rules, errors });
    });
    setValidationErrors({ ...errors });

    if (Object.keys(errors).filter((e) => errors[e] !== null).length === 0) {
      setData((prev) => ({ ...prev, content: "" }));
      setActive(false);
      return CreateParticipantProgressApi(
        data,
        (json) => dispatch(addProgress([json])),
        (error) => console.log(error)
      );
    }
  };

  return (
    <form
      className={`progress-form ${active ? "progress-form-transition" : ""}  `}
      onSubmit={handleSubmit}
    >
      <TextArea
        className="progress-TextArea"
        title="Nieuwe Traject notitie"
        name="content"
        onBlur={handleValidation}
        onChange={handleChange}
        value={data.content}
      />
      <div className="progress-footer">
        <Message>
          <Text className="error">{validationErrors.content}</Text>
        </Message>
        <Button name="TOEVOEGEN" className="button-small progress-button" />
      </div>
    </form>
  );
}

CreateParticipantPogress.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
};
