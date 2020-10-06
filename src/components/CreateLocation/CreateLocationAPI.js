//later to be replaced by real server json calls

export const CreateLocationAPI = (values, callback, error) => {
  const existing = localStorage.getItem("locations");
  const data = existing ? JSON.parse(existing) : [];
  values.uid = Date.now().toString();
  localStorage.setItem("locations", JSON.stringify([...data, values]));
  if (JSON.parse(localStorage.getItem("locations")).length > data.length)
    return callback(values);
  return error("Er ging iets mis");
};
