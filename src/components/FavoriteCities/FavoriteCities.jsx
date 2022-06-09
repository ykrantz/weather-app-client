import "./FavoriteCities.css";

import React, { useContext, useEffect, useState } from "react";
import FavoriteCity from "../FavoriteCity/FavoriteCity";
import handleWeather from "../../context/handleWeather";
import api from "../../utils/axiosReq";

import MAIN_USER_DETAILS from "../../utils/mainUserDetails";

const FavoriteCities = () => {
  const {
    pickedCity,
    setPickedCity,
    // refreshFavoriteCityList,
    pickedFavoriteCity,
    setPickedFavoriteCity,
    favoriteCities,
    setFavoriteCities,
  } = useContext(handleWeather);

  console.log({ favoriteCities });
  const pickedCityExistInFavorites = favoriteCities.find(
    (city) => city.name === pickedCity
  );

  console.log({ pickedFavoriteCity }, "3333");

  const getUserFavoriteCityFromServer = async () => {
    console.log(MAIN_USER_DETAILS);
    try {
      const ans = await api.post(`userFavorites/favoritecities`, {
        body: MAIN_USER_DETAILS,
      });
      const data = await ans.data;
      console.log({ data }, ans.status, "user favrtie");
      if (data?.length) {
        setFavoriteCities(data);
        console.log({ favoriteCities });

        console.log({ pickedFavoriteCity }, "^^^", { pickedCity });
        if (pickedCity) {
          setPickedFavoriteCity(pickedCity);
        } else {
          setPickedFavoriteCity(data[0]?.name);
          setPickedCity(data[0]?.name);
        }
      } else {
        console.log("no favorite city for user");
      }
    } catch (e) {
      console.log("ERORO:", e);
    }
  };
  console.log({ pickedFavoriteCity }, "777", { pickedCity });

  const handlePickedFavoriteCity = (cityName) => {
    setPickedCity(cityName);
    setPickedFavoriteCity(cityName);
  };

  const handleGetFavoriteCityList = async () => {
    await getUserFavoriteCityFromServer();
  };
  const handleUpdatePickedFavoriteCity = () => {
    console.log({ favoriteCities });
    if (favoriteCities.length > 0) {
      console.log({ pickedFavoriteCity }, "^^^");
      if (pickedCity) {
        setPickedFavoriteCity(pickedCity.toLowerCase());
        // setPickedCity(pickedCity);
      } else {
        setPickedCity(favoriteCities[0]?.name);
        setPickedFavoriteCity(favoriteCities[0]?.name);
      }
    }
  };

  useEffect(() => {
    handleGetFavoriteCityList();
    handleUpdatePickedFavoriteCity();
  }, []);

  return (
    <div className="FavoriteCities-container mt-5 mb-5">
      <h4 className="mb-3 w-75 text-secondary">My favorite cities:</h4>

      <select
        className="form-select  w-75 "
        value={pickedFavoriteCity}
        onChange={(e) => {
          handlePickedFavoriteCity(e.target.value);
        }}
      >
        {favoriteCities.map((city) => (
          <option key={city.id} value={city.name}>
            <FavoriteCity city={city} />
          </option>
        ))}
      </select>
    </div>
  );
};

export default FavoriteCities;
