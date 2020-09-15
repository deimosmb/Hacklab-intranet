import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Label, TextArea, TextInput, Button } from "./../../core/Form";
import { validate } from "./../../core/Validation";
import { participantValidationRules } from "./index";
import { CreateParticipantAPI } from "./CreateParticipantAPI";
import { useDispatch } from "react-redux";
import { Select } from "./../../core/Select";
import { Message, Text } from "./../../core/message";
import { addParticipant } from "../../actions/ParticipantActions";

export default function CreateNewParticipant() {
  const dispatch = useDispatch();

  const history = useHistory();

  const options = [
    { name: "Leeuwarden", id: "jshdfkjshf" },
    { name: "Heerenveen", id: "jshdfk1shf" },
  ];

  const [values, setValues] = useState({
    name: "",
    purpose: "",
    location: options[0].name,
    source: "",
    startdate: "",
    email: "",
    phonenumber: "",
    status: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const rules = participantValidationRules;

  const handleValidation = (event) => {
    const { value, name } = event.target;
    const errors = {};
    validate({ name, value, rules, errors });
    setValidationErrors((prev) => ({ ...prev, ...errors }));
  };

  const validationOnChange = (event) => {
    const arrNames = ["purpose", "status", "source"];
    if (arrNames.includes(event.target.name)) handleValidation(event);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    validationOnChange(event);
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
          dispatch(addParticipant(json));
          return history.push(`/deelnemer/${json.uid}`);
        },
        (error) => console.log(error)
      );
    }
  };

  return (
    <form>
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
        value={values.location}
        setValues={setValues}
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
      <Label htmlFor="phonenumber">
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
        <Button type="button" name="TOEVOEGEN" onClick={handleSubmit} />
      </div>
    </form>
  );
}
