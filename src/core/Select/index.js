import React, { useState, useEffect, useRef } from "react";
import "./../index.scss";
import "./index.scss";

const List = React.forwardRef(({ options, onClick }, ref) => (
  <div ref={ref} className="selectlist">
    {options.map((o) => (
      <div key={o.id} id={o.name} onClick={() => onClick(o.name)}>
        {o.name}
      </div>
    ))}
  </div>
));

export const Select = ({
  name,
  title,
  values,
  setValues,
  options,
  ...rest
}) => {
  const [active, setActive] = useState(false);

  const [value, setvalue] = useState(options[0].name);

  const refList = useRef();
  const refLocation = useRef();
  const refSelect = useRef();
  const refAngle = useRef();

  useEffect(() => {
    setValues((prevstate) => {
      return { ...prevstate, location: value };
    });
    setActive(false);
  }, [value, setValues]);

  const handleFocus = () => {
    setActive(true);
  };

  window.onclick = (e) => {
    const ids = [refLocation, refSelect, refAngle];
    const id = e.target;
    if (
      ids.filter((e) => e.current !== id).length === 3 ||
      e.target.id === value
    ) {
      setActive(false);
    }
  };

  return (
    <div style={{ position: "relative", marginBottom: "1rem" }}>
      <label
        htmlFor={name}
        className="textlabel"
        style={{ marginBottom: "0rem" }}
      >
        {" "}
        {title}
      </label>
      <div
        className="selectinput"
        ref={refSelect}
        id="select"
        onClick={handleFocus}
      >
        <input
          {...rest}
          readOnly={true}
          ref={refLocation}
          id={name}
          name={name}
        />{" "}
        <i id="angle" ref={refAngle} className="fa fa-angle-down "></i>
      </div>
      {active ? (
        <List
          ref={refList}
          onClick={(i) => {
            setvalue(i);
          }}
          options={options}
        />
      ) : null}
    </div>
  );
};
