import "./CityWeather.css";
import React, { useContext, useEffect, useState } from "react";
import WeatherOfDay from "../WeatherOfDay/WeatherOfDay";
import api from "../../utils/axiosReq";
import handleWeather from "../../context/handleWeather";

const CityWeather = () => {
  const [cityWeather, setCityWeather] = useState({
    city: "",
    daysWeather: [],
  });
  const { pickedCity } = useContext(handleWeather);

  const getCityWeatherFromServer = async (pickedCity) => {
    if (pickedCity) {
      const ans = await api.get(`cityweather/cityid/${pickedCity}`);
      const data = await ans.data;
      console.log({ data });

      setCityWeather(data);
    }
  };

  useEffect(() => {
    getCityWeatherFromServer(pickedCity);
    // allCityWeatherFromServer();
  }, []);

  useEffect(() => {
    getCityWeatherFromServer(pickedCity);
  }, [pickedCity]);

  return (
    <div>
      <h1>CityWeather : {cityWeather?.city.name} </h1>
      {cityWeather?.daysWeather.map((dayWeather) => (
        <WeatherOfDay key={dayWeather.date} dayWeather={dayWeather} />
      ))}
    </div>
  );
};

export default CityWeather;
