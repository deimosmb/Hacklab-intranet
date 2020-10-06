import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Label, TextArea, TextInput, Button } from "../../core/Form";
import { validate, min, required, itCanBeEmtpty } from "../../core/Validation";
import { CreateLocationAPI } from "./CreateLocationAPI";
import { useDispatch } from "react-redux";
import { Message, Text } from "../../core/message";
import {
  addLocation,
  changeLocationSuccessState,
} from "../../actions/LocationActions";

export default function CreateLocation() {
  const dispatch = useDispatch();

  const history = useHistory();

  const [values, setValues] = useState({
    name: "",
    adress: "",
    place: "",
    description: "",
  });

  const rules = {
    name: [(v) => required(v)],
    adress: [(v) => itCanBeEmtpty(v, () => min(v, 3))],
    place: [(v) => itCanBeEmtpty(v, () => min(v, 3))],
  };

  const [validationErrors, setValidationErrors] = useState({});

  const handleValidation = (event) => {
    const { value, name } = event.target;
    const errors = {};
    validate({ name, value, rules, errors });
    setValidationErrors((prev) => ({ ...prev, ...errors }));
  };

  const validationOnChange = (event) => {
    const arrNames = ["adress", "place"];
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
      CreateLocationAPI(
        values,
        (json) => {
          dispatch(addLocation(json));
          dispatch(changeLocationSuccessState());
          return history.push(`/locaties`);
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
          <Text color="error">{validationErrors.name}</Text>
        </Message>
      </Label>
      <Label htmlFor="adress">
        Adres
        <TextInput
          name="adress"
          placeholder="Adres"
          onChange={handleChange}
          onBlur={handleValidation}
          value={values.status}
        />
        <Message>
          <Text color="error">{validationErrors.adress}</Text>
        </Message>
      </Label>
      <Label htmlFor="place">
        Plaats
        <TextInput
          name="place"
          placeholder="Plaats"
          onChange={handleChange}
          onBlur={handleValidation}
          value={values.status}
        />
        <Message>
          <Text color="error">{validationErrors.place}</Text>
        </Message>
      </Label>
      <Label htmlFor="description">
        Eventuele Beschrijving
        <TextArea
          name="description"
          placeholder="Beschrijving..."
          onBlur={handleValidation}
          onChange={handleChange}
          value={values.description}
        />
        <Message>
          <Text color="error">{validationErrors.description}</Text>
        </Message>
      </Label>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button type="button" name="TOEVOEGEN" onClick={handleSubmit} />
      </div>
    </form>
  );
}
