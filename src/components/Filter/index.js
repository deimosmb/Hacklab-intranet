import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { ModalArea } from "../../core/Modal";
import { useLocations } from "./../../hooks";
import { changeFilter, allFilters } from "./../../actions/FilterActions";
import "./filter.scss";
import { useEffect } from "react";

export const Filter = ({ isShown, setIsShown }) => {
  const { filters } = useSelector((state) => state.FilterReducer);
  const dispatch = useDispatch();

  const locations = useLocations();

  useEffect(() => {
    const prepareFilterLocations = locations.map((l) => {
      return { name: l.name, state: false };
    });
    const prepareFilters = [...prepareFilterLocations];
    dispatch(allFilters(prepareFilters));
  }, [dispatch, locations]);

  const [filterActive, setFilterActive] = useState({});

  const onFilter = (e) => {
    const name = e.target.id;
    const filterState = filters.locations.find((l) => l.name === name);
    setFilterActive((prev) => ({ ...prev, [name]: !filterState.state }));
    dispatch(
      changeFilter("locations", {
        name,
        state: !filterState.state,
      })
    );
  };

  if (isShown) {
    return (
      <ModalArea
        type="sliderright"
        to={document.getElementById("main-section")}
        onClose={() => setIsShown(false)}
      >
        <div className="filter">
          <h3>FILTER</h3>
          <strong>LOCATIES</strong>
          <ul className="filter-locations">
            {locations.map((l, index) => (
              <li key={index} onClick={onFilter}>
                <i
                  className={`fa fa-check ${
                    filterActive[l.name]
                      ? "filter-locations-active"
                      : "filter-locations-notActive"
                  }`}
                  id={l.name}
                >
                  {" "}
                  {l.name}
                </i>
              </li>
            ))}
          </ul>
        </div>
      </ModalArea>
    );
  } else return React.Fragment;
};

Filter.propTypes = {
  isShown: PropTypes.bool,
  setIsShown: PropTypes.func,
};
