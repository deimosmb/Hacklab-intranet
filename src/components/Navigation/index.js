import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ModalArea } from "../../core/Modal";
import "./nav.scss";

export const Navigation = ({ setIsShown }) => {
  const [isStanderdMenuShown, setIsStanderdMenuShown] = useState(false);

  return (
    <nav className="nav">
      <i
        className="fa fa-bars hideondesktop nav-icon nav-bars"
        id="navbars"
        onClick={() => setIsStanderdMenuShown(true)}
      ></i>
      {isStanderdMenuShown ? (
        <ModalArea
          type="sliderleft"
          to={document.getElementById("main-section")}
          onClose={() => setIsStanderdMenuShown(false)}
        >
          <StandardNavigation
            className="hideondesktop"
            onClick={() => setIsStanderdMenuShown(false)}
          />
        </ModalArea>
      ) : (
        React.Fragment
      )}
      <div className="nav-group">
        <StandardNavigation className="hideonmobile" />
        <LogoNavigation />
      </div>
      <FilterNavigation setIsShown={setIsShown} />
    </nav>
  );
};

export const LogoNavigation = () => (
  <Link to="/" className="nav-logo">
    <h1>HACKLAB</h1>
  </Link>
);

export const StandardNavigation = ({ className, ...rest }) => (
  <div className={`${className} nav-standard `} {...rest}>
    <Link className="nav-link" to="/deelnemers">
      Deelnemers
    </Link>
    <Link className="nav-link" to="/locaties">
      Locaties
    </Link>
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
    <span className="hideonmobile">Filter</span>
  </span>
);
