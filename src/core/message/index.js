import React from "react";
//import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./index.scss";

export const Message = ({ color, children, ...rest }) => (
  <div className={`message message-${color}`} {...rest}>
    {children}
  </div>
);

Message.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  color: PropTypes.string,
  rest: PropTypes.object,
};

export const MessageFlat = ({ color, className, children, ...rest }) => (
  <div className={`message-flat message-flat-${color} ${className}`} {...rest}>
    {children}
  </div>
);

MessageFlat.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  rest: PropTypes.object,
};

export const MessageBlock = ({ children, className, ...props }) => {
  const color = props.color
    ? `message-block message-block-${props.color}`
    : "message-block";
  //return ReactDOM.createPortal
  return (
    <div {...props} className={`${color} ${className}`}>
      {children}
    </div>
    //,document.getElementById("root")
  );
};

MessageBlock.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  props: PropTypes.object,
};

export const Text = ({ color, children }) => (
  <span className={`message-${color}`}>{children}</span>
);

Text.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  color: PropTypes.string,
};

export const TextBlock = ({ children }) => (
  <p className={`text-block`}>{children}</p>
);

TextBlock.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
