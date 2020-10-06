import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./../index.scss";
import "./index.scss";

const List = ({ options, onClick, onMouseDown }) => (
  <div className="selectlist">
    {options.map((o, index) => (
      <div
        key={index}
        id={o.name}
        onClick={() => onClick(o)}
        onMouseDown={onMouseDown}
      >
        {o.name}
      </div>
    ))}
  </div>
);

export const Select = ({ name, title, options, setValues, ...rest }) => {
  const [active, setActive] = useState(false);

  const [value, setValue] = useState(
    rest.value === undefined ? { name: "" } : rest.value
  );

  useEffect(() => {
    if (rest.value === undefined && value.name === "") {
      setValue(options[0] ?? { name: "" });
    }
    setActive(false);
  }, [options, rest.value, value]);

  const handleFocus = () => {
    setActive(!active);
  };

  const handleOnMouseDown = (event) => {
    event.preventDefault();
  };

  const handleOnClick = (i) => {
    //setvalues prop for usestate in create a new something
    setValues(i);
    //setvalue to display the clicked value in the list
    setValue(i);
    setActive(false);
  };

  const onHandleBlur = () => {
    setActive(false);
  };

  return (
    <div style={{ position: "relative", marginBottom: "1rem" }}>
      <label
        htmlFor={name}
        className="textlabel"
        style={{ marginBottom: "0rem" }}
      >
        {title}
      </label>
      <div className="selectinput" id="select" onClick={handleFocus}>
        <input
          {...rest}
          value={value.name}
          readOnly={true}
          id={name}
          name={name}
          onBlur={onHandleBlur}
        />
        <i id="angle" className="fa fa-angle-down "></i>
      </div>
      {active ? (
        <List
          onMouseDown={handleOnMouseDown}
          onClick={handleOnClick}
          options={options}
        />
      ) : null}
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  setValues: PropTypes.func,
  options: PropTypes.array,
  rest: PropTypes.object,
};
