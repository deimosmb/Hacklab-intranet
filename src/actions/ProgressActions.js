export const addProgress = (payload) => ({
  type: "ADD_PROGRESS",
  payload,
});

export const changeProgress = (payload) => {
  return {
    type: "CHANGE_PROGRESS",
    payload,
  };
};
