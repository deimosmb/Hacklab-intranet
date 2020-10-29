import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ModalArea } from "../../core/Modal";
import "./nav.scss";

export const Navigation = ({ setIsShown }) => {
  const [isStanderdMenuShown, setIsStanderdMenuShown] = useState(false);
  //const [transition, setTransition] = useState(false);

  return (
    <>
      <nav className="nav">
        <i
          className="fa fa-bars nav-hideondesktop nav-icon nav-bars"
          id="navbars"
          onClick={() => setIsStanderdMenuShown(true)}
        ></i>

        <div className="nav-group">
          <StandardNavigation className="nav-hideonmobile" />
          <LogoNavigation />
        </div>
        <FilterNavigation setIsShown={setIsShown} />
      </nav>
      {isStanderdMenuShown ? (
        <ModalArea
          type="sliderleft"
          to={document.getElementById("main-section")}
          onClose={() => setIsStanderdMenuShown(false)}
          //isTransistion={transition}
          //setIsActive={setIsStanderdMenuShown}
          //setIsTransistion={setTransition}
        >
          <StandardNavigation
            className="nav-hideondesktop"
            onClick={() => setIsStanderdMenuShown(false)}
          />
        </ModalArea>
      ) : (
        React.Fragment
      )}
    </>
  );
};

export const LogoNavigation = () => (
  <NavLink to="/" className="nav-logo">
    <h1>HACKLAB</h1>
    <h4>INTRANET</h4>
  </NavLink>
);

export const StandardNavigation = ({ className, setTransition, ...rest }) => (
  <div className={`${className} nav-standard `} {...rest}>
    <NavLink activeClassName="nav-active" className="nav-link" to="/deelnemers">
      Deelnemers
    </NavLink>
    <NavLink activeClassName="nav-active" className="nav-link" to="/locaties">
      Locaties
    </NavLink>
    <NavLink
      activeClassName="nav-active"
      className="nav-link"
      to="/vaardigheden"
    >
      Vaardigheden
    </NavLink>
    <NavLink
      activeClassName="nav-active"
      className="nav-link"
      to="/organisaties"
    >
      Organisaties
    </NavLink>
    <NavLink activeClassName="nav-active" className="nav-link" to="/lessen">
      Lessen
    </NavLink>
  </div>
);

export const FilterNavigation = ({ setIsShown }) => (
  <span
    className="nav-link nav-filter"
    id="filter"
    onClick={() => {
      setIsShown(true);
    }}
  >
    <i className="fa fa-flask nav-icon"></i>{" "}
    <span className="nav-hideonmobile">Filter</span>
  </span>
);
