const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const { mungeLoc, mungeWea, mungeRevs } = require('./munge.js');
const request = require('superagent');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

app.get('/location', async(req, res) => {
  try {
    const city = req.query.search;

    const data = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${city}&format=json`);

    const mungedData = mungeLoc(data.body);
    res.json(mungedData);

  } catch(e) {

    res.status(500).json({ message: e.message });
  }
});

app.get('/weather', async(req, res) => {
  try {
    const { lat, lon } = req.query;

    const polo = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_KEY}`);

    const mungeyWeather = mungeWea(polo.body);
    res.json(mungeyWeather);

  } catch(e) {

    res.status(500).json({ message: e.message });
  }
});

app.get('/reviews', async(req, res) => {
  try {
    const { latitude, longitude } = req.query;

    const polo = await request.get(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}`).set('Authorization', `Bearer ${process.env.REVIEWS_KEY}`);
    // .set('Accept', 'application/json');

    const mungeyReviews = mungeRevs(polo.body);
    res.json(mungeyReviews);

  } catch(e) {

    res.status(500).json({ message: e.message });
  }
});

module.exports = app;