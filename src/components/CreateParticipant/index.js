import CreateNewParticipant from "./CreateNewParticipant";

import {
  min,
  required,
  phonenumber,
  email,
  itCanBeEmtpty,
} from "./../../core/Validation";

export const participantValidationRules = {
  name: [(v) => required(v)],
  purpose: [
    (v) => required(v, "Het doel mag niet leeg zijn!"),
    (v) => min(v, 20),
  ],
  location_id: [
    (v) => required(v, "Er moet wel een locatie geselecteerd worden"),
  ],
  status: [(v) => itCanBeEmtpty(v, () => min(v, 3))],
  source: [(v) => itCanBeEmtpty(v, () => min(v, 3))],
  phonenumber: [(v) => itCanBeEmtpty(v, () => phonenumber(v))],
  email: [(v) => itCanBeEmtpty(v, () => email(v))],
};

export { CreateNewParticipant };
