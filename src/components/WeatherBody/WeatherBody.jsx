import "./WeatherBody.css";

import React, { useState } from "react";
import FavoriteCities from "../FavoriteCities/FavoriteCities";
import CityWeather from "../CityWeather/CityWeather";
import CityInput from "../CityInput/CityInput";
import CitiesSearchResults from "../CitiesSearchResults/CitiesSearchResults";
import handleCityInputContex from "../../context/handleCityInputContex";
const WeatherBody = () => {
  const [citySearchInput, setCitySearchInput] = useState("");
  const [spinnerWaitingForData, setSpinnerWaitingForData] = useState(false);

  return (
    <div className="WeatherBody-container row">
      <div className="WeatherBody-left  col-md-4 col-sm-12 ">
        <FavoriteCities />
        <handleCityInputContex.Provider
          value={{
            citySearchInput,
            setCitySearchInput,
            spinnerWaitingForData,
            setSpinnerWaitingForData,
          }}
        >
          <CityInput />
          <CitiesSearchResults />
        </handleCityInputContex.Provider>
      </div>
      <div className="WeatherBody-right col-md-8 col-sm-12">
        <CityWeather />
      </div>
    </div>
  );
};

export default WeatherBody;
