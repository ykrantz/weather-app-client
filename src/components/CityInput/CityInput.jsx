import "./CityInput.css";
import React, { useContext, useState } from "react";
import api from "../../utils/axiosReq";
import handleWeather from "../../context/handleWeather";
const MIN_SERACH_SRTING_TO_SEARCH = 5;

const CityInput = () => {
  const [citySearchInput, setCitySearchInput] = useState("");

  const { setSearchCitiesResults } = useContext(handleWeather);

  const handleCityInputCahnge = (str) => {
    setCitySearchInput(str);
    setSearchCitiesResults(["waiting for data from server"]);
    searchCityStringFromServerApi(str);
  };

  const searchCityStringFromServerApi = async (searchStr) => {
    if (searchStr.length >= MIN_SERACH_SRTING_TO_SEARCH) {
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
    } else {
      return false;
    }
  };

  return (
    <div>
      <input
        type={"text"}
        placeholder="enter city"
        value={citySearchInput}
        onChange={(e) => handleCityInputCahnge(e.target.value)}
      ></input>
    </div>
  );
};

export default CityInput;
