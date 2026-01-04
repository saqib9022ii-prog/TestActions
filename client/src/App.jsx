// client/src/App.jsx
import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/weather/${city}`);
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setWeather({ error: "Failed to fetch weather" });
    }
    setLoading(false);
  };

  return (
    <div className="App" style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Weather App</h1>
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
        </div>
      )}

      {weather && weather.error && <p>{weather.error}</p>}
    </div>
  );
}

export default App;
