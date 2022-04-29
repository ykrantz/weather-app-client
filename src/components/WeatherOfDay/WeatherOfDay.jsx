import "./WeatherOfDay.css";

import React from "react";

const WeatherOfDay = ({
  dayWeather: {
    temp: { min, max },
  },
}) => {
  return (
    <div>
      <p>
        day: {max} || night: {min}
      </p>
    </div>
  );
};

export default WeatherOfDay;
