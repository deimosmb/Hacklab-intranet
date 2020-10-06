import React from "react";
import PropTypes from "prop-types";
import { ItemChangeContainer, ItemChangeIcon } from "./../../core/Item";

export const LocationItemicons = ({ className }) => (
  <ItemChangeContainer className={className}>
    <ItemChangeIcon type="edit" name="Aanpassen" />
    <ItemChangeIcon type="eye-slash" name="Deactiveren" />
  </ItemChangeContainer>
);

LocationItemicons.propTypes = {
  className: PropTypes.string,
};
