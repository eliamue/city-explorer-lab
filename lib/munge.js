
function mungeLoc(locPolo) {

  const locItem = locPolo[0];

  return {
    formatted_query: locItem.display_name,
    latitude: locItem.lat,
    longitude: locItem.lon
  };
}

function mungeWea(weaPolo) {

  const weatherForecasts = weaPolo.data;

  const mungeyFor = weatherForecasts.map(forecast => {
    return {
      forecast: forecast.weather.description,
      time: new Date(forecast.ts * 1000).toLocaleDateString('en-US', 
        {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }
      )
    };
  });
  return mungeyFor;
}
module.exports = { mungeLoc, mungeWea };