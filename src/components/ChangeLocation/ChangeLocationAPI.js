//later to be replaced by real server json calls

export const ChangeLocationAPI = (values, callback, error) => {
  const existing = localStorage.getItem("locations");
  const data = existing ? JSON.parse(existing) : [];

  const filteredvalues = data.map((location) => {
    if (location.uid === values.uid) return { ...location, ...values };
    return location;
  });

  if (existing && filteredvalues.length > 0) {
    localStorage.setItem("locations", JSON.stringify([...filteredvalues]));
    const json = values;
    return callback(json);
  }

  return error();
};
