//later to be replaced by real server json calls

export const CreateParticipantProgressApi = (
  { ...values },
  callback,
  error
) => {
  const existing = localStorage.getItem("participantprogress");
  const datas = existing ? JSON.parse(existing) : [];
  const date = new Date();
  values.uid = Date.now();
  values.created_at = date.toLocaleDateString();
  const { id, ...restvalues } = values;
  localStorage.setItem(
    "participantprogress",
    JSON.stringify([restvalues, ...datas])
  );

  if (datas) {
    const json = values;
    return callback(json);
  }
  return error("Er ging iets mis");
};
