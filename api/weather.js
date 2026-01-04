

export default async function handler(req, res) {
  const { city } = req.query;
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  if (!city) return res.status(400).json({ error: "City required" });

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) return res.status(400).json({ error: data.message });

    res.status(200).json({
      city: data.name,
      temp: data.main.temp,
      weather: data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
}
