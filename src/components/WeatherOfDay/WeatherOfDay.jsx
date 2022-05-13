import "./WeatherOfDay.css";

import React from "react";

const WeatherOfDay = ({ dayWeather: { day, date, low, high, text, code } }) => {
  // const dateTime = new Date(date );
  // TODO: fix the date so it will be currect
  let todayDate = new Date();
  // add a day
  const dateTime = new Date(
    todayDate.setDate(todayDate.getDate() + ((date - 1651892400) / 86400 - 1))
  );
  // const dateTime = new Date(date - 1651892400 + new Date().getTime());

  // console.log({ dateTime }, { day });
  const dd = String(dateTime.getDate()).padStart(2, "0");
  const mm = String(dateTime.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = dateTime.getFullYear();

  const dateFormat = mm + "/" + dd + "/" + yyyy;

  return (
    <div className="card col-5 col-lg-3 m-2">
      <img
        className="card-img-top"
        src="../../images/weatherIcons/32-suuny.png"

        // alt="Card image cap"
      />

      {/* TODO: image to exah term */}
      {/* <object
        data="../../images/test/undraw_a_moment_to_relax_re_v5gv.svg"
        type="image/svg+xml"
      ></object> */}
      {/* <i class="wi wi-night-sleet"></i> */}
      {/* <img
        className="card-img-top"
        // src="../../images/weatherIcons/32-suuny.png"
        // src="../../images/weather-icons-master/svg/wi-cloudy.svg"
        src="../../images/weatherIcons/wi-day-cloudy-gusts-t4-jp.JPG"
        // width={"520px"}
        // alt="Card image cap"
      /> */}

      {/* <svg xmlns="../../images/test/undraw_a_moment_to_relax_re_v5gv.svg"></svg> */}

      {/* <img
        className="card-img-top"
        src={`http://l.yimg.com/a/i/us/we/52/{${code}}.gif`}
        alt="Card image cap"
      /> */}
      <div className="card-body">
        <h5 className="card-title">
          {day}
          <br></br> {dateFormat}
        </h5>
        <p className="card-text">
          <p>{text}</p>
          <span className="text-info"> day: {high}</span> ||{" "}
          <span className="text-secondary"> night: {low}</span>
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
