export const allParticipants = (payload) => {
  return {
    type: "ALL_PARTICIPANTS",
    payload,
  };
};

export const getParticipant = ({ payload }) => ({
  type: "GET_PARTICIPANT",
  payload,
});

export const addParticipant = (payload) => ({
  type: "ADD_PARTICIPANT",
  payload,
});

export const changeParticipant = (payload) => ({
  type: "CHANGE_PARTICIPANT",
  payload,
});

export const changeParticipantSuccessState = () => ({
  type: "CHANGE_PARTICIPANT_SUCCESSSTATE",
});
