import "./CityWeather.css";
import React, { useContext, useEffect, useState } from "react";
import WeatherOfDay from "../WeatherOfDay/WeatherOfDay";
import api from "../../utils/axiosReq";
import handleWeather from "../../context/handleWeather";
import SniperWaitingCircle from "../SniperWaitingCircle/SniperWaitingCircle";

import MAIN_USER_DETAILS from "../../utils/mainUserDetails";

const CityWeather = () => {
  const [cityWeather, setCityWeather] = useState({
    city: "",
    daysWeather: [],
  });
  const [spinnerWaitingForData, setSpinnerWaitingForData] = useState(false);
  const {
    pickedCity,
    refreshFavoriteCityList,
    setRefreshFavoriteCityList,
    favoriteCities,
    setPickedFavoriteCity,
  } = useContext(handleWeather);

  const resetCityWeather = (cityWasntFound = false, cityName) => {
    setCityWeather({
      // city: {
      //   name: cityWasntFound ? `No data for ${cityName} ` : "",
      // },
      city: "",
      daysWeather: [],
    });
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
        // console.log({ ans });
        if (ans.status === 200) {
          // ser use state in order to refresh citylist from server
          setPickedFavoriteCity(pickedCity);
          setRefreshFavoriteCityList(!refreshFavoriteCityList);
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

  // const getCityWeatherByIdFromServer = async (pickedCity) => {
  //   if (pickedCity) {
  //     console.log({ api }, "33");
  //     const ans = await api.get(`cityweather/cityid/${pickedCity}`);
  //     const data = await ans.data;
  //     console.log({ data });

  //     setCityWeather(data);
  //   }
  // };

  const getCityWeatherByNameFromServer = async (pickedCity) => {
    try {
      resetCityWeather();
      setSpinnerWaitingForData(true);
      if (pickedCity) {
        const ans = await api.get(`cityweather/cityname/${pickedCity}`);
        const data = await ans?.data;
        console.log({ ans }, "333");
        if (ans.status === 200) {
          setCityWeather(data);
          // console.log({ data });
        } else {
          console.log("didn't find city details");
          resetCityWeather(true, pickedCity);
        }
      }
      setSpinnerWaitingForData(false);
    } catch (e) {
      console.log("EROR: ", e);
      resetCityWeather(true, pickedCity);

      setSpinnerWaitingForData(false);
    }
  };

  useEffect(() => {
    getCityWeatherByNameFromServer(pickedCity);
    // getCityWeatherFromServer(pickedCity);
    // allCityWeatherFromServer();
  }, []);

  useEffect(() => {
    getCityWeatherByNameFromServer(pickedCity);
    // getCityWeatherFromServer(pickedCity);
  }, [pickedCity]);

  return (
    <div>
      <div className="input-group">
        <button
          data-toggle="tooltip"
          data-placement="top"
          title="Add to favotires"
          type="button"
          class="mt-2 btn btn-success h-100 rounded-1"
          onClick={() => {
            addCityToFavoriteInServer();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
          </svg>
        </button>

        <h1 className="CityWeather-title mb-5 ms-3">
          CityWeather:{"  "}
          {cityWeather?.city?.name ? (
            <span className="text-success">
              {cityWeather?.city?.name + ", " + cityWeather?.city?.country}
            </span>
          ) : (
            !spinnerWaitingForData && (
              <span className="text-danger">No Data</span>
            )
          )}
        </h1>
      </div>
      <div className="CityWeather-daysWeather">
        <div className="row">
          {cityWeather?.daysWeather.map((dayWeather) => (
            <WeatherOfDay key={dayWeather.date} dayWeather={dayWeather} />
          ))}
        </div>
      </div>
      {spinnerWaitingForData && <SniperWaitingCircle />}
    </div>
  );
};

export default CityWeather;
