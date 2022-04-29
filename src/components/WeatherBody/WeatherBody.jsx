import "./WeatherBody.css";

import React from "react";
import FavoriteCities from "../FavoriteCities/FavoriteCities";
import CityWeather from "../CityWeather/CityWeather";

const WeatherBody = () => {
  return (
    <div>
      <FavoriteCities />
      <CityWeather />
    </div>
  );
};

export default WeatherBody;
