const intitialState = {
  data: [],
  status: false,
  debug: false,
  successState: false,
};

const reducer = (state = intitialState, action) => {
  switch (action.type) {
    case "CHANGE_LOCATION_SUCCESSSTATE":
      if (state.debug)
        console.log(
          `STORE, CHANGE_LOCATION_SUCCESSSTATE: 
        Change the success state for adding a new location. 
        Payload: `,
          state.successState
        );
      return {
        ...state,
        successState: !state.successState,
      };

    case "ALL_LOCATIONS":
      if (state.debug)
        console.log(
          `STORE, ALL_LOCATIONS: 
        Add all locations from localstorage(database).
        Payload: `,
          action.payload
        );
      return {
        ...state,
        data: [...action.payload],
        status: true,
      };
    case "ADD_LOCATION":
      if (state.debug)
        console.log(
          `STORE, ADD_LOCATION: 
        Added an new location (Create). 
        Payload: `,
          action.payload
        );
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    case "CHANGE_LOCATION":
      if (state.debug)
        console.log(
          `STORE, CHANGE_LOCATION: 
      Change a specific location(Change). 
      Payload: `,
          action.payload
        );
      return {
        ...state,
        data: state.data.map((location) => {
          if (location.uid === action.payload.uid) {
            return { ...location, ...action.payload };
          }
          return location;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
