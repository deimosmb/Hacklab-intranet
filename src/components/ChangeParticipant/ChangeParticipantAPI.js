//later to be replaced by real server json calls

export const ChangeParticipantAPI = (values, callback, error) => {
  const existing = localStorage.getItem("participants");
  const data = existing ? JSON.parse(existing) : [];

  const mappedValues = data.map((participant) => {
    if (participant.uid === values.uid) return { ...participant, ...values };
    return participant;
  });

  if (existing && mappedValues.length > 0) {
    localStorage.setItem("participants", JSON.stringify([...mappedValues]));
    const json = values;
    return callback(json);
  }

  return error();
};
