function mungeLoc(locPolo) {

  const locItem = locPolo;

  return {
    latitiude: locItem.lat,
    longitude: locItem.long
  };
}

function mungeWea(weaPolo) {

  const boogey = weaPolo.stuff;

  const mungeyFor = boogey.map(boogey => {
    return {
      forecast: 'string',
      time: (boogey * 1000)
    };
  });
  return mungeyFor;
}
module.exports = { mungeLoc, mungeWea };