import "./FavoriteCities.css";

import React, { useContext, useEffect, useState } from "react";
import FavoriteCity from "../FavoriteCity/FavoriteCity";
import handleWeather from "../../context/handleWeather";
import api from "../../utils/axiosReq";

const FavoriteCities = () => {
  const { pickedCity, setPickedCity } = useContext(handleWeather);

  const [favoriteCities, setFavoriteCities] = useState([]);

  const getAllCityWeatherFromServer = async (pickedCity) => {
    const ans = await api.get(`city/allcity`);
    const data = await ans.data;
    console.log({ data }, ans.status);
    setFavoriteCities(data);
    setPickedCity(data[0].id);
  };

  // const favoriteCitiesFromServer = [
  //   {
  //     id: "2643743",
  //     name: "london",
  //     country: "GB",

  //     coord: {
  //       lon: "123213",
  //       lat: "1221313",
  //     },
  //     population: "123213213",
  //     timezone: 3,
  //   },
  //   {
  //     id: "2988507",
  //     name: "paris",
  //     country: "",

  //     coord: {
  //       lon: "123213",
  //       lat: "1221313",
  //     },
  //     population: "123213213",
  //     timezone: 3,
  //   },
  //   {
  //     id: "293397",
  //     name: "tel aviv",
  //     country: "",

  //     coord: {
  //       lon: "123213",
  //       lat: "1221313",
  //     },
  //     population: "123213213",
  //     timezone: 3,
  //   },
  // ];

  useEffect(() => {
    getAllCityWeatherFromServer();
  }, []);

  // console.log(pickedCity);
  // console.log({ favoriteCities });
  return (
    <div>
      <select
        value={pickedCity}
        onChange={(e) => setPickedCity(e.target.value)}
      >
        {favoriteCities.map((city) => (
          <option key={city.id} value={city.id}>
            <FavoriteCity city={city} />
          </option>
        ))}
      </select>
    </div>
  );
};

export default FavoriteCities;
