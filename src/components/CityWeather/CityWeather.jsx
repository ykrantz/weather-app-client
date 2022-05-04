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
      console.log({ api }, "33");
      const ans = await api.get(`cityweather/cityid/${pickedCity}`);
      const data = await ans.data;
      console.log({ data });

      setCityWeather(data);
    }
  };

  const getCityWeatherByNameFromServer = async (pickedCity) => {
    if (pickedCity) {
      const ans = await api.get(`cityweather/cityname/${pickedCity}`);
      const data = await ans.data;
      console.log({ ans });
      if (ans.status === 200) {
        setCityWeather(data);
      } else {
        // TODO: when city in't found . we get uncought in promise eror. need to dislplay city wan't found
        console.log("didn't find city details");
        setCityWeather([]);
      }
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
      <h1>CityWeather : {cityWeather?.city.name} </h1>
      <div className="CityWeather-daysWeather">
        <div className="row">
          {cityWeather?.daysWeather.map((dayWeather) => (
            <WeatherOfDay key={dayWeather.date} dayWeather={dayWeather} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityWeather;
