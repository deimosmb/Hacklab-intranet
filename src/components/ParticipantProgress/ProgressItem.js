import React, { useState, useEffect } from "react";
import { TextBlock } from "./../../core/message";
import { ChangeProgress } from "./../ChangeParticipantProgress";
import PropTypes from "prop-types";
import "./index.scss";

export const ProgressItem = ({ values }) => {
  const {
    uid,
    content,
    created_at,
    updated_at,
    isActiveClass,
    setIsActiveClass,
  } = values;

  useEffect(() => {
    setIsActiveClass((prev) => ({ ...prev, [uid]: false }));
  }, [setIsActiveClass, uid]);

  const [isShown, setIsShown] = useState(false);

  const handleOnMouseDown = (event) => {
    event.preventDefault();
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
  };

  return (
    <div
      className="progress-item"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => {
        setIsShown(false);
      }}
    >
      <header className="progress-item-header">
        {isShown && (
          <div className="edit">
            <i
              className="fa fa-edit"
              onMouseDown={handleOnMouseDown}
              onClick={handleOnClick}
            ></i>
            <i className="fa fa-trash"></i>
          </div>
        )}
        <span>{created_at}</span>
        <span>{updated_at ?? null}</span>
      </header>
      {isActiveClass[uid] && (
        <ChangeProgress
          values={values}
          onBlur={handleOnClick}
          setIsActiveClass={setIsActiveClass}
        />
      )}
      {!isActiveClass[uid] && <TextBlock>{content}</TextBlock>}
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
  }),
};
