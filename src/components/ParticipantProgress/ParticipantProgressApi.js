//later to be replaced by real server json calls

// const existing = localStorage.getItem("participantprogress");
// if (!existing) {
//   localStorage.setItem(
//     "participantprogress",
//     JSON.stringify([
//       {
//         uid: Date.now(),
//         content: `Dit kan het doel zijn van de deelnemer of andere informatie die betrekking
//     heeft op de persoon. Zoals andere intresseses naast de skills. Of eerder
//     informatie besproken met de een organisatie of eerder als kanidaat.`,
//         participantId: "abrbakadarba",
//       },
//     ])
//   );
// }

export const ParticipantProgressApi = (callback, error, uid) => {
  const response =
    localStorage.getItem("participantprogress") !== null
      ? localStorage.getItem("participantprogress")
      : localStorage.setItem("participantprogress", JSON.stringify([]));
  if (response) {
    const jsonFilter = JSON.parse(response).filter(
      (p) => p.participant_id === uid
    );
    if (jsonFilter.length > 0) {
      const json = jsonFilter;
      return callback(json);
    }
    return error("Er zijn nog geen voortgang notities toegevoegd");
  }
  return error(
    "Participant progress: Er ging iets mis, probeer het later nog een keer."
  );
};
