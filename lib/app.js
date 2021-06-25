const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const { mungeLoc, mungeWea } = require('./munge.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

app.get('/location', async(req, res) => {
  try {
    const city = req.query.search;
    const data = await this.request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${city}&format=jason`);
    const mungedData = mungeLoc(data.body);

    res.json(mungedData);

  } catch(e) {

    res.status(500).json({ message: e.message });
  }
});

app.get('/weather', async(req, res) => {
  try {
    const { lat, long } = req.query;

    const polo = await this.request.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${long}&key=${process.env.WEATHER_KEY}`);

    const mungedWeather = mungeWea(polo.body);
    res.json(mungedWeather);

  } catch(e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = app;