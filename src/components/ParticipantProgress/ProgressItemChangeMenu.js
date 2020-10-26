import React from "react";
import PropTypes from "prop-types";
import { ItemChangeIcon, ItemChangeName } from "./../../core/Item";
import "./index.scss";

export const ProgressItemChangeMenu = ({
  handleOnClickChange,
  handleOnClickRemove,
  className,
}) => {
  return (
    <div className={`edit ${className}`}>
      <ItemChangeIcon type="edit" onClick={handleOnClickChange}>
        {" "}
        <ItemChangeName className="edit-text">Aanpassen</ItemChangeName>
      </ItemChangeIcon>
      <ItemChangeIcon type="trash" onClick={handleOnClickRemove}>
        {" "}
        <ItemChangeName className="edit-text">Verwijderen</ItemChangeName>
      </ItemChangeIcon>
    </div>
  );
};

ProgressItemChangeMenu.propTypes = {
  handleOnClickChange: PropTypes.func,
  handleOnClickRemove: PropTypes.func,
  className: PropTypes.string,
};
