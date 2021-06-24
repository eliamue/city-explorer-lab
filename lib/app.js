const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

app.get('/sup', async(req, res) => {
  res.send('how you doin');
});

module.exports = app;
