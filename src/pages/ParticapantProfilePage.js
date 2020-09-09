import React, { useState } from "react";
import Participant from "./../components/ParticipantProfile";
import ParticipantProfileGoal from "./../components/ParticipantProfile/ParticipantPurpose";
import Data from "./../components/ParticipantProfile/data";
import ParticipantsProgress from "./../components/ParticipantProgress";

function ParticipantProfilePage() {
  const [data, setData] = useState({});

  return (
    <section>
      <Data setData={setData} />
      <ParticipantProfileGoal data={data} />
      <ParticipantsProgress />
      <Participant data={data} />
    </section>
  );
}

export default ParticipantProfilePage;
