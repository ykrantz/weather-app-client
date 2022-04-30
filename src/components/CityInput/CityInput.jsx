import "./CityInput.css";
import React, { useState } from "react";
import api from "../../utils/axiosReq";

const CityInput = () => {
  const [citySearchInput, setCitySearchInput] = useState("");
  const handleCityInputCahnge = (str) => {
    setCitySearchInput(str);
    searchCityStringFromServerApi(str);
  };

  const searchCityStringFromServerApi = async (searchStr) => {
    if (searchStr.length > 2) {
      console.log({ searchStr }, { api });
      const ans = await api.get(`city/searchcity/${searchStr}`);

      const data = await ans.data;
      console.log({ data });
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
