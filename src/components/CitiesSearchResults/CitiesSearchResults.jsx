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
        // <select
        //   className="form-select  w-75 CitiesSearchResults-selectResults"
        //   size={
        //     searchCitiesResults.length >= 3 ? "3" : searchCitiesResults.length
        //   }
        //   onChange={(e) => {
        //     handlePickedCityInFromSearchResults(e.target.value);
        //   }}
        // >
        //   {searchCitiesResults.map((val) => (
        //     <option key={val} value={val}>
        //       {val}
        //     </option>
        //   ))}
        // </select>

        <ul
          className="list-group  w-75 CitiesSearchResults-selectResults"
          // size={
          //   searchCitiesResults.length >= 3 ? "3" : searchCitiesResults.length
          // }
          // onClick={(e) => {
          //   handlePickedCityInFromSearchResults(e.target.value);
          // }}
        >
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
