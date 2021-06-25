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

  const mungedData = {
    'formatted_query': 'Seattle, WA, USA',
    'latitude': '47.606210',
    'longitude': '-122.332071'
  };

  res.json(mungedData);

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