import React, { useState, useEffect } from "react";
import { TextBlock } from "./../../core/message";
import { Notification } from "./../../core/Notification";
import { ChangeProgress } from "./../ChangeParticipantProgress";
import PropTypes from "prop-types";
import "./index.scss";
import { RemoveParticipantProgress } from "../RemoveParticipantProgress";

export const ProgressItem = ({ values }) => {
  const {
    uid,
    content,
    created_at,
    updated_at,
    participant_id,
    isActiveClass,
    setIsActiveClass,
    success,
    setSuccess,
  } = values;

  useEffect(() => {
    setIsActiveClass((prev) => ({ ...prev, [uid]: false }));
  }, [setIsActiveClass, uid]);

  const [isShown, setIsShown] = useState(false);

  const [successChange, setSuccessChange] = useState(false);

  const [isActiveConfirm, setIsActiveConfirm] = useState(false);

  const handleOnMouseDown = (event) => {
    event.preventDefault();
  };

  const handleOnClickRemove = () => {
    setSuccess(false);
    setIsActiveConfirm(!isActiveConfirm);
  };

  const handleOnClick = () => {
    setIsActiveClass((prev) => {
      const prevuid = prev[uid];
      for (const a in prev) {
        prev[a] = false;
      }
      return { ...prev, [uid]: prevuid ? false : true };
    });
    setIsShown(false);
    setSuccessChange(false);
  };

  return (
    <div
      className="progress-item"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => {
        setIsShown(false);
      }}
    >
      {successChange && (
        <Notification
          type="block"
          onAnimationEnd={() => setSuccessChange(false)}
          color="success"
          message="Aanpassen van voorgangs notitie is gelukt!"
        />
      )}
      <header className="progress-item-header">
        {isShown && (
          <div className="edit">
            <i
              className="fa fa-edit"
              onMouseDown={handleOnMouseDown}
              onClick={handleOnClick}
            ></i>
            <i
              className="fa fa-trash"
              onMouseDown={handleOnMouseDown}
              onClick={handleOnClickRemove}
            ></i>
          </div>
        )}
        <span>{created_at}</span>
        <span>{updated_at ?? null}</span>
      </header>
      {isActiveConfirm ? (
        <RemoveParticipantProgress
          values={{
            setSuccess,
            success,
            isActiveConfirm,
            setIsActiveConfirm,
            uid,
            participant_id,
          }}
        />
      ) : (
        <></>
      )}
      {isActiveClass[uid] && (
        <ChangeProgress
          values={values}
          onBlur={handleOnClick}
          setSuccessChange={setSuccessChange}
          setIsActiveClass={setIsActiveClass}
          isActiveClass={isActiveClass}
        />
      )}
      <TextBlock>{content}</TextBlock>
    </div>
  );
};

ProgressItem.propTypes = {
  values: PropTypes.shape({
    uid: PropTypes.string,
    content: PropTypes.string,
    // created_at: PropTypes.instanceOf(Date),
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    isActiveClass: PropTypes.object,
    setIsActiveClass: PropTypes.func,
    setSuccess: PropTypes.func,
    success: PropTypes.bool,
  }),
};
