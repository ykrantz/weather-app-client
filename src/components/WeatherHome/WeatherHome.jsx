import "./WeatherHome.css";
import React, { useState } from "react";

import WeatherBody from "../WeatherBody/WeatherBody";
import handleWeather from "../../context/handleWeather.js";
import WeatherHeader from "../WeatherHeader/WeatherHeader";
// import CitiesSearchResults from "../CitiesSearchResults/CitiesSearchResults";

const WeatherHome = () => {
  const [pickedCity, setPickedCity] = useState("");
  const [searchCitiesResults, setSearchCitiesResults] = useState([]);

  return (
    <div className="container">
      <handleWeather.Provider
        value={{
          pickedCity,
          setPickedCity,
          searchCitiesResults,
          setSearchCitiesResults,
        }}
      >
        <WeatherHeader />

        <WeatherBody />
      </handleWeather.Provider>
    </div>
  );
};

export default WeatherHome;
