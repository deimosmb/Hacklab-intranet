import React, { useState } from "react";
import PropTypes from "prop-types";
import { ProfileItem } from "./Profile";
import { ParticipantProfileHeader } from "./../ParticipantProfileHeader";
import ChangeGenericParticipant from "./../ChangeParticipant/Generic";
import { ModalActivation } from "./../../core/Modal";
import "./index.scss";

const Profile = ({ data }) => {
  const { phonenumber, email, location, source, status } = data;

  const [active, setActive] = useState(false);

  const handleOnClick = () => {
    setActive(!active);
  };

  const changedData = { ...data, active, setActive };

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
        <ProfileItem name={location} label="Hacklab locatie" />
        <ProfileItem name={status} label="Status" />
        <ProfileItem name={source} label="Bron" />
        <ProfileItem name={phonenumber} label="Telefoonnummer" />
        <ProfileItem name={email} label="E-mail" />
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
    location: PropTypes.string,
    source: PropTypes.string,
    status: PropTypes.string,
  }),
};

export default Profile;
