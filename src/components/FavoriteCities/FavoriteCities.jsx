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

  // const [favoriteCities, setFavoriteCities] = useState([]);
  console.log({ favoriteCities });
  const pickedCityExistInFavorites = favoriteCities.find(
    (city) => city.name === pickedCity
  );
  // console.log(
  //   { pickedCityExistInFavorites },
  //   { favoriteCities },
  //   { pickedCity }
  // );
  console.log({ pickedCity }, "22", { pickedCityExistInFavorites });
  // const [pickedFavoriteCity, setPickedFavoriteCity] = useState(
  //   pickedCityExistInFavorites ? pickedCity : ""
  // );

  // const getAllCityWeatherFromServer = async (pickedCity) => {
  //   const ans = await api.get(`city/allcity`);
  //   const data = await ans.data;
  //   console.log({ data }, ans.status);
  //   setFavoriteCities(data);
  //   setPickedFavoriteCity(data[0].name);
  //   setPickedCity(data[0].name);
  // };
  console.log({ pickedFavoriteCity }, "3333");

  const getUserFavoriteCityFromServer = async () => {
    // debugger;

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
          // if favorite city was already picked
          // TODO: mayfix
          // setPickedFavoriteCity(pickedFavoriteCity);
          console.log("%%%%");
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

  const handleGetFavoriteCityList = async () => {
    await getUserFavoriteCityFromServer();

    // setPickedCity(favoriteCities[0]?.name);
    // setPickedFavoriteCity(favoriteCities[0]?.name);
    // debugger;
    // if (favoriteCities.length > 0) {
    //   console.log({ pickedFavoriteCity }, "^^^");
    //   if (pickedCity) {
    //     // if favorite city was already picked
    //     // TODO: mayfix
    //     // setPickedFavoriteCity(pickedFavoriteCity);
    //     console.log("%%%%");
    //     setPickedFavoriteCity(pickedCity);
    //   } else {
    //     setPickedCity(favoriteCities[0]?.name);
    //     setPickedFavoriteCity(favoriteCities[0]?.name);
    //   }
    // }
  };
  const handleUpdatePickedFavoriteCity = () => {
    console.log({ favoriteCities });
    if (favoriteCities.length > 0) {
      console.log({ pickedFavoriteCity }, "^^^");
      if (pickedCity) {
        // if favorite city was already picked
        // TODO: mayfix
        // setPickedFavoriteCity(pickedFavoriteCity);
        console.log("%%%%");
        setPickedFavoriteCity(pickedCity.toLowerCase());
        // setPickedCity(pickedCity);
      } else {
        setPickedCity(favoriteCities[0]?.name);
        setPickedFavoriteCity(favoriteCities[0]?.name);
      }
    }
  };

  useEffect(() => {
    // getAllCityWeatherFromServer();
    // await getUserFavoriteCityFromServer();
    handleGetFavoriteCityList();
    handleUpdatePickedFavoriteCity();
  }, []);

  // useEffect(() => {
  //   console.log("555");
  //   handleGetFavoriteCityList();
  //   handleUpdatePickedFavoriteCity();

  //   // await getUserFavoriteCityFromServer();
  //   // handleUpdateSelectedFavoriteCity();
  //   // TODO: bug after add city. coesn't stay picek
  //   // setPickedFavoriteCity(pickedCity);
  // }, [refreshFavoriteCityList]);

  // console.log(pickedCity);
  // console.log({ favoriteCities });
  return (
    <div className="FavoriteCities-container mt-5 mb-5">
      <h4 className="mb-3 w-75 text-secondary">My favorite cities:</h4>

      <select
        className="form-select  w-75 "
        value={pickedFavoriteCity}
        onChange={
          (e) => {
            handlePickedFavoriteCity(e.target.value);
          }

          // setPickedFavoriteCity(e.target.value)
          // setPickedFavoriteCity("tel aviv");
          // setPickedCity(e.target.value);
        }
        // onClick={(e) => {
        //   handlePickedFavoriteCity(e.target.value);
        // }}
      >
        {favoriteCities.map((city) => (
          <option key={city.id} value={city.name}>
            {/* <option key={city.id} value={city.id}> */}
            <FavoriteCity city={city} />
          </option>
        ))}
      </select>
    </div>
  );
};

export default FavoriteCities;
