const intitialState = {
  data: [],
  debug: false,
};

const reducer = (state = intitialState, action) => {
  switch (action.type) {
    case "ADD_PROGRESS":
      if (state.debug)
        console.log(
          `STORE, ADD_PROGRESS: 
        Added on or more progress items(index and create). 
        Payload: `,
          action.payload
        );
      return {
        ...state,
        data: [...action.payload, ...state.data],
      };
    case "CHANGE_PROGRESS":
      if (state.debug)
        console.log(
          `STORE, CHANGE_PROGRESS: 
        Change progress of the specific participant and progress item (Edit). 
        Payload: `,
          action.payload
        );
      return {
        ...state,
        data: state.data.map((progress) => {
          if (progress.uid === action.payload.uid)
            return { ...progress, ...action.payload };
          return progress;
        }),
      };
    case "REMOVE_PROGRESS":
      return {
        ...state,
        data: state.data.filter(
          (progress) =>
            progress.uid !== action.payload.uid &&
            progress.particpant_id === action.payload.particpant_id
        ),
      };
    default:
      return state;
  }
};

export default reducer;
