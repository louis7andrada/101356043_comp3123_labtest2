import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weatherapp.css';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

const getIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

const WeatherApp = () => {
    const [city, setCity] = useState('Toronto');
    const [weatherData, setWeatherData] = useState(null);

    const fetchData = async (searchCity) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`;
        try {
            const response = await axios.get(url);
            setWeatherData(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchData(city);
    };

    useEffect(() => {
        fetchData(city);
    }, [city]);

    // Convert temperature to Fahrenheit
    const toFahrenheit = (celsius) => (celsius * 9/5 + 32).toFixed(2);

    // Get the current date
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="weather-app">
            <form onSubmit={handleSearch} className="search-box">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                />
                <button type="submit">Search</button>
            </form>
            {weatherData && (
                <div className="weather-container">
                    <h1 className="weather-header">Weather in {weatherData.name}</h1>
                    <p className="current-date">{currentDate}</p>
                    <div className="weather-info">
                        <p>Temperature: {weatherData.main.temp} °C</p>
                        <p>Temperature: {toFahrenheit(weatherData.main.temp)} °F</p>
                        <p>Conditions: {weatherData.weather[0].description}</p>
                        <img
                            src={getIconUrl(weatherData.weather[0].icon)}
                            alt={`Weather icon for ${weatherData.weather[0].description}`}
                            className="weather-icon"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
