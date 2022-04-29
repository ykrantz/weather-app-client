import "./WeatherOfDay.css";

import React from "react";

const WeatherOfDay = ({ dayWeather: { day, date, low, high, text, code } }) => {
  const dateTime = new Date(date);
  const dd = String(dateTime.getDate()).padStart(2, "0");
  const mm = String(dateTime.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = dateTime.getFullYear();

  const dateFormat = mm + "/" + dd + "/" + yyyy;

  return (
    <div>
      <p>
        date: {dateFormat} || day: {day} || light: {high} || night: {low}
      </p>
    </div>
  );
};

export default WeatherOfDay;
