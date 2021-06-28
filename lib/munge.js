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

  const mungeyFor = weatherForecasts.map(weatherman => {
    return {
      forecast: weatherman.weather.description,
      time: new Date(weatherman.ts * 1000).toLocaleDateString('en-US', 
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

function mungeRevs(revPolo) {

  const reviews = revPolo.businesses;

  const mungeyRevs = reviews.map(review => {
    return {
      name: review.name,
      image_url: review.image_url,
      price: review.price,
      rating: review.rating,
      url: review.url
    };
  });
  return mungeyRevs;
}
module.exports = { mungeLoc, mungeWea, mungeRevs };