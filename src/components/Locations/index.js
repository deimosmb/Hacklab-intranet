import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GetLocationsAPI } from "./LocationsAPI";
import { Button } from "./../../core/Form";
import { LocationItem } from "./LocationItem";
import { useSelector, useDispatch } from "react-redux";
import { ParticipantProfileHeader } from "./../ParticipantProfileHeader";
import {
  allLocations,
  changeLocationSuccessState,
} from "./../../actions/LocationActions";
import { Notification } from "./../../core/Notification";

//list of locations
export default function Locations() {
  const { data, status, debug, successState } = useSelector(
    (state) => state.LocationsReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // if (!status) {
    GetLocationsAPI(
      (json) => {
        if (debug) console.log("FIRST CALL OF ALL LOCATIONS JSON: ", json);
        dispatch(allLocations(json));
      },
      (error) => console.log(error)
    );
    //}
  }, [debug, dispatch, status]);

  return (
    <>
      <ParticipantProfileHeader>
        <span>LOCATIES</span>
        <Link to="/nieuwelocatie" style={{ padding: 0 }}>
          <Button
            className="fa fa-plus button-inverse"
            name=" NIEUWE LOCATIE"
          />
        </Link>
        {successState && (
          <Notification
            onAnimationEnd={() => dispatch(changeLocationSuccessState())}
            color="success"
            message={`Nieuwe locatie toegevoegd!`}
          />
        )}
      </ParticipantProfileHeader>
      {data.length > 0 ? (
        data.map((value) => <LocationItem key={value.uid} values={value} />)
      ) : (
        <div>Er zijn nog geen locaties toegevoegd!</div>
      )}
    </>
  );
}
