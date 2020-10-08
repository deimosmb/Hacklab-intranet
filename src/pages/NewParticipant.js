import React from "react";
import Container from "./PageContainer";
import { CreateNewParticipant } from "./../components/CreateParticipant";

function NewParticipant() {
  return (
    <Container>
      <h1>Nieuwe Deelnemer toevoegen</h1>
      <CreateNewParticipant />
    </Container>
  );
}

export default NewParticipant;
