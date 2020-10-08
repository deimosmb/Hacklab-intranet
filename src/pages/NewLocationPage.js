import React from "react";
import Container from "./PageContainer";
import CreateLocation from "../components/CreateLocation";

function NewLocationPage() {
  return (
    <Container>
      <h1>Nieuwe Locatie toevoegen</h1>
      <CreateLocation />
    </Container>
  );
}

export default NewLocationPage;
