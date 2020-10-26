import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextBlock } from "./../../core/message";
import { Notification } from "./../../core/Notification";
import { ChangeProgress } from "./../ChangeParticipantProgress";
import { ModalArea } from "../../core/Modal";
import "./index.scss";
import { ProgressItemChangeMenu } from "./ProgressItemChangeMenu";
import { RemoveParticipantProgress } from "../RemoveParticipantProgress";

export const ProgressItem = ({ values }) => {
  const {
    uid,
    content,
    created_at,
    updated_at,
    participant_id,
    success,
    setSuccess,
  } = values;

  const [isShown, setIsShown] = useState(false);
  const [isShownModal, setIsShownModal] = useState(false);

  const [successChange, setSuccessChange] = useState(false);

  const [isActiveConfirm, setIsActiveConfirm] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [to, setTo] = useState(null);

  const handleOnClickRemove = (e) => {
    setSuccess(false);
    setIsActiveConfirm(!isActiveConfirm);
    setTo(e.target);
  };

  const handleOnClickEdit = () => {
    setIsActive(true);
    setIsShown(false);
    setIsShownModal(false);
    setSuccessChange(false);
  };

  return (
    <>
      <div
        className="progress-item"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => {
          setIsShown(false);
        }}
        onClick={() => {
          setIsShownModal(true);
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
            <ProgressItemChangeMenu
              handleOnClickChange={handleOnClickEdit}
              handleOnClickRemove={handleOnClickRemove}
              className="hideonmobile"
            />
          )}
          <span>{created_at}</span>
          <span>{updated_at ?? null}</span>
        </header>
        <TextBlock>{content}</TextBlock>
      </div>
      {isActiveConfirm ? (
        <RemoveParticipantProgress
          values={{
            setSuccess,
            success,
            isActiveConfirm,
            setIsActiveConfirm,
            uid,
            participant_id,
            to,
          }}
        />
      ) : (
        <></>
      )}
      {isActive && (
        <ChangeProgress
          values={values}
          onBlur={handleOnClickEdit}
          setSuccessChange={setSuccessChange}
          isActive={isActive}
          setIsActive={setIsActive}
        />
      )}
      {isShownModal ? (
        <ModalArea
          type="sliderbottom"
          onClose={() => setIsShownModal(false)}
          desktop={false}
        >
          <ProgressItemChangeMenu
            handleOnClickChange={handleOnClickEdit}
            handleOnClickRemove={handleOnClickRemove}
            className="hideondesktop"
          />
        </ModalArea>
      ) : (
        React.Fragment
      )}
    </>
  );
};

ProgressItem.propTypes = {
  values: PropTypes.shape({
    uid: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    setSuccess: PropTypes.func,
    success: PropTypes.bool,
  }),
};
