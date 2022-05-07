import "./CityInput.css";
import React, { useContext, useState } from "react";
import api from "../../utils/axiosReq";
import handleWeather from "../../context/handleWeather";
import handleCityInputContex from "../../context/handleCityInputContex";
const MIN_SERACH_SRTING_TO_SEARCH = 4;

const CityInput = () => {
  // const [citySearchInput, setCitySearchInput] = useState("");

  const { setSearchCitiesResults, setPickedCity } = useContext(handleWeather);

  const { citySearchInput, setCitySearchInput, setSpinnerWaitingForData } =
    useContext(handleCityInputContex);

  console.log({ citySearchInput });

  const handleCityInputCahnge = (str) => {
    setCitySearchInput(str);
    // setSearchCitiesResults(["waiting for data from server"]);
    setSearchCitiesResults([]);
    searchCityStringFromServerApi(str);
  };

  const searchCityStringFromServerApi = async (searchStr) => {
    try {
      if (searchStr.length >= MIN_SERACH_SRTING_TO_SEARCH) {
        setSpinnerWaitingForData(true);
        console.log("searching from api");
        const ans = await api.get(`city/searchcity/${searchStr}`);

        const data = await ans.data;
        console.log({ data });
        if (ans.status === 200) {
          if (data.length > 0) {
            console.log("founded cities from api");
            setSearchCitiesResults(data);
          } else {
            setSearchCitiesResults([]);
          }
        } else {
          console.log("didn't find cities from api");

          console.log(ans.status, data);
        }
        setSpinnerWaitingForData(false);
      } else {
        return false;
      }
    } catch (e) {
      console.log("Eror: ", e);
      console.log("didn't find cities from api");
      setSpinnerWaitingForData(false);
      setSearchCitiesResults(["No city was found"]);
    }
  };

  return (
    <div className="CityInput-div me-4">
      <nav className="navbar navbar-light bg-light">
        {/* <form class="form-inline"> */}
        <input
          className="form-control mr-sm-2 w-75 me-3"
          type="search"
          placeholder="enter city"
          aria-label="enter city"
          value={citySearchInput}
          onChange={(e) => handleCityInputCahnge(e.target.value)}
        />
        <button
          onClick={() => setPickedCity(citySearchInput)}
          className="btn btn-outline-success my-2 my-sm-0 "
        >
          Search
        </button>
        {/* </form> */}
      </nav>
      {/* <input
        type={"text"}
        placeholder="enter city"
        value={citySearchInput}
        onChange={(e) => handleCityInputCahnge(e.target.value)}
      ></input> */}
    </div>
  );
};

export default CityInput;
