import "./UpdateFavoriteCity.css";

import React, { useContext, useState } from "react";
import handleWeather from "../../context/handleWeather";
import MAIN_USER_DETAILS from "../../utils/mainUserDetails";
import api from "../../utils/axiosReq";

const UpdateFavoriteCity = () => {
  const {
    pickedCity,
    // refreshFavoriteCityList,
    // setRefreshFavoriteCityList,
    favoriteCities,
    setPickedFavoriteCity,
    setFavoriteCities,
    setPickedCity,
  } = useContext(handleWeather);

  const checkIfCityExistInFavorites = () => {
    console.log({ pickedCity });
    return favoriteCities.find((city) => city.name === pickedCity);
  };

  const cityExistInFavorites = checkIfCityExistInFavorites() ? true : false;
  console.log({ cityExistInFavorites });

  const [changeFavoriteCityPick, setChangeFavoriteCityPick] =
    useState(cityExistInFavorites);
  //   console.log({ favoriteCityPick: changeFavoriteCityPick });

  //   console.log(`bi bi-heart${changeFavoriteCityPick ? "-fill" : ""}`);

  const handleChangeFavorite = () => {
    // const flagPickedFavorite = changeFavoriteCityPick;
    // TODO:
    // setChangeFavoriteCityPick("sss");
    // console.log(changeFavoriteCityPick);
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
        console.log({ data });
        if (ans.status === 200) {
          console.log("666");
          // ser use state in order to refresh citylist from server

          // setPickedFavoriteCity(pickedCity);
          // debugger;
          // TODO:
          // setRefreshFavoriteCityList(!refreshFavoriteCityList);
          console.log(data?.favoriteCities, { data });
          setFavoriteCities(data?.favoriteCities);
          setPickedCity(pickedCity.toLowerCase());
          // setPickedFavoriteCity(pickedCity.toLowerCase());

          console.log("city was added and list was update");
        } else {
          console.log("didn't add city");
          // TODO: why city change npt to pisckid after add
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
      const cityExistInFavorites = checkIfCityExistInFavorites();

      if (cityExistInFavorites) {
        const ans = await api.put(
          `userFavorites/deldetcitytofavorite/${pickedCity}`,
          {
            body: { ...MAIN_USER_DETAILS },
          }
        );
        const data = await ans?.data;
        console.log({ data });
        if (ans.status === 200) {
          console.log("666");
          // ser use state in order to refresh citylist from server

          // setPickedFavoriteCity(pickedCity);
          // debugger;
          // TODO:
          // setRefreshFavoriteCityList(!refreshFavoriteCityList);
          console.log(data?.favoriteCities, { data });
          setFavoriteCities(data?.favoriteCities);
          //   setPickedCity(pickedCity.toLowerCase());

          console.log("city was delete and list was update");
        } else {
          console.log("didn't delete city");
          // TODO: why city change npt to pisckid after add
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
        title="change favotires"
        type="button"
        className="mt-2 btn  h-100 rounded-1"
        onClick={() => {
          handleChangeFavorite();
        }}
      >
        <i
          className={`bi bi-heart}`}
          //   className={`bi bi-heart${changeFavoriteCityPick ? "-fill" : ""}`}
          onClick={handleChangeFavorite()}
        ></i>
      </button>
    </div>
  );
};

export default UpdateFavoriteCity;
