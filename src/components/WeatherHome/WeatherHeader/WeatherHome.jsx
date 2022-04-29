import "./WeatherHome.css";
import React, { useState } from "react";
import WeatherHeader from "../../WeatherHeader/WeatherHeader";
import WeatherBody from "../../WeatherBody/WeatherBody";
import handleWeather from "../../../context/handleWeather.js";

const WeatherHome = () => {
  const [pickedCity, setPickedCity] = useState("");

  return (
    <div>
      <handleWeather.Provider value={{ pickedCity, setPickedCity }}>
        <WeatherHeader />
        <WeatherBody />
      </handleWeather.Provider>
    </div>
  );
};

export default WeatherHome;
