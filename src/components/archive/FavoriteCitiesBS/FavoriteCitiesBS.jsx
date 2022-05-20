import "./FavoriteCitiesBS.css";

import React, { useContext, useEffect, useState } from "react";
import FavoriteCity from "../../FavoriteCity/FavoriteCity";
import handleWeather from "../../../context/handleWeather";
import api from "../../../utils/axiosReq";
import FavoriteCityBS from "../FavoriteCityBS/FavoriteCityBS";

const FavoriteCitiesBS = () => {
  const { pickedCity, setPickedCity } = useContext(handleWeather);
  const [pickedFavoriteCity, setPickedFavoriteCity] = useState("");

  const [favoriteCities, setFavoriteCities] = useState([]);

  const getAllCityWeatherFromServer = async (pickedCity) => {
    const ans = await api.get(`city/allcity`);
    const data = await ans.data;
    console.log({ data }, ans.status);
    setFavoriteCities(data);
    setPickedFavoriteCity(data[0].name);
    setPickedCity(data[0].name);
  };

  const handlePickedFavoriteCity = (cityName) => {
    setPickedCity(cityName);
    setPickedFavoriteCity(cityName);
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
      <h4>favorite city:</h4>
      <select
        value={pickedFavoriteCity}
        onChange={
          (e) => {
            handlePickedFavoriteCity(e.target.value);
          }
          // setPickedFavoriteCity(e.target.value)
          // setPickedFavoriteCity("tel aviv");
          // setPickedCity(e.target.value);
        }
      >
        {favoriteCities.map((city) => (
          <option key={city.id} value={city.name}>
            {/* <option key={city.id} value={city.id}> */}
            <FavoriteCity city={city} />
          </option>
        ))}
      </select>

      {/* boot strap */}

      <div className="list-group">
        {favoriteCities.map((city) => (
          <FavoriteCityBS city={city} />
        ))}
        <button
          type="button"
          className="list-group-item list-group-item-action active"
        >
          Cras justo odio
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action"
        >
          Dapibus ac facilisis in
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action"
        >
          Morbi leo risus
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action"
        >
          Porta ac consectetur ac
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action"
          disabled
        >
          Vestibulum at eros
        </button>
      </div>
    </div>
  );
};

export default FavoriteCitiesBS;
