import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import WeatherCard from "./components/WeatherCard";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

function App() {
  const [city, setCity] = useState("Toronto");
  const [inputCity, setInputCity] = useState("Toronto");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError("");

    //Without any API KEY
    if (!API_KEY) {
      setLoading(false);
      setError("Missing API key. Please add REACT_APP_WEATHER_API_KEY in .env.");
      return;
    }

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: cityName,
          appid: API_KEY,
          units: "metric",
        },
      });
      setWeatherData(response.data);
      setCity(cityName);
    } catch (err) {
      setError("Could not load weather for that city.");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim() !== "") {
      fetchWeather(inputCity.trim());
    }
  };

  return (
    <div className="app">
      <h1 className="app-title">Simple Weather App</h1>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && weatherData && (
        <WeatherCard weather={weatherData} />
      )}
    </div>
  );
}

export default App;
