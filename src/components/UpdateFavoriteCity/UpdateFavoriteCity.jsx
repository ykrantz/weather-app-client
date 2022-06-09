import "./UpdateFavoriteCity.css";

import React, { useContext, useState } from "react";
import handleWeather from "../../context/handleWeather";
import MAIN_USER_DETAILS from "../../utils/mainUserDetails";
import api from "../../utils/axiosReq";

const UpdateFavoriteCity = ({ city }) => {
  const {
    pickedCity,
    // refreshFavoriteCityList,
    // setRefreshFavoriteCityList,
    favoriteCities,
    setPickedFavoriteCity,
    setFavoriteCities,
    setPickedCity,
  } = useContext(handleWeather);

  const checkIfCityExistInFavorites = (cityToCheck) => {
    return favoriteCities.find((city) => {
      // console.log(city.name, cityToCheck);
      return city.name === cityToCheck.toLowerCase();
    });
  };

  const cityExistInFavorites = checkIfCityExistInFavorites(city) ? true : false;

  const [changeFavoriteCityPick, setChangeFavoriteCityPick] =
    useState(cityExistInFavorites);

  const handleChangeFavorite = () => {
    if (!cityExistInFavorites) {
      addCityToFavoriteInServer();
    } else {
      deleteCityFromFavoriteInServer();
    }
  };

  const addCityToFavoriteInServer = async () => {
    try {
      const CityExistInFavorites = favoriteCities.find(
        (city) => city.name === pickedCity
      );
      if (!CityExistInFavorites) {
        const ans = await api.put(
          `userFavorites/addcitytofavorite/${pickedCity}`,
          {
            body: { ...MAIN_USER_DETAILS },
          }
        );
        const data = await ans?.data;
        // console.log({ data });
        if (ans.status === 200) {
          // console.log(data?.favoriteCities, { data });
          setFavoriteCities(data?.favoriteCities);
          setPickedCity(pickedCity.toLowerCase());
          setPickedFavoriteCity(city.toLowerCase());
          console.log("city was added and list was update");
        } else {
          console.log("didn't add city");
          resetCityWeather(true, pickedCity);
        }
      } else {
        console.log("city already in favorites");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteCityFromFavoriteInServer = async () => {
    try {
      const cityExistInFavorites = checkIfCityExistInFavorites(city);

      if (cityExistInFavorites) {
        const ans = await api.put(
          `userFavorites/deldetcitytofavorite/${city}`,
          {
            body: { ...MAIN_USER_DETAILS },
          }
        );
        const data = await ans?.data;
        if (ans.status === 200) {
          setFavoriteCities(data?.favoriteCities);

          console.log("city was delete and list was update");
        } else {
          console.log("didn't delete city");
          resetCityWeather(true, pickedCity);
        }
      } else {
        console.log("city isn't in favorites");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const resetCityWeather = (cityWasntFound = false, cityName) => {
    //   TODO: reset city weather
    // setCityWeather({
    //   // city: {
    //   //   name: cityWasntFound ? `No data for ${cityName} ` : "",
    //   // },
    //   city: "",
    //   daysWeather: [],
    // });
  };

  return (
    <div>
      <button
        data-toggle="tooltip"
        data-placement="top"
        title={
          cityExistInFavorites ? "Delete from favorites" : "Add to favorites"
        }
        type="button"
        className=" btn   h-100 rounded-1"
        onClick={() => {
          handleChangeFavorite();
        }}
      >
        {cityExistInFavorites && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="blueviolet"
            className="bi bi-heart-fill "
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              // fill-rule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
          </svg>
        )}
        {!cityExistInFavorites && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="blueviolet"
            className="bi bi-heart"
            viewBox="0 0 16 16"
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default UpdateFavoriteCity;
