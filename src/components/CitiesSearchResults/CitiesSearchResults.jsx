import "./CitiesSearchResults.css";

import React, { useContext } from "react";
import handleWeather from "../../context/handleWeather";

const CitiesSearchResults = () => {
  const { searchCitiesResults, setPickedCity } = useContext(handleWeather);

  return (
    <div>
      <h5>serach results: </h5>
      <select
        size={searchCitiesResults.length}
        onChange={(e) => setPickedCity(e.target.value)}
      >
        {searchCitiesResults.map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CitiesSearchResults;
