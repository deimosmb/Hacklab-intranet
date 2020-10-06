//later to be replaced by real server json calls

const existing = localStorage.getItem("participants");
if (!existing) {
  localStorage.setItem(
    "participants",
    JSON.stringify([
      {
        uid: "abrbakadarba",
        name: "Martin",
        location_id: "location1",
        phonenumber: "0612345678",
        email: "martin@hacklab.nl",
        source: "Gemeente Leeuwarden",
        status: "Zoekt naar werk",
        purpose: `Dit kan het doel zijn van de deelnemer of andere informatie die betrekking
    heeft op de persoon. Zoals andere intresseses naast de skills. Of eerder
    informatie besproken met de een organisatie of eerder als kanidaat.`,
      },
      {
        uid: "234242525",
        name: "Rik",
        location_id: "location2",
        phonenumber: "0612345678",
        email: "Rik@hacklab.nl",
        source: "Gemeente Leeuwarden",
        status: "Zoekt naar opleiding",
        purpose: `Dit kan het doel zijn van de deelnemer of andere informatie die betrekking
    heeft op de persoon. Zoals andere intresseses naast de skills. Of eerder
    informatie besproken met de een organisatie of eerder als kanidaat.`,
      },
    ])
  );
}
export const GetParticipantsProfile = (callback, error, uid) => {
  const response = localStorage.getItem("participants");
  if (response) {
    const jsonFilter = JSON.parse(response).filter(
      (p) => p.uid.toString() === uid
    );
    if (jsonFilter.length > 0) {
      const json = jsonFilter[0];
      return callback(json);
    }
    return error(
      "De informatie over de gezochte deelnemer bestaat niet of is niet langer meer beschikbaar "
    );
  }
  return error("Er ging iets mis, probeer het later nog een keer.");
};
