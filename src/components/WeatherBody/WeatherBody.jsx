import "./WeatherBody.css";

import React from "react";
import FavoriteCities from "../FavoriteCities/FavoriteCities";
import CityWeather from "../CityWeather/CityWeather";
import CityInput from "../CityInput/CityInput";
import CitiesSearchResults from "../CitiesSearchResults/CitiesSearchResults";

const WeatherBody = () => {
  return (
    <div className="WeatherBody-container">
      <div className="WeatherBody-left">
        <FavoriteCities />
        <CityInput />
        <CitiesSearchResults />
      </div>
      <div className="WeatherBody-right">
        <CityWeather />
      </div>
    </div>
  );
};

export default WeatherBody;
