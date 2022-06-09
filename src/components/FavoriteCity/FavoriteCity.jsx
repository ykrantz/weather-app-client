import React from "react";
import capitilizeText from "../../utils/capitilizeText";

const FavoriteCity = ({ city: { id, name, country } }) => {
  const capitilizeName = capitilizeText(name);
  const capitilizecountry = capitilizeText(country);

  return (
    <>
      {capitilizeName}, {capitilizecountry}
    </>
  );
};

export default FavoriteCity;
