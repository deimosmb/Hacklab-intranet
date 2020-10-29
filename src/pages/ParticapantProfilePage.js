import React, { useState } from "react";
import Container from "./PageContainer";
import ParticipantGeneric from "./../components/ParticipantProfile";
import ParticipantProfileGoal from "./../components/ParticipantProfile/ParticipantPurpose";
import Data from "./../components/ParticipantProfile/data";
import ParticipantsProgress from "./../components/ParticipantProgress";
import { ParticipantSkills } from "./../components/ParticipantSkills";

function ParticipantProfilePage() {
  const [data, setData] = useState({});

  return (
    <Container>
      <Data setData={setData} />
      <ParticipantProfileGoal data={data} />
      <ParticipantsProgress />
      <ParticipantSkills />
      <ParticipantGeneric data={data} />
    </Container>
  );
}

export default ParticipantProfilePage;
