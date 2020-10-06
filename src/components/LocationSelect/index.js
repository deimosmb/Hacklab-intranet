import React from "react";
import { Select } from "../../core/Form";
import { useLocations } from "./../../hooks";

//list of participants
export const LocationSelect = ({
  value,
  setValues,
  values,
  title = "Locatie Hacklab *",
  name = "location",
  ...rest
}) => {
  const options = useLocations().map((l) => ({ uid: l.uid, name: l.name }));

  const setLocationId = (i) => {
    setValues((prevstate) => {
      return {
        ...prevstate,
        location_id: i && i !== "" ? i.uid : null,
      };
    });
  };

  return (
    <Select
      title={title}
      name={name}
      value={options.find((r) => r.uid === value)}
      setValues={setLocationId}
      options={options}
      {...rest}
    />
  );
};
