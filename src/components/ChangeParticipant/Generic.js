import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Label, TextInput, Button } from "./../../core/Form";
import { ModalArea } from "./../../core/Modal";
import { validate } from "./../../core/Validation";
import { participantValidationRules } from "./../CreateParticipant";
import { ChangeParticipantAPI } from "./ChangeParticipantAPI";
import { LocationSelect } from "./../LocationSelect";
import { Message, Text } from "./../../core/message";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { changeParticipant } from "../../actions/ParticipantActions";

export default function ChangeGenericParticipant({
  setActive,
  active,
  setSuccess,
  success,
  data,
}) {
  const [values, setValues] = useState({});

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    setValues({ ...data });
  }, [data]);

  const [validationErrors, setValidationErrors] = useState({});

  const { status, source, phonenumber, email } = participantValidationRules;
  const rules = { status, source, phonenumber, email };

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
      const data = { uid: id, ...values };
      ChangeParticipantAPI(
        data,
        (json) => {
          console.log(success);
          setActive(false);
          setSuccess(true);
          dispatch(changeParticipant(json));
        },
        () =>
          console.error(
            "Er ging iets mis met het aanpassen van algemene deelnemer gegegevens"
          )
      );
      return setActive(false);
    }
  };

  return (
    <>
      {active ? (
        <ModalArea onClose={() => setActive(!active)} transist={success}>
          <form>
            <div
              className="profile profile-generic"
              style={{ paddingTop: "0rem" }}
            >
              <h2>ALGEMENE INFORMATIE</h2>

              <LocationSelect
                values={values}
                setValues={setValues}
                value={values.location_id}
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
                  <Text color="error">{validationErrors.status}</Text>
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
                  <Text color="error">{validationErrors.source}</Text>
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
                  <Text color="error">{validationErrors.phonenumber}</Text>
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
                  <Text color="error">{validationErrors.email}</Text>
                </Message>
              </Label>
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button name="AANPASSEN" onClick={handleSubmit} />
            </div>
          </form>
        </ModalArea>
      ) : (
        <></>
      )}
    </>
  );
}

ChangeGenericParticipant.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
  setSuccess: PropTypes.func,
  success: PropTypes.bool,
  data: PropTypes.object,
};
