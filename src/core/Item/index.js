import React from "react";
import PropTypes from "prop-types";
import "./item.scss";

export const ItemHeader = ({ name }) => (
  <div className="item-header">{name}</div>
);

export const ItemLine = ({ children }) => (
  <div className="item-line">{children}</div>
);

export const Item = ({ onClick, children }) => (
  <div onClick={onClick} className="item">
    {children}
  </div>
);

const handleOnMouseDown = (event) => {
  event.preventDefault();
};

export const ItemChangeIcon = ({ type, onClick, name = "", className }) => (
  <i
    className={`fa fa-${type} item-${className}`}
    onMouseDown={handleOnMouseDown}
    onClick={onClick}
  >
    <span className="item-change-name"> {name}</span>
  </i>
);

export const ItemChangeContainer = (props) => {
  return (
    <div className={`item-change ${props.className}`}>{props.children}</div>
  );
};

ItemChangeIcon.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
};

Item.propTypes = {
  name: PropTypes.string,
};

ItemHeader.propTypes = {
  name: PropTypes.string,
};

ItemLine.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
