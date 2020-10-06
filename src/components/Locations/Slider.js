import React, { useState, useEffect } from "react";
import { ModalArea } from "../../core/Modal";
//import PropTypes from "prop-types";
import { LocationItemicons } from "./LocationItemIcons";
import "./slider.scss";

export const Slider = ({ to, onClose }) => {
  // const [isTransition, setIsTranstition] = useState(false);

  // useEffect(() => {
  //   setIsTranstition(true);
  // }, []);

  return (
    <ModalArea to={to} type="sliderbottom" onClose={onClose}>
      <LocationItemicons />
    </ModalArea>
  );
};
