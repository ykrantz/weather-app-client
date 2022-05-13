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

  // console.log("##", { searchCitiesResults });

  const handlePickedCityInFromSearchResults = (city) => {
    setCitySearchInput(city);
    setPickedCity(city);
    setSearchCitiesResults([]);
  };
  return (
    <div>
      {/* <h5>serach results: </h5> */}
      {searchCitiesResults.length > 0 && (
        <select
          className="form-select  w-75 CitiesSearchResults-selectResults"
          size={
            searchCitiesResults.length >= 3 ? "3" : searchCitiesResults.length
          }
          onChange={(e) => {
            handlePickedCityInFromSearchResults(e.target.value);
          }}
        >
          {searchCitiesResults.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      )}
      {spinnerWaitingForData && <SniperWaitingCircle />}

      {/* <select className="test" size="4">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>3</option>
        <option>3</option>
        <option>3</option>
        <option>3</option>
      </select> */}
    </div>
  );
};

export default CitiesSearchResults;
