import React, { useState, useContext } from "react";
import { TextArea, Button } from "./../../core/Form";
import { Message, Text } from "./../../core/message";
import { ParticipantsContext } from "./../../context/participants-context";
import { ChangeProgressApi } from "./../ChangeParticipantProgress/ChangeProgressApi";
import { validate, required, min } from "./../../core/Validation";

export const ChangeProgress = ({ values, onBlur, setIsActiveClass }) => {
  const { uid, content, created_at, updated_at } = values;

  const [, dispatch] = useContext(ParticipantsContext);

  const [value, setValue] = useState(content);

  const [validationErrors, setValidationErrors] = useState({});

  const handleOnChange = (event) => {
    const { value } = event.target;
    console.log(validationErrors);
    handleValidation(event);
    return setValue(value);
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

  const finalValidation = (event, data) => {
    event.preventDefault();
    const errors = {};
    Object.keys(data).forEach((name) => {
      validate({ name, value: data[name], rules: rules, errors });
    });
    setValidationErrors({ ...errors });
    if (Object.keys(errors).filter((e) => errors[e] !== null).length !== 0) {
      console.log("SHITTTT");
      return true;
    }
    return false;
  };

  const onChangeProgressContent = (event) => {
    if (value !== content) {
      const values = { uid, content: value, created_at, updated_at };
      if (!finalValidation(event, values)) {
        console.log("this cant run");
        ChangeProgressApi(
          values,
          (json) => {
            dispatch({
              type: "CHANGE_PROGRESS",
              payload: json,
            });
          },
          (error) => console.error(error)
        );
        return setIsActiveClass({ [uid]: false });
      }
    }
    setIsActiveClass({ [uid]: false });
  };

  return (
    <form onSubmit={onChangeProgressContent}>
      <TextArea
        style={{ height: "9rem" }}
        autoFocus
        value={value}
        onChange={handleOnChange}
        onBlur={onBlur}
        name="content"
      />
      <div className="progress-footer">
        <Message>
          <Text className="error">{validationErrors.content}</Text>
        </Message>
        <Button
          name="Aanpassen"
          onMouseDown={(event) => event.preventDefault()}
          onClick={onChangeProgressContent}
        ></Button>
      </div>
    </form>
  );
};
