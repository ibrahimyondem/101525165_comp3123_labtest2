import React from "react";

function WeatherCard({ weather }) {
  if (!weather) {
    return <p>No weather data yet.</p>;
  }

  return (
    <div>
      <h2>{weather.name}</h2>
      <p>{weather.main.temp} °C</p>
      <p>{weather.weather[0].description}</p>
    </div>
  );
}

export default WeatherCard;
