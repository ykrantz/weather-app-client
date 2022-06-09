import "./WeatherOfDay.css";
import React from "react";

const WeatherOfDay = ({ dayWeather: { day, date, low, high, text, code } }) => {
  let todayDate = new Date();

  const dateTime = new Date(
    todayDate.setDate(todayDate.getDate() + (date - 1654743600) / 86400)
  );

  const dd = String(dateTime.getDate()).padStart(2, "0");
  const mm = String(dateTime.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = dateTime.getFullYear();

  const dateFormat = dd + "/" + mm + "/" + yyyy;

  return (
    <div className=" card col-5 col-lg-3 m-2 WeatherOfDay-div-card ">
      <img
        className="WeatherOfDay-image "
        src={`http://l.yimg.com/a/i/us/we/52/${code}.gif`}
      ></img>

      <div className="card-body">
        <h5 className="card-title fs-5">
          {day}
          <br></br> {dateFormat}
        </h5>
        <p className="card-text ">
          <span className="text-dark fs-6  ">{text}</span>
          <br></br>
          <span className="text-info"> day: {high}</span>

          <span className="text-secondary "> night: {low}</span>
        </p>
      </div>
    </div>
  );
};

export default WeatherOfDay;
