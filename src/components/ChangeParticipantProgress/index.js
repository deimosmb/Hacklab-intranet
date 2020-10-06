import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextArea, Button } from "./../../core/Form";
import { ModalArea } from "./../../core/Modal";
import { Message, Text } from "./../../core/message";
import { ChangeProgressApi } from "./../ChangeParticipantProgress/ChangeProgressApi";
import { validate, required, min } from "./../../core/Validation";
import { useDispatch } from "react-redux";
import { changeProgress } from "../../actions/ProgressActions";

export const ChangeProgress = ({
  values,
  onBlur,
  setIsActiveClass,
  isActiveClass,
  setSuccessChange,
}) => {
  const { uid, content, created_at, updated_at } = values;

  const dispatch = useDispatch();

  const [value, setValue] = useState(content);

  const [validationErrors, setValidationErrors] = useState({});

  const handleOnChange = (event) => {
    const { value } = event.target;
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
      return true;
    }
    return false;
  };

  const onChangeProgressContent = (event) => {
    if (value !== content) {
      const values = { uid, content: value, created_at, updated_at };
      if (!finalValidation(event, values)) {
        ChangeProgressApi(
          values,
          (json) => {
            dispatch(changeProgress(json));
            setSuccessChange(true);
          },
          (error) => console.error(error)
        );
        return setIsActiveClass({ [uid]: false });
      }
    }
    setIsActiveClass({ [uid]: false });
  };

  return (
    <>
      {isActiveClass ? (
        <ModalArea onClose={() => setIsActiveClass({ [uid]: false })}>
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
                <Text color="error">{validationErrors.content}</Text>
              </Message>
              <Button
                name="Aanpassen"
                onMouseDown={(event) => event.preventDefault()}
                onClick={onChangeProgressContent}
              ></Button>
            </div>
          </form>
        </ModalArea>
      ) : (
        <></>
      )}
    </>
  );
};

ChangeProgress.propTypes = {
  setIsActiveClass: PropTypes.func,
  isActiveClass: PropTypes.object,
  onBlur: PropTypes.func,
  values: PropTypes.shape({
    uid: PropTypes.string,
    content: PropTypes.string,
    // created_at: PropTypes.instanceOf(Date),v
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }),
};
