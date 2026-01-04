// server/index.js
const express = require("express");
const cors = require("cors")
const fetch = require("node-fetch"); 
const app = express();
app.use(cors())
app.use(express.json());

const API_KEY = "72c8e5b2cce0d762ecda71592ac39d1d"; // we will keep it secret in production later

app.get("/api/weather/:city", async (req, res) => {
  const city = req.params.city;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      return res.status(400).json({ error: data.message });
    }

    res.json({
      city: data.name,
      temp: data.main.temp,
      weather: data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});


app.listen(5000, () => console.log("Server running on 5000"));
