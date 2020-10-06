import React from "react";
import {
  ParticipantsList,
  ParticipantsHeader,
} from "./../components/Participants";

function ParticipantsPage() {
  return (
    <section>
      <ParticipantsHeader />
      <ParticipantsList />
    </section>
  );
}

export default ParticipantsPage;
