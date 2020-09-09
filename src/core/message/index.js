import React from "react";
import "./index.scss";

export const Message = ({ children, ...rest }) => (
  <div className="message" {...rest}>
    {children}
  </div>
);

export const MessageBlock = ({ children, ...props }) => {
  const className = props.className
    ? `message-block message-block-${props.className}`
    : "message-block";
  return (
    <div {...props} className={className}>
      {children}
    </div>
  );
};

export const Text = (props) => (
  <span className={`message-${props.className}`}>{props.children}</span>
);

export const TextBlock = (props) => (
  <p className={`text-block`}>{props.children}</p>
);
