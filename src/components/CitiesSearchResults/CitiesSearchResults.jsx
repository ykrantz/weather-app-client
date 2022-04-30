import "./CitiesSearchResults.css";

import React, { useContext } from "react";
import handleWeather from "../../context/handleWeather";

const CitiesSearchResults = () => {
  const { searchCitiesResults } = useContext(handleWeather);

  return (
    <div>
      {searchCitiesResults.map((val) => (
        <p key={val}>{val}</p>
      ))}
    </div>
  );
};

export default CitiesSearchResults;
