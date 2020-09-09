//later to be replaced by real server json calls

export const ParticipantsApi = (callback, error) => {
  const response = localStorage.getItem("participants");
  if (response) {
    const json = JSON.parse(response);
    if (json) return callback(json);
    return error("Er ging iets mis, probeer het later nog een keer.");
  }
  return error("Er ging iets mis, probeer het later nog een keer.");
};
