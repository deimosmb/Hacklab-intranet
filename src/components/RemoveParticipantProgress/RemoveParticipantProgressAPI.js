//later to be replaced by real server json calls

export const RemoveParticipantProgressAPI = (
  { ...values },
  callback,
  error
) => {
  const existing = localStorage.getItem("participantprogress");
  const data = existing ? JSON.parse(existing) : [];

  if (existing.length === 0)
    return error("Er zijn geen items om te verwijderen");
  const filteredvalues = data.filter(
    (progress) =>
      progress.uid !== values.uid &&
      progress.particpant_id === values.particpant_id
  );
  if (data.length === filteredvalues)
    return error("Te verwijderen item bestaat niet!");
  localStorage.setItem(
    "participantprogress",
    JSON.stringify([...filteredvalues])
  );
  return callback(values);
};
