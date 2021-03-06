const intitialState = {
  data: [],
  status: false,
  debug: false,
  successState: false,
};

const reducer = (state = intitialState, action) => {
  switch (action.type) {
    case "ALL_PARTICIPANTS":
      if (state.debug)
        console.log(
          `STORE, ALL_PARTICIPANTS: 
        Add all participant from localstorage(database),
        ignore earlier visited single participant(for easier managament). 
        Payload: `,
          action.payload
        );
      return {
        ...state,
        data: [...action.payload],
        status: true,
      };
    case "GET_PARTICIPANT":
      if (state.debug)
        console.log(
          `STORE, GET_PARTICIPANT: 
        Get a single participant. 
        Payload: `,
          action.payload
        );
      return {
        ...state,
        data: [...state.participants.data, action.payload],
      };
    case "ADD_PARTICIPANT":
      if (state.debug)
        console.log(
          `STORE, ADD_PARTICIPANT: 
        Added an new participant (Create). 
        Payload: `,
          action.payload
        );
      return {
        ...state,
        data: [action.payload, ...state.data],
      };

    case "CHANGE_PARTICIPANT":
      if (state.debug)
        console.log(
          `STORE, CHANGE_PARTICIPANT: 
      Change a specific participant(Change). 
      Payload: `,
          action.payload
        );
      return {
        ...state,
        data: state.data.map((participant) => {
          if (participant.uid === action.payload.uid) {
            return { ...participant, ...action.payload };
          }
          return participant;
        }),
      };
    case "CHANGE_PARTICIPANT_SUCCESSSTATE":
      if (state.debug)
        console.log(
          `STORE, CHANGE_PARTICIPANT_SUCCESSSTATE: 
        Change the success state for adding a new participant. 
        Payload: `,
          state.successState
        );
      return {
        ...state,
        successState: !state.successState,
      };
    default:
      return state;
  }
};

export default reducer;
