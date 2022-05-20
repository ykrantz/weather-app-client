import "./WeatherHome.css";
import React, { useState } from "react";

import WeatherBody from "../WeatherBody/WeatherBody";
import handleWeather from "../../context/handleWeather.js";
import WeatherHeader from "../WeatherHeader/WeatherHeader";
// import CitiesSearchResults from "../CitiesSearchResults/CitiesSearchResults";

const WeatherHome = () => {
  const [pickedCity, setPickedCity] = useState("");
  // const [refreshFavoriteCityList, setRefreshFavoriteCityList] = useState(false);
  const [searchCitiesResults, setSearchCitiesResults] = useState([]);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [pickedFavoriteCity, setPickedFavoriteCity] = useState("");

  // const [pickedFavoriteCity, setPickedFavoriteCity] = useState(
  //   pickedCityExistInFavorites ? pickedCity : ""
  // );
  return (
    <div className="container">
      <handleWeather.Provider
        value={{
          pickedCity,
          setPickedCity,
          searchCitiesResults,
          setSearchCitiesResults,
          // refreshFavoriteCityList,
          // setRefreshFavoriteCityList,
          favoriteCities,
          setFavoriteCities,
          pickedFavoriteCity,
          setPickedFavoriteCity,
        }}
      >
        <WeatherHeader />

        <WeatherBody />
      </handleWeather.Provider>
    </div>
  );
};

export default WeatherHome;
