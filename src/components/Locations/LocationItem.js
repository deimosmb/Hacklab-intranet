import React, { useState } from "react";
import PropTypes from "prop-types";
import { Item, ItemHeader, ItemLine } from "./../../core/Item";
import {
  ItemChangeContainer,
  ItemChangeIcon,
  ItemChangeName,
} from "./../../core/Item";
import { Notification } from "./../../core/Notification";
import { ModalArea } from "../../core/Modal";
import ChangeLocation from "./../ChangeLocation";
import { useHistory } from "react-router-dom";

export const LocationItem = ({ values }) => {
  const [isShown, setIsShown] = useState(false);
  const [isTarget, setistarget] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { name, place, adress, description } = values;

  const history = useHistory();

  const handleOnClick = (e) => {
    setIsShown(true);
    // setIsTranstition(!isTransition);
    setistarget(e.target);
  };

  const editData = { data: values, setIsActive, isActive, setIsSuccess };

  return (
    <>
      <Item onClick={handleOnClick}>
        <div>
          <ItemHeader name={name} />
          <ItemLine>
            {adress ? <span>{adress} , </span> : <span></span>}
            <span>{place}</span>
          </ItemLine>
          <ItemLine>
            <span>{description}</span>
          </ItemLine>
          {isSuccess && (
            <Notification
              onAnimationEnd={() => setIsSuccess(false)}
              color="success"
              message={`De locatie ${name} is aangepast!`}
            />
          )}
        </div>
      </Item>
      {isShown ? (
        <ModalArea
          to={isTarget}
          type="sliderbottom"
          onClose={() => setIsShown(false)}
        >
          <ItemChangeContainer>
            <ItemChangeIcon
              type="arrow-circle-right"
              onClick={() => history.push(`./locatie/${name}`)}
            >
              {" "}
              <ItemChangeName>bekijken</ItemChangeName>
            </ItemChangeIcon>
            <ItemChangeIcon
              type="edit"
              onClick={() => {
                setIsActive(true);
                setIsShown(false);
              }}
            >
              {" "}
              <ItemChangeName>Aanpassen</ItemChangeName>
            </ItemChangeIcon>
            <ItemChangeIcon type="eye-slash">
              {" "}
              <ItemChangeName>Deactiveren</ItemChangeName>
            </ItemChangeIcon>
          </ItemChangeContainer>
        </ModalArea>
      ) : (
        <></>
      )}
      {isActive ? <ChangeLocation {...editData} /> : <></>}
    </>
  );
};

LocationItem.propTypes = {
  name: PropTypes.string,
  place: PropTypes.string,
  adress: PropTypes.string,
  description: PropTypes.string,
};
