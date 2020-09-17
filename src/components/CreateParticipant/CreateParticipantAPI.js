//later to be replaced by real server json calls

export const CreateParticipantAPI = (values, callback, error) => {
  //check if localstorage participants exists
  //parse json if exists else set new array as data
  const existing = localStorage.getItem("participants");
  const data = existing ? JSON.parse(existing) : [];
  //create an uid with date.now wich is unique
  values.uid = Date.now().toString();
  //stringify the new values, spread the data over the array and add the new
  //value object into the localstorage
  localStorage.setItem("participants", JSON.stringify([...data, values]));
  //check if adding new valaus was succesfull
  if (JSON.parse(localStorage.getItem("participants")).length > data.length)
    return callback(values);
  return error("Er ging iets mis");
};
