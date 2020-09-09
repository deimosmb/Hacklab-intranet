//later to be replaced by real server json calls

export const ChangeProgressApi = ({ ...values }, callback, error) => {
  const existing = localStorage.getItem("participantprogress");
  const data = existing ? JSON.parse(existing) : [];

  const date = new Date();
  values.updated_at = date.toLocaleDateString();
  const filteredvalues = data.map((progress) => {
    if (progress.uid === values.uid) return { ...progress, ...values };
    return progress;
  });
  localStorage.setItem(
    "participantprogress",
    JSON.stringify([...filteredvalues])
  );

  if (existing) {
    const json = values;
    return callback(json);
  }
  return error("Er ging iets mis");
};
