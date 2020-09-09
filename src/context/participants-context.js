import React, { useReducer, createContext } from "react";

export const ParticipantsContext = createContext();

const intitialState = {
  participants: {
    data: [],
    status: false,
  },
  progress: [],
  loading: false,
  error: null,
  debug: false,
};

const reducer = (state, action) => {
  if (state.debug) console.log(`STORE, ALL_STATE_DATA: `, state);
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
        progress: [...action.payload, ...state.progress],
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
        progress: state.progress.map((progress) => {
          if (progress.uid === action.payload.uid)
            return { ...progress, ...action.payload };
          return progress;
        }),
      };
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
        participants: { data: [...action.payload], status: true },
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
        participants: {
          ...state.participants,
          data: [action.payload, ...state.participants.data],
        },
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
        participants: {
          ...state.participants,
          data: state.participants.data.map((participant) => {
            if (participant.uid === action.payload.uid)
              return { ...participant, ...action.payload };
            return participant;
          }),
        },
      };
    default:
      throw new Error();
  }
};

export const ParticipantsContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, intitialState);

  return (
    <ParticipantsContext.Provider value={[state, dispatch]}>
      {props.children}
    </ParticipantsContext.Provider>
  );
};
