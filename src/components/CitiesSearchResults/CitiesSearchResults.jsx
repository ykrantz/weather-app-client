import "./CitiesSearchResults.css";

import React, { useContext, useState } from "react";
import handleWeather from "../../context/handleWeather";
import handleCityInputContex from "../../context/handleCityInputContex";
import SniperWaitingCircle from "../SniperWaitingCircle/SniperWaitingCircle";

const CitiesSearchResults = () => {
  const { searchCitiesResults, setPickedCity, setSearchCitiesResults } =
    useContext(handleWeather);
  const { setCitySearchInput, spinnerWaitingForData } = useContext(
    handleCityInputContex
  );

  const handlePickedCityInFromSearchResults = (city) => {
    setCitySearchInput(city);
    setPickedCity(city);
    setSearchCitiesResults([]);
  };
  return (
    <div>
      {searchCitiesResults.length > 0 && (
        <ul className="list-group  w-75 CitiesSearchResults-selectResults">
          {searchCitiesResults.map((val) => (
            <li
              className="list-group-item"
              key={val}
              onClick={(e) => {
                console.log(e.target.innerHTML);
                handlePickedCityInFromSearchResults(e.target.innerHTML);
              }}
            >
              {val}
            </li>
          ))}
        </ul>
      )}
      {spinnerWaitingForData && <SniperWaitingCircle />}
    </div>
  );
};

export default CitiesSearchResults;
