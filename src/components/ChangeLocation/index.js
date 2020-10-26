import React, { useState } from "react";
import PropTypes from "prop-types";
import { Label, TextInput, Button, TextArea } from "./../../core/Form";
import { ModalArea } from "./../../core/Modal";
import { validate } from "./../../core/Validation";
import { ChangeLocationAPI } from "./ChangeLocationAPI";
import { min, required, itCanBeEmtpty } from "../../core/Validation";
import { Message, Text } from "./../../core/message";
import { useDispatch } from "react-redux";
import { changeLocation } from "./../../actions/LocationActions";

export default function ChangeLocation({
  setIsActive,
  isActive,
  setIsSuccess,
  data,
}) {
  const [values, setValues] = useState({ ...data });

  const dispatch = useDispatch();

  const [validationErrors, setValidationErrors] = useState({});

  const rules = {
    name: [(v) => required(v)],
    adress: [(v) => itCanBeEmtpty(v, () => min(v, 3))],
    place: [(v) => itCanBeEmtpty(v, () => min(v, 3))],
  };

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

  const handleSubmitLocation = () => {
    const data = values;
    ChangeLocationAPI(
      data,
      (json) => {
        setIsSuccess(true);
        dispatch(changeLocation(json));
      },
      () =>
        console.error(
          "Er ging iets mis met het aanpassen van algemene deelnemer gegegevens"
        )
    );
    return setIsActive(false);
  };

  const checkForValidationErrors = (values) => {
    const errors = {};
    Object.keys(values).forEach((name) => {
      validate({ name, value: values[name], rules: rules, errors });
    });
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = checkForValidationErrors(values);
    setValidationErrors((prev) => ({ prev, ...errors }));
    if (Object.keys(errors).filter((e) => errors[e] !== null).length === 0) {
      //callback()
      handleSubmitLocation();
    }
  };

  return (
    <>
      {isActive ? (
        <ModalArea onClose={() => setIsActive(!isActive)}>
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
                value={values.adress}
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
                value={values.place}
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
              <Button type="button" name="AANPASSEN" onClick={handleSubmit} />
            </div>
          </form>
        </ModalArea>
      ) : (
        <></>
      )}
    </>
  );
}

ChangeLocation.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
};
