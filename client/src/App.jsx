import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("Lahore");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setWeather({ error: "Failed to fetch weather" });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Weather Checker</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        style={{ padding: "0.5rem", marginRight: "1rem" }}
      />
      <button onClick={getWeather} style={{ padding: "0.5rem 1rem" }}>
        Get Weather
      </button>

      {loading && <p>Loading...</p>}

      {weather && !weather.error && (
        <div style={{ marginTop: "1rem" }}>
          <h2>{weather.city}</h2>
          <p>Temperature: {weather.temp} °C</p>
          <p>Condition: {weather.weather}</p>
          {weather.icon && (
            <img src={weather.icon} alt={weather.weather} style={{ width: "80px" }} />
          )}
        </div>
      )}

      {weather && weather.error && <p>{weather.error}</p>}
    </div>
  );
}

export default App;
