import React, { useState, useEffect } from "react";
import { TextBlock } from "./../../core/message";
import { Notification } from "./../../core/Notification";
import { ChangeProgress } from "./../ChangeParticipantProgress";
import PropTypes from "prop-types";
import { ModalArea } from "../../core/Modal";
import "./index.scss";
import { RemoveParticipantProgress } from "../RemoveParticipantProgress";

const ProgressItemEditMenu = ({
  handleOnClickChange,
  handleOnClickRemove,
  className,
}) => {
  const handleOnMouseDown = (event) => {
    event.preventDefault();
  };

  return (
    <div className={`edit ${className}`}>
      <i
        className="fa fa-edit"
        onMouseDown={handleOnMouseDown}
        onClick={handleOnClickChange}
      >
        {" "}
        <span className="edit-text">Aanpassen</span>
      </i>
      <i
        className="fa fa-trash"
        onMouseDown={handleOnMouseDown}
        onClick={handleOnClickRemove}
      >
        {" "}
        <span className="edit-text">Verwijderen</span>
      </i>
    </div>
  );
};

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
  const [isShownModal, setIsShownModal] = useState(false);

  const [successChange, setSuccessChange] = useState(false);

  const [isActiveConfirm, setIsActiveConfirm] = useState(false);

  const [to, setTo] = useState(null);

  const handleOnClickRemove = (e) => {
    setSuccess(false);
    setIsActiveConfirm(!isActiveConfirm);
    setTo(e.target);
  };

  const handleOnClickEdit = () => {
    setIsActiveClass((prev) => {
      const prevuid = prev[uid];
      for (const a in prev) {
        prev[a] = false;
      }
      return { ...prev, [uid]: prevuid ? false : true };
    });
    setIsShown(false);
    setIsShownModal(false);
    setSuccessChange(false);
  };

  return (
    <div
      className="progress-item"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => {
        setIsShown(false);
      }}
      onClick={() => {
        console.log("clicked", isShownModal);
        setIsShownModal(!isShownModal);
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
          <ProgressItemEditMenu
            handleOnClickChange={handleOnClickEdit}
            handleOnClickRemove={handleOnClickRemove}
            className="hideonmobile"
          />
        )}
        {isShownModal ? (
          <ModalArea
            type="sliderbottom"
            onClose={() => setIsShown(false)}
            desktop={false}
          >
            <ProgressItemEditMenu
              handleOnClickChange={handleOnClickEdit}
              handleOnClickRemove={handleOnClickRemove}
              className="hideondesktop"
            />
          </ModalArea>
        ) : (
          React.Fragment
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
            to,
          }}
        />
      ) : (
        <></>
      )}
      {isActiveClass[uid] && (
        <ChangeProgress
          values={values}
          onBlur={handleOnClickEdit}
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
