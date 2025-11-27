import React from "react";
import "./WeatherCards.css";

function WeatherCard({ weather }) {
  if (!weather) {
    return null;
  }

  const {
    name,
    sys,
    weather: weatherArray,
    main,
    wind,
    clouds,
    visibility,
  } = weather;

  const details = weatherArray && weatherArray[0];
  const iconUrl = details
    ? `https://openweathermap.org/img/wn/${details.icon}@2x.png`
    : "";

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div>
          <h2 className="weather-city">
            {name}
            {sys?.country ? `, ${sys.country}` : ""}
          </h2>
          <p className="weather-main-text">{details?.main}</p>
          <p className="weather-description">{details?.description}</p>
        </div>
        {iconUrl && (
          <img
            className="weather-icon"
            src={iconUrl}
            alt={details?.description || "weather icon"}
          />
        )}
      </div>

      <div className="weather-main-info">
        <span className="weather-temp">
          {Math.round(main?.temp)} °C
        </span>
        <span className="weather-feels">
          Feels like {Math.round(main?.feels_like)} °C
        </span>
      </div>

      <div className="weather-extra">
        <p>Min: {Math.round(main?.temp_min)} °C</p>
        <p>Max: {Math.round(main?.temp_max)} °C</p>
        <p>Humidity: {main?.humidity}%</p>
        <p>Pressure: {main?.pressure} hPa</p>
        <p>Wind: {wind?.speed} m/s</p>
        <p>Clouds: {clouds?.all}%</p>
        <p>Visibility: {visibility} m</p>
      </div>
    </div>
  );
}

export default WeatherCard;
