import React from "react";
import "./index.scss";

export default ({ icon, onClick, ...rest }) => {
  const handleOnMouseDown = (event) => {
    event.preventDefault();
  };

  const iconname = icon !== "remove" ? "fa fa-edit" : "fa fa-trash";

  return (
    <i
      className={`icon ${iconname}`}
      onMouseDown={handleOnMouseDown}
      onClick={onClick}
      {...rest}
    ></i>
  );
};
