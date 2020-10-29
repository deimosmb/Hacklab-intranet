import React, { useEffect, useState } from "react";
import { GetLocationsAPI } from "./../Locations/LocationsAPI";
import { useParams } from "react-router-dom";
import { ProfileItem } from "./../ParticipantProfile/Profile";
import { useSelector, useDispatch } from "react-redux";
import { ContentHeader } from "../ContentHeader";
import { allLocations } from "./../../actions/LocationActions";

//list of locations
export default function Locations() {
  const { data } = useSelector((state) => state.LocationsReducer);

  const { name } = useParams();

  const dispatch = useDispatch();

  const [location, setLocation] = useState({});

  useEffect(() => {
    if (data && data.filter((l) => l.name === name)[0]) {
      return setLocation(data.filter((l) => l.name === name)[0]);
    }
    GetLocationsAPI(
      (json) => {
        setLocation(json.filter((l) => l.name === name)[0]);
        dispatch(allLocations(json));
      },
      (error) => console.log(error)
    );
  }, [data, dispatch, name]);

  return (
    <>
      <ContentHeader>
        <span>LOCATIE </span>
      </ContentHeader>
      <div className="profile profile-generic">
        <ProfileItem name={location.name} label="Hacklab locatie" />
        <ProfileItem name={location.adress} label="Adres" />
        <ProfileItem name={location.place} label="Plaats" />
        {location.description && (
          <ProfileItem name={location.description} label="Beschrijving" />
        )}
      </div>
    </>
  );
}
