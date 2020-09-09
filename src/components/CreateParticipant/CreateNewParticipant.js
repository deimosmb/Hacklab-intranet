import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ParticipantsContext } from "./../../context/participants-context";
import { Label, TextArea, TextInput, Button } from "./../../core/Form";
import {
  validate,
  min,
  max,
  required,
  phonenumber,
  email,
  itCanBeEmtpty,
} from "./../../core/Validation";
import { CreateParticipantAPI } from "./CreateParticipantAPI";
import { Select } from "./../../core/Select";
import { Message, Text } from "./../../core/message";

export default function CreateNewParticipant() {
  const [, dispatch] = useContext(ParticipantsContext);

  const history = useHistory();

  const [values, setValues] = useState({
    name: "",
    purpose: "",
    location: "Heerenveen",
    source: "",
    startdate: "",
    email: "",
    phonenumber: "",
    status: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const options = [
    { name: "Leeuwarden", id: "jshdfkjshf" },
    { name: "Heerenveen", id: "jshdfk1shf" },
  ];

  const rules = {
    name: [(v) => required(v)],
    purpose: [
      (v) => required(v, "Het doel mag niet leeg zijn!"),
      (v) => min(v, 20),
    ],
    status: [
      (v) =>
        itCanBeEmtpty(
          v,
          () => min(v, 3),
          () => max(v, 20)
        ),
    ],
    source: [(v) => itCanBeEmtpty(v, () => min(v, 3))],
    phonenumber: [(v) => itCanBeEmtpty(v, () => phonenumber(v))],
    email: [(v) => itCanBeEmtpty(v, () => email(v))],
  };

  const handleValidation = (event) => {
    const { value, name } = event.target;
    const errors = {};
    validate({ name, value, rules, errors });
    setValidationErrors((prev) => ({ ...prev, ...errors }));
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    return setValues((prevstate) => {
      return { ...prevstate, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    Object.keys(values).forEach((name) => {
      validate({ name, value: values[name], rules: rules, errors });
    });
    setValidationErrors((prev) => ({ prev, ...errors }));
    if (Object.keys(errors).filter((e) => errors[e] !== null).length === 0) {
      console.log("Values", values);
      CreateParticipantAPI(
        values,
        (json) => {
          dispatch({
            type: "ADD_PARTICIPANT",
            payload: json,
          });
          return history.push(`/deelnemer/${json.uid}`);
        },
        (error) => console.log(error)
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="name">
        Naam *
        <TextInput
          name="name"
          placeholder="Naam..."
          onChange={handleChange}
          onBlur={handleValidation}
          value={values.name}
        />
        <Message>
          <Text className="error">{validationErrors.name}</Text>
        </Message>
      </Label>
      <Label htmlFor="purpose">
        Doel *
        <TextArea
          name="purpose"
          placeholder="Doel..."
          onChange={handleChange}
          onBlur={handleValidation}
          value={values.purpose}
        />
        <Message>
          <Text className="error">{validationErrors.purpose}</Text>
        </Message>
      </Label>

      <Select
        title="Locatie Hacklab"
        name="location"
        onChange={handleChange}
        onBlur={handleValidation}
        value={values.location}
        setValues={setValues}
        values={values}
        options={options}
      />
      <Label htmlFor="status">
        Status
        <TextInput
          name="status"
          placeholder="Zoekt naar opleiding, werk, stage ..."
          onChange={handleChange}
          onBlur={handleValidation}
          value={values.status}
        />
        <Message>
          <Text className="error">{validationErrors.status}</Text>
        </Message>
      </Label>
      <Label htmlFor="source">
        Bron
        <TextInput
          name="source"
          placeholder="Gemeente Leeuwarden, Website Hacklab ..."
          onChange={handleChange}
          onBlur={handleValidation}
          value={values.source}
        />
        <Message>
          <Text className="error">{validationErrors.source}</Text>
        </Message>
      </Label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: "10px",
        }}
      >
        <Label style={{ gridColumnStart: "2" }} htmlFor="phonenumber">
          Telefoonnummer
          <TextInput
            placeholder="Telefoonnummer..."
            name="phonenumber"
            onChange={handleChange}
            onBlur={handleValidation}
            value={values.phonenumber}
          />
          <Message>
            <Text className="error">{validationErrors.phonenumber}</Text>
          </Message>
        </Label>
      </div>
      <Label htmlFor="email">
        E-mailadres
        <TextInput
          placeholder="E-mail"
          name="email"
          onChange={handleChange}
          onBlur={handleValidation}
          value={values.email}
        />
        <Message>
          <Text className="error">{validationErrors.email}</Text>
        </Message>
      </Label>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button name="TOEVOEGEN" />
      </div>
    </form>
  );
}
