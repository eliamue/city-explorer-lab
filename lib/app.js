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
    const data = await this.request.get(`https://location.com/search.php?key=${process.env.LOCATION_KEY}&q=${city}`);

    const mungedData = mungeLoc(data.body);
    res.json(mungedData);
  } catch(e) {
    res.status(500).json({ message: e.message });
  }
});

app.get('/location', async(req, res) => {
  try {
    const city = req.query.search;
    const data = await this.request.get(`https://location.com/search.php?key=${process.env.LOCATION_KEY}&q=${city}`);

    const mungedWeather = mungeWea(data.body);
    res.json(mungedWeather);

  } catch(e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = app;