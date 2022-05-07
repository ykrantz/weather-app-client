import "./CityWeather.css";
import React, { useContext, useEffect, useState } from "react";
import WeatherOfDay from "../WeatherOfDay/WeatherOfDay";
import api from "../../utils/axiosReq";
import handleWeather from "../../context/handleWeather";
import SniperWaitingCircle from "../SniperWaitingCircle/SniperWaitingCircle";

const CityWeather = () => {
  const [cityWeather, setCityWeather] = useState({
    city: "",
    daysWeather: [],
  });
  const [spinnerWaitingForData, setSpinnerWaitingForData] = useState(false);
  const { pickedCity } = useContext(handleWeather);

  const resetCityWeather = (cityWasntFound = false, cityName) => {
    setCityWeather({
      // city: {
      //   name: cityWasntFound ? `No data for ${cityName} ` : "",
      // },
      city: "",
      daysWeather: [],
    });
  };

  const getCityWeatherByIdFromServer = async (pickedCity) => {
    if (pickedCity) {
      console.log({ api }, "33");
      const ans = await api.get(`cityweather/cityid/${pickedCity}`);
      const data = await ans.data;
      console.log({ data });

      setCityWeather(data);
    }
  };

  const getCityWeatherByNameFromServer = async (pickedCity) => {
    try {
      resetCityWeather();
      setSpinnerWaitingForData(true);
      if (pickedCity) {
        console.log("^^^^");
        const ans = await api.get(`cityweather/cityname/${pickedCity}`);
        console.log("status:", { ans });
        const data = await ans?.data;
        console.log({ ans });
        if (ans.status === 200) {
          setCityWeather(data);
          console.log({ data });
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
      <h1 className="CityWeather-title">
        CityWeather:{"  "}
        {cityWeather?.city?.name ? (
          <span className="text-success">{cityWeather?.city?.name}</span>
        ) : (
          !spinnerWaitingForData && <span className="text-danger">No Data</span>
        )}
      </h1>
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
