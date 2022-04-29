import React from "react";

const FavoriteCity = ({ city: { id, name, country } }) => {
  return (
    <>
      city: {name} || country: {country}
    </>
  );
};

export default FavoriteCity;
