import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

const IconButton = ({ icon, onClick, ...rest }) => {
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

IconButton.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
  rest: PropTypes.object,
};

export default IconButton;
