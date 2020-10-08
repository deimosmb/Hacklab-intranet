const intitialState = {
  filters: {
    locations: [],
  },
  status: false,
  debug: false,
  successState: false,
};

const reducer = (state = intitialState, action) => {
  switch (action.type) {
    case "ALL_FILTERS":
      if (state.debug)
        console.log(
          `STORE, ALL_FILTERS: 
        Add all filters from localstorage(database).
        Payload: `,
          action.payload
        );
      return {
        ...state,
        filters: { locations: [...action.payload] },
        status: true,
      };
    case "CHANGE_FILTER":
      if (state.debug)
        console.log(
          `STORE, CHANGE_FILTER_SUCCESSSTATE: 
        Change the success state for adding a new filter. 
        Payload: `,
          state.successState
        );
      return {
        ...state,
        filters: {
          [action.filterType]: state.filters[action.filterType].map((f) => {
            if (f.name === action.payload.name) {
              return { ...f, state: action.payload.state };
            }
            return f;
          }),
        },
      };
    default:
      return state;
  }
};

export default reducer;
