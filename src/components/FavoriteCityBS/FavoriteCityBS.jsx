import React from "react";

const FavoriteCityBS = ({ city: { id, name, country } }) => {
  return (
    <>
      city: {name} || country: {country}
    </>
  );
};

export default FavoriteCityBS;
