//later to be replaced by real server json calls
const existing = localStorage.getItem("particlocationsipants");
if (!existing) {
  localStorage.setItem(
    "participants",
    JSON.stringify([
      {
        uid: "location1",
        name: "Leeuwarden",
      },
      {
        uid: "location2",
        name: "Drachten",
      },
      {
        uid: "location3",
        name: "Heerenveen",
      },
    ])
  );
}
export const GetLocations = (callback, error) => {
  const response = localStorage.getItem("locations");
  if (response) {
    const json = JSON.parse(response);
    if (json) return callback(json);
    return error("De opgevraagde informatie is niet beschikbaar");
  }
  return error(
    "De informatie over de gezochte deelnemer bestaat niet of is niet langer meer beschikbaar "
  );
};
