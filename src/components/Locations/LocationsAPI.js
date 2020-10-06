//later to be replaced by real server json calls
const existing = localStorage.getItem("locations");
if (!existing) {
  localStorage.setItem(
    "locations",
    JSON.stringify([
      {
        uid: "location1",
        adress: "Sixmastraat 15",
        place: "Leeuwarden",
        name: "Leeuwarden",
        active: 1,
      },
      {
        uid: "location2",
        adress: "Sixmastraat 15",
        place: "Heerenveen",
        name: "Heerenveen",
        active: 1,
      },
    ])
  );
}
export const GetLocationsAPI = (callback, error) => {
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
