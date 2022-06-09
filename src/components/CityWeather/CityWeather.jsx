import "./CityWeather.css";
import React, { useContext, useEffect, useState } from "react";
import WeatherOfDay from "../WeatherOfDay/WeatherOfDay";
import api from "../../utils/axiosReq";
import handleWeather from "../../context/handleWeather";
import SniperWaitingCircle from "../SniperWaitingCircle/SniperWaitingCircle";

import MAIN_USER_DETAILS from "../../utils/mainUserDetails";
import UpdateFavoriteCity from "../UpdateFavoriteCity/UpdateFavoriteCity";
const NUMBER_OF_DAYS_TO_DISPLAY = 6;

const CityWeather = () => {
  const [cityWeather, setCityWeather] = useState({
    city: "",
    daysWeather: [],
  });
  const [spinnerWaitingForData, setSpinnerWaitingForData] = useState(true);
  const {
    pickedCity,
    // refreshFavoriteCityList,
    // setRefreshFavoriteCityList,
    favoriteCities,
    setPickedFavoriteCity,
    setFavoriteCities,
    setPickedCity,
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
      const cityExistInFavorites = favoriteCities.find(
        (city) => city.name === pickedCity
      );
      if (!cityExistInFavorites) {
        const ans = await api.put(
          `userFavorites/addcitytofavorite/${pickedCity}`,
          {
            body: { ...MAIN_USER_DETAILS },
          }
        );
        const data = await ans?.data;
        // console.log({ data });
        if (ans.status === 200) {
          console.log(data?.favoriteCities, { data });
          setFavoriteCities(data?.favoriteCities);
          setPickedCity(pickedCity.toLowerCase());

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

  const getCityWeatherByNameFromServer = async (pickedCity) => {
    try {
      resetCityWeather();
      setSpinnerWaitingForData(true);
      if (pickedCity) {
        const ans = await api.get(`cityweather/cityname/${pickedCity}`);
        const data = await ans?.data;
        if (ans.status === 200) {
          setCityWeather(data);
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
  }, []);

  useEffect(() => {
    getCityWeatherByNameFromServer(pickedCity);
  }, [pickedCity]);

  return (
    <div>
      <div className="input-group mb-5 CityWeather-title">
        <UpdateFavoriteCity city={pickedCity} />

        <h1 className="ms-3">
          {cityWeather?.city?.name ? (
            <span className="text-success text-capitalize">
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
          {/* show only limited days */}
          {cityWeather?.daysWeather
            .slice(0, NUMBER_OF_DAYS_TO_DISPLAY)
            .map((dayWeather) => (
              <WeatherOfDay key={dayWeather.date} dayWeather={dayWeather} />
            ))}
        </div>
      </div>
      {spinnerWaitingForData && <SniperWaitingCircle />}
    </div>
  );
};

export default CityWeather;
