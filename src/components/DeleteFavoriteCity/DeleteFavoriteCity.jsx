import "./DeleteFavoriteCity.css";

import React, { useContext } from "react";
import handleWeather from "../../context/handleWeather";

const DeleteFavoriteCity = () => {
  const {
    favoriteCities,
    setPickedFavoriteCity,
    setFavoriteCities,
    setPickedCity,
  } = useContext(handleWeather);

  return <div>DeleteFavoriteCity</div>;
};

export default DeleteFavoriteCity;
