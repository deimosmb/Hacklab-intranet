export const allLocations = (payload) => {
  return {
    type: "ALL_LOCATIONS",
    payload,
  };
};

export const addLocation = (payload) => ({
  type: "ADD_lOCATION",
  payload,
});

export const changeLocation = (payload) => ({
  type: "CHANGE_LOCATION",
  payload,
});

export const changeLocationSuccessState = () => ({
  type: "CHANGE_LOCATION_SUCCESSSTATE",
});
