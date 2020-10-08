import React from "react";
import Container from "./PageContainer";
import {
  ParticipantsList,
  ParticipantsHeader,
} from "./../components/Participants";

function ParticipantsPage() {
  return (
    <Container>
      <ParticipantsHeader />
      <ParticipantsList />
    </Container>
  );
}

export default ParticipantsPage;
