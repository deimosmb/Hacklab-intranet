import React from "react";
import PropTypes from "prop-types";
import "./item.scss";

export const ItemHeader = ({ name }) => (
  <div className="item-header">{name}</div>
);

ItemHeader.propTypes = {
  name: PropTypes.string,
};

export const ItemLine = ({ children }) => (
  <div className="item-line">{children}</div>
);

ItemLine.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const Item = ({ onClick, children }) => (
  <div onClick={onClick} className="item">
    {children}
  </div>
);

Item.propTypes = {
  name: PropTypes.string,
};

export const ItemChangeIcon = ({
  type,
  onClick,
  className,
  children,
  ...rest
}) => (
  <i
    className={`fa fa-${type} item-${className}`}
    onMouseDown={(e) => e.preventDefault}
    onClick={onClick}
    {...rest}
  >
    {children}
  </i>
);

ItemChangeIcon.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  rest: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const ItemChangeName = ({ className, children, ...rest }) => (
  <span className={`item-change-name ${className}`} {...rest}>
    {children}
  </span>
);

ItemChangeName.propTypes = {
  className: PropTypes.string,
  rest: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const ItemChangeContainer = ({ className, children, ...rest }) => {
  return (
    <div className={`item-change ${className}`} {...rest}>
      {children}
    </div>
  );
};

ItemChangeContainer.propTypes = {
  className: PropTypes.string,
  rest: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
