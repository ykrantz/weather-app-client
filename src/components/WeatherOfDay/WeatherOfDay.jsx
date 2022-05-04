import "./WeatherOfDay.css";

import React from "react";

const WeatherOfDay = ({ dayWeather: { day, date, low, high, text, code } }) => {
  const dateTime = new Date(date);
  console.log({ date });
  const dd = String(dateTime.getDate()).padStart(2, "0");
  const mm = String(dateTime.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = dateTime.getFullYear();

  const dateFormat = mm + "/" + dd + "/" + yyyy;

  return (
    <div className="card col-3 m-2">
      <img
        className="card-img-top"
        src="../../images/weatherIcons/32-suuny.png"
        // alt="Card image cap"
      />
      {/* <img
        className="card-img-top"
        src={`http://l.yimg.com/a/i/us/we/52/{${code}}.gif`}
        alt="Card image cap"
      /> */}
      <div className="card-body">
        <h5 className="card-title">
          date: {dateFormat} || day: {day}
        </h5>
        <p className="card-text">
          light: {high} || night: {low}
        </p>
      </div>
    </div>
    // <div>

    //   <p>
    //     date: {dateFormat} || day: {day} || light: {high} || night: {low}
    //   </p>
    // </div>
  );
};

export default WeatherOfDay;
