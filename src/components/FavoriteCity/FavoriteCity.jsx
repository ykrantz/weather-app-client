import React from "react";

const FavoriteCity = ({ city: { id, name, country } }) => {
  return (
    <>
      {name}, {country}
    </>
  );
};

export default FavoriteCity;
