import React, { useState, useContext } from "react";
import { TextArea, Button } from "./../../core/Form";
import { ParticipantsContext } from "./../../context/participants-context";
import { ChangeProgressApi } from "./../ChangeParticipantProgress/ChangeProgressApi";

export const ChangeProgress = ({ values, onBlur, setIsActiveClass }) => {
  const { uid, content, created_at, updated_at } = values;

  const [, dispatch] = useContext(ParticipantsContext);

  const [value, setValue] = useState(content);

  const handleOnChange = (event) => {
    const { value } = event.target;
    return setValue(value);
  };

  const onChangeProgressContent = () => {
    if (value !== content) {
      const values = { uid, content: value, created_at, updated_at };

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
    }
    setIsActiveClass({ [uid]: false });
  };

  return (
    <div>
      <form onSubmit={onChangeProgressContent}>
        <TextArea
          style={{ height: "9rem" }}
          autoFocus
          value={value}
          onChange={handleOnChange}
          onBlur={onBlur}
        />
        <Button
          name="Aanpassen"
          onMouseDown={(event) => event.preventDefault()}
          onClick={onChangeProgressContent}
        ></Button>
      </form>
    </div>
  );
};
