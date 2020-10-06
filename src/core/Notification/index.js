import React from "react";
import PropTypes from "prop-types";
import { MessageBlock, Text, Message, MessageFlat } from "./../message";

export const Notification = ({
  type = "block",
  message = "",
  color = "success",
  onAnimationEnd = null,
  ...rest
}) => {
  //type: block/flat/text(only), message: text string, className: any class , onAnimationEnd: callback func
  switch (type) {
    case "block":
      return (
        <MessageBlock color={color} onAnimationEnd={onAnimationEnd} {...rest}>
          <Text color={color}>{message}</Text>
        </MessageBlock>
      );
    case "flat":
      return (
        <MessageFlat color={color} onAnimationEnd={onAnimationEnd} {...rest}>
          <Text color={color}>{message}</Text>
        </MessageFlat>
      );
    case "text":
      return (
        <Message color={color} onAnimationEnd={onAnimationEnd} {...rest}>
          <Text color={color}>{message}</Text>
        </Message>
      );
    default:
      break;
  }
};

Notification.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  className: PropTypes.string,
  onAnimationEnd: PropTypes.func,
};
