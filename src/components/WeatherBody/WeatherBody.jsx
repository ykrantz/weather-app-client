import "./WeatherBody.css";

import React from "react";
import FavoriteCities from "../FavoriteCities/FavoriteCities";
import CityWeather from "../CityWeather/CityWeather";
import CityInput from "../CityInput/CityInput";

const WeatherBody = () => {
  return (
    <div>
      <CityInput />
      <FavoriteCities />
      <CityWeather />
    </div>
  );
};

export default WeatherBody;
