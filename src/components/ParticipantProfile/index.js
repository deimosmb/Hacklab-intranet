import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ProfileItem } from "./Profile";
import { ParticipantProfileHeader } from "./../ParticipantProfileHeader";
import ChangeGenericParticipant from "./../ChangeParticipant/Generic";
import { ModalActivation } from "./../../core/Modal";
import { Notification } from "./../../core/Notification";
import { useLocations } from "./../../hooks";
import "./index.scss";

const Profile = ({ data }) => {
  const { name, phonenumber, email, location_id, source, status } = data;

  const [active, setActive] = useState(false);
  const [success, setSuccess] = useState(false);
  const [location, setLocation] = useState({});
  const locationData = useLocations();

  useEffect(() => {
    setLocation(locationData.filter((l) => l.uid === location_id)[0]);
  }, [locationData, location_id]);

  const handleOnClick = () => {
    setActive(!active);
    setSuccess(false);
  };

  //const newData = { ...data, ...location };
  //data.location = location ? location.name : "";

  const changedData = {
    data,
    location,
    active,
    setActive,
    setSuccess,
    success,
  };

  return (
    <>
      <ParticipantProfileHeader>
        <span>ALGEMENE INFORMATIE</span>
        {/* <IconButton onClick={handleOnClick} /> */}
        <ModalActivation
          style={{ paddingBottom: "0.2rem" }}
          onClick={handleOnClick}
        >
          <i className="icon fa fa-edit" />
        </ModalActivation>
      </ParticipantProfileHeader>

      <div className="profile profile-generic">
        <ProfileItem
          name={location ? location.name : ""}
          label="Hacklab locatie"
        />
        <ProfileItem name={status} label="Status" />
        <ProfileItem name={source} label="Bron" />
        <ProfileItem name={phonenumber} label="Telefoonnummer" />
        <ProfileItem name={email} label="E-mail" />

        {success && (
          <Notification
            onAnimationEnd={() => setSuccess(false)}
            color="success"
            message={`De algemene gegevens van de deelnemer ${name} zijn aangepast!`}
          />
        )}
      </div>

      <ChangeGenericParticipant {...changedData} />
    </>
  );
};

Profile.propTypes = {
  data: PropTypes.shape({
    uid: PropTypes.string,
    phonenumber: PropTypes.string,
    email: PropTypes.string,
    location: PropTypes.shape({
      uid: PropTypes.string,
      name: PropTypes.string,
    }),
    source: PropTypes.string,
    status: PropTypes.string,
  }),
};

export default Profile;
