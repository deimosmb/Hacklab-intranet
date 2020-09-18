import React from "react";
//import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./index.scss";

export const Message = ({ children, ...rest }) => (
  <div className="message" {...rest}>
    {children}
  </div>
);

Message.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  rest: PropTypes.object,
};

export const MessageBlock = ({ children, ...props }) => {
  const className = props.className
    ? `message-block message-block-${props.className}`
    : "message-block";
  //return ReactDOM.createPortal
  return (
    <div {...props} className={className}>
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
  props: PropTypes.object,
};

export const Text = ({ className, children }) => (
  <span className={`message-${className}`}>{children}</span>
);

Text.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
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
