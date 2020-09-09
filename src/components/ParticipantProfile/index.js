import React, { useState } from "react";
import { ProfileItem } from "./Profile";
import { ParticipantProfileHeader } from "./../ParticipantProfileHeader";
import ChangeGenericParticipant from "./../ChangeParticipant/Generic";
import IconButton from "./../IconButton";
import "./index.scss";

const Profile = ({ data }) => {
  const { phonenumber, email, location, source, status } = data;

  const [active, setActive] = useState(false);

  const handleOnClick = () => {
    setActive(!active);
  };

  const changedData = { ...data, setActive };

  return (
    <>
      <ParticipantProfileHeader>
        <span>ALGEMENE INFORMATIE</span>
        <IconButton onClick={handleOnClick} />
      </ParticipantProfileHeader>
      {!active && (
        <div className="profile profile-generic">
          <ProfileItem name={location} label="Hacklab locatie" />
          <ProfileItem name={status} label="Status" />
          <ProfileItem name={source} label="Bron" />
          <ProfileItem name={phonenumber} label="Telefoonnummer" />
          <ProfileItem name={email} label="E-mail" />
        </div>
      )}
      {active && <ChangeGenericParticipant {...changedData} />}
    </>
  );
};

export default Profile;
