function mungeLoc(locPolo) {

  const locItem = locPolo;

  return {
    latitiude: locItem.lat,
    longitude: locItem.long
  };
}

function mungeWea(weaPolo) {

  const boogey = weaPolo.data;

  const mungeyFor = boogey.map(boogey => {
    return {
      forecast: boogey.weather.description,
      time: new Date(boogey * 1000).toLocaleDateString('en-US', 
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