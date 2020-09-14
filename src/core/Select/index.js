import React, { useState, useEffect } from "react";
import "./../index.scss";
import "./index.scss";

const List = ({ options, onClick, onMouseDown }) => (
  <div className="selectlist">
    {options.map((o) => (
      <div
        key={o.id}
        id={o.name}
        onClick={() => onClick(o.name)}
        onMouseDown={onMouseDown}
      >
        {o.name}
      </div>
    ))}
  </div>
);

export const Select = ({ name, title, setValues, options, ...rest }) => {
  const [active, setActive] = useState(false);

  const [value, setvalue] = useState(rest.value);

  useEffect(() => {
    setValues((prevstate) => {
      return { ...prevstate, location: value };
    });
    setActive(false);
  }, [setValues, value]);

  const handleFocus = () => {
    setActive(!active);
  };

  const handleOnMouseDown = (event) => {
    event.preventDefault();
  };

  const handleOnClick = (i) => {
    setvalue(i);
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
