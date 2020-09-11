import React, { useState, useContext, useEffect } from "react";
import { ParticipantsContext } from "./../../context/participants-context";
import { Label, TextInput, Button } from "./../../core/Form";
import {
  validate,
  min,
  phonenumber,
  email,
  itCanBeEmtpty,
} from "./../../core/Validation";
import { ChangeParticipantAPI } from "./ChangeParticipantAPI";
import { Select } from "./../../core/Select";
import { Message, Text } from "./../../core/message";

export default function ChangeGenericParticipant(props) {
  const [, dispatch] = useContext(ParticipantsContext);

  const [values, setValues] = useState({});

  useEffect(() => {
    const { location, source, status } = props;
    setValues({
      location,
      source,
      status,
      phonenumber: props.phonenumber,
      email: props.email,
    });
  }, [props]);

  const [validationErrors, setValidationErrors] = useState({});

  const options = [
    { name: "Leeuwarden", id: "jshdfkjshf" },
    { name: "Heerenveen", id: "jshdfk1shf" },
  ];

  const rules = {
    status: [(v) => itCanBeEmtpty(v, () => min(v, 3))],
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
      const data = { uid: props.uid, ...values };
      ChangeParticipantAPI(
        data,
        (json) => {
          dispatch({
            type: "CHANGE_PARTICIPANT",
            payload: json,
          });
        },
        () =>
          console.error(
            "Er ging iets mis met het aanpassen van algemene deelnemer gegegevens"
          )
      );
      return props.setActive(false);
    }
  };

  return (
    <form>
      <div className="profile profile-generic" style={{ paddingTop: "1rem" }}>
        <Select
          title="Hacklab locatie"
          name="location"
          onChange={handleChange}
          onBlur={handleValidation}
          value={values.location ?? ""}
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
            value={values.status ?? ""}
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
            value={values.source ?? ""}
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
            value={values.phonenumber ?? ""}
          />
          <Message>
            <Text className="error">{validationErrors.phonenumber}</Text>
          </Message>
        </Label>
        <Label htmlFor="email">
          E-mail
          <TextInput
            placeholder="E-mail"
            name="email"
            onChange={handleChange}
            onBlur={handleValidation}
            value={values.email ?? ""}
          />
          <Message>
            <Text className="error">{validationErrors.email}</Text>
          </Message>
        </Label>
      </div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button name="AANPASSEN" onClick={handleSubmit} />
      </div>
    </form>
  );
}
