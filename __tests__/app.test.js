require('dotenv').config();

const fakeRequest = require('supertest');
const app = require('../lib/app');
const { mungeLoc, mungeWea, mungeRevs } = require('../lib/munge');

describe('app routes and mungeing', () => {
  describe('routes', () => {

    //app route tests

    test('returns location data', async() => {
      const expectation =
        {
          'formatted_query': 'Seattle, King County, Washington, USA',
          'latitude': '47.6038321',
          'longitude': '-122.3300624'
        };

      const data = await fakeRequest(app)
        .get('/location?search=seattle')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

    test('returns weather data', async() => {
      const expectation =   [
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {    'forecast': expect.any(String),
          'time': expect.any(String)
        }
      ];

      const data = await fakeRequest(app)
        .get('/weather?latitude=47.6038321&longitude=-122.3300624')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

    test('returns review data', async() => {
      const expectation =
      [{ 'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/ZyQjV-wJQ2GHyX7l3jfbyg/o.jpg', 'name': 'Pike Place Chowder', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/pike-place-chowder-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/qGlIuj5yn6i82DK8kxw4Uw/o.jpg', 'name': 'Piroshky Piroshky', 'price': '$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/piroshky-piroshky-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/jsZkRaDQ6aEa6jwRGWDi5Q/o.jpg', 'name': 'Ellenos Real Greek Yogurt', 'price': '$', 'rating': 5, 'url': 'https://www.yelp.com/biz/ellenos-real-greek-yogurt-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/SdnJM6TCUmlKlpN6bnP-Rg/o.jpg', 'name': 'The Pink Door', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/the-pink-door-seattle-4?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/nJgiyjMZ7sglAtc5wyKSLQ/o.jpg', 'name': 'Storyville Coffee Company', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/storyville-coffee-company-seattle-9?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/vucCrknnlu1RRvRaKWwovQ/o.jpg', 'name': 'Japonessa Sushi Cocina', 'price': '$$', 'rating': 4, 'url': 'https://www.yelp.com/biz/japonessa-sushi-cocina-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/Pxq-GrSvmQCjHxPoCLgsfw/o.jpg', 'name': 'Starbucks Reserve Roastery Seattle', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/starbucks-reserve-roastery-seattle-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/nA5msGED9d3Bn5ldV2UgHA/o.jpg', 'name': 'The Crumpet Shop', 'price': '$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/the-crumpet-shop-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/hh5CwveJRABseaWt_UxtXA/o.jpg', 'name': 'Beecher\'s Handmade Cheese', 'price': '$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/beechers-handmade-cheese-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/ZxGvVggINkZ_BI3u7OX4CA/o.jpg', 'name': 'Biscuit Bitch', 'price': '$', 'rating': 4, 'url': 'https://www.yelp.com/biz/biscuit-bitch-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/5fmWSH9EoNSFLCRakj8tSw/o.jpg', 'name': 'Le Panier French Bakery', 'price': '$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/le-panier-french-bakery-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/qX2VP_ovmhS6NNlO0zi4gA/o.jpg', 'name': 'Salumi Artisan Cured Meats', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/salumi-artisan-cured-meats-seattle-2?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/y37Xvo70cY1kh6-d1vDdfQ/o.jpg', 'name': 'Lola', 'price': '$$', 'rating': 4, 'url': 'https://www.yelp.com/biz/lola-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/mHyyfLAUge0LjN5t1hYfKw/o.jpg', 'name': 'Serious Pie', 'price': '$$', 'rating': 4, 'url': 'https://www.yelp.com/biz/serious-pie-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/2Jk8ycCKf7XaSrHdpWxEdw/o.jpg', 'name': 'Metropolitan Grill', 'price': '$$$$', 'rating': 4, 'url': 'https://www.yelp.com/biz/metropolitan-grill-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/naJ4Nkphiis5M36tGrGHJA/o.jpg', 'name': 'Elliott\'s Oyster House', 'price': '$$$', 'rating': 4, 'url': 'https://www.yelp.com/biz/elliotts-oyster-house-seattle-2?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/iUTo8Vc5is6j5dO358VWTg/o.jpg', 'name': 'Von\'s 1000 Spirits', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/vons-1000-spirits-seattle-4?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/lH44FL3TivTFgJCjDNWnJA/o.jpg', 'name': 'Tat\'s Delicatessen', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/tats-delicatessen-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/21QxhWyYxnlHjOBKUysvYA/o.jpg', 'name': 'Purple Café and Wine Bar', 'price': '$$$', 'rating': 4, 'url': 'https://www.yelp.com/biz/purple-caf%C3%A9-and-wine-bar-seattle-3?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/W9DnG_PyGHOtApxbAoFOqA/o.jpg', 'name': 'Radiator Whiskey', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/radiator-whiskey-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }];

      const data = await fakeRequest(app)
        .get('/reviews?latitude=47.6038321&longitude=-122.3300624')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

    //munged data tests

    test('takes in original longform reviews data and returns munged reviews data', async() => {
      const expectation =
      [{ 'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/ZyQjV-wJQ2GHyX7l3jfbyg/o.jpg', 'name': 'Pike Place Chowder', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/pike-place-chowder-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/qGlIuj5yn6i82DK8kxw4Uw/o.jpg', 'name': 'Piroshky Piroshky', 'price': '$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/piroshky-piroshky-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/jsZkRaDQ6aEa6jwRGWDi5Q/o.jpg', 'name': 'Ellenos Real Greek Yogurt', 'price': '$', 'rating': 5, 'url': 'https://www.yelp.com/biz/ellenos-real-greek-yogurt-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/SdnJM6TCUmlKlpN6bnP-Rg/o.jpg', 'name': 'The Pink Door', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/the-pink-door-seattle-4?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/nJgiyjMZ7sglAtc5wyKSLQ/o.jpg', 'name': 'Storyville Coffee Company', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/storyville-coffee-company-seattle-9?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/vucCrknnlu1RRvRaKWwovQ/o.jpg', 'name': 'Japonessa Sushi Cocina', 'price': '$$', 'rating': 4, 'url': 'https://www.yelp.com/biz/japonessa-sushi-cocina-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/Pxq-GrSvmQCjHxPoCLgsfw/o.jpg', 'name': 'Starbucks Reserve Roastery Seattle', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/starbucks-reserve-roastery-seattle-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/nA5msGED9d3Bn5ldV2UgHA/o.jpg', 'name': 'The Crumpet Shop', 'price': '$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/the-crumpet-shop-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/hh5CwveJRABseaWt_UxtXA/o.jpg', 'name': 'Beecher\'s Handmade Cheese', 'price': '$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/beechers-handmade-cheese-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/ZxGvVggINkZ_BI3u7OX4CA/o.jpg', 'name': 'Biscuit Bitch', 'price': '$', 'rating': 4, 'url': 'https://www.yelp.com/biz/biscuit-bitch-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/5fmWSH9EoNSFLCRakj8tSw/o.jpg', 'name': 'Le Panier French Bakery', 'price': '$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/le-panier-french-bakery-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/qX2VP_ovmhS6NNlO0zi4gA/o.jpg', 'name': 'Salumi Artisan Cured Meats', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/salumi-artisan-cured-meats-seattle-2?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/y37Xvo70cY1kh6-d1vDdfQ/o.jpg', 'name': 'Lola', 'price': '$$', 'rating': 4, 'url': 'https://www.yelp.com/biz/lola-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/mHyyfLAUge0LjN5t1hYfKw/o.jpg', 'name': 'Serious Pie', 'price': '$$', 'rating': 4, 'url': 'https://www.yelp.com/biz/serious-pie-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/2Jk8ycCKf7XaSrHdpWxEdw/o.jpg', 'name': 'Metropolitan Grill', 'price': '$$$$', 'rating': 4, 'url': 'https://www.yelp.com/biz/metropolitan-grill-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/naJ4Nkphiis5M36tGrGHJA/o.jpg', 'name': 'Elliott\'s Oyster House', 'price': '$$$', 'rating': 4, 'url': 'https://www.yelp.com/biz/elliotts-oyster-house-seattle-2?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/iUTo8Vc5is6j5dO358VWTg/o.jpg', 'name': 'Von\'s 1000 Spirits', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/vons-1000-spirits-seattle-4?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/lH44FL3TivTFgJCjDNWnJA/o.jpg', 'name': 'Tat\'s Delicatessen', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/tats-delicatessen-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/21QxhWyYxnlHjOBKUysvYA/o.jpg', 'name': 'Purple Café and Wine Bar', 'price': '$$$', 'rating': 4, 'url': 'https://www.yelp.com/biz/purple-caf%C3%A9-and-wine-bar-seattle-3?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/W9DnG_PyGHOtApxbAoFOqA/o.jpg', 'name': 'Radiator Whiskey', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/radiator-whiskey-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }];

      const input = {
        'businesses': [
          {
            'id': '6I28wDuMBR5WLMqfKxaoeg',
            'alias': 'pike-place-chowder-seattle',
            'name': 'Pike Place Chowder',
            'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/ZyQjV-wJQ2GHyX7l3jfbyg/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/pike-place-chowder-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA',
            'review_count': 7574,
            'categories': [
              {
                'alias': 'seafood',
                'title': 'Seafood'
              },
              {
                'alias': 'soup',
                'title': 'Soup'
              }
            ],
            'rating': 4.5,
            'coordinates': {
              'latitude': 47.60939,
              'longitude': -122.34112
            },
            'transactions': [
              'delivery',
              'pickup'
            ],
            'price': '$$',
            'location': {
              'address1': '1530 Post Aly',
              'address2': 'Ste 11',
              'address3': '',
              'city': 'Seattle',
              'zip_code': '98101',
              'country': 'US',
              'state': 'WA',
              'display_address': [
                '1530 Post Aly',
                'Ste 11',
                'Seattle, WA 98101'
              ]
            },
            'phone': '+12062672537',
            'display_phone': '(206) 267-2537',
            'distance': 1033.824249573459
          },
          {
            'id': 'NxwrJPJLzTs0k0DQ-QCo1A',
            'alias': 'piroshky-piroshky-seattle',
            'name': 'Piroshky Piroshky',
            'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/qGlIuj5yn6i82DK8kxw4Uw/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/piroshky-piroshky-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA',
            'review_count': 6393,
            'categories': [
              {
                'alias': 'bakeries',
                'title': 'Bakeries'
              },
              {
                'alias': 'russian',
                'title': 'Russian'
              }
            ],
            'rating': 4.5,
            'coordinates': {
              'latitude': 47.60991,
              'longitude': -122.34231
            },
            'transactions': [
              'delivery',
              'pickup'
            ],
            'price': '$',
            'location': {
              'address1': '1908 Pike Pl',
              'address2': '',
              'address3': '',
              'city': 'Seattle',
              'zip_code': '98101',
              'country': 'US',
              'state': 'WA',
              'display_address': [
                '1908 Pike Pl',
                'Seattle, WA 98101'
              ]
            },
            'phone': '+12064416068',
            'display_phone': '(206) 441-6068',
            'distance': 1149.3174056850469
          },
          {
            'id': 'CKxp6p22ipCo94iLieXzbQ',
            'alias': 'ellenos-real-greek-yogurt-seattle',
            'name': 'Ellenos Real Greek Yogurt',
            'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/jsZkRaDQ6aEa6jwRGWDi5Q/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/ellenos-real-greek-yogurt-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA',
            'review_count': 1960,
            'categories': [
              {
                'alias': 'desserts',
                'title': 'Desserts'
              }
            ],
            'rating': 5.0,
            'coordinates': {
              'latitude': 47.608912,
              'longitude': -122.34058
            },
            'transactions': [
              'delivery',
              'pickup'
            ],
            'price': '$',
            'location': {
              'address1': '1500 Pike Pl',
              'address2': '',
              'address3': '',
              'city': 'Seattle',
              'zip_code': '98101',
              'country': 'US',
              'state': 'WA',
              'display_address': [
                '1500 Pike Pl',
                'Seattle, WA 98101'
              ]
            },
            'phone': '+12065357562',
            'display_phone': '(206) 535-7562',
            'distance': 969.948917408613
          },
          {
            'id': 'VOPdG8llLPaga9iJxXcMuQ',
            'alias': 'the-pink-door-seattle-4',
            'name': 'The Pink Door',
            'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/SdnJM6TCUmlKlpN6bnP-Rg/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/the-pink-door-seattle-4?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA',
            'review_count': 5350,
            'categories': [
              {
                'alias': 'italian',
                'title': 'Italian'
              },
              {
                'alias': 'wine_bars',
                'title': 'Wine Bars'
              },
              {
                'alias': 'seafood',
                'title': 'Seafood'
              }
            ],
            'rating': 4.5,
            'coordinates': {
              'latitude': 47.61028,
              'longitude': -122.3425
            },
            'transactions': [
              'delivery'
            ],
            'price': '$$',
            'location': {
              'address1': '1919 Post Alley',
              'address2': '',
              'address3': '',
              'city': 'Seattle',
              'zip_code': '98101',
              'country': 'US',
              'state': 'WA',
              'display_address': [
                '1919 Post Alley',
                'Seattle, WA 98101'
              ]
            },
            'phone': '+12064433241',
            'display_phone': '(206) 443-3241',
            'distance': 1185.5875469313717
          },
          {
            'id': 'FVzl8rDPiTWEtrNEuCu-Xg',
            'alias': 'storyville-coffee-company-seattle-9',
            'name': 'Storyville Coffee Company',
            'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/nJgiyjMZ7sglAtc5wyKSLQ/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/storyville-coffee-company-seattle-9?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA',
            'review_count': 1836,
            'categories': [
              {
                'alias': 'coffee',
                'title': 'Coffee & Tea'
              },
              {
                'alias': 'bakeries',
                'title': 'Bakeries'
              },
              {
                'alias': 'waffles',
                'title': 'Waffles'
              }
            ],
            'rating': 4.5,
            'coordinates': {
              'latitude': 47.60895949363687,
              'longitude': -122.34043157053927
            },
            'transactions': [
              'delivery',
              'pickup'
            ],
            'price': '$$',
            'location': {
              'address1': '94 Pike St',
              'address2': 'Ste 34',
              'address3': '',
              'city': 'Seattle',
              'zip_code': '98101',
              'country': 'US',
              'state': 'WA',
              'display_address': [
                '94 Pike St',
                'Ste 34',
                'Seattle, WA 98101'
              ]
            },
            'phone': '+12067805777',
            'display_phone': '(206) 780-5777',
            'distance': 964.0382167170328
          },
          {
            'id': 'L8RRAd-JZ0Bd4MER0yyX-g',
            'alias': 'japonessa-sushi-cocina-seattle',
            'name': 'Japonessa Sushi Cocina',
            'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/vucCrknnlu1RRvRaKWwovQ/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/japonessa-sushi-cocina-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA',
            'review_count': 4763,
            'categories': [
              {
                'alias': 'japanese',
                'title': 'Japanese'
              },
              {
                'alias': 'sushi',
                'title': 'Sushi Bars'
              },
              {
                'alias': 'cocktailbars',
                'title': 'Cocktail Bars'
              }
            ],
            'rating': 4.0,
            'coordinates': {
              'latitude': 47.6079793649921,
              'longitude': -122.339042355669
            },
            'transactions': [
              'delivery'
            ],
            'price': '$$',
            'location': {
              'address1': '1400 1st Ave',
              'address2': '',
              'address3': '',
              'city': 'Seattle',
              'zip_code': '98101',
              'country': 'US',
              'state': 'WA',
              'display_address': [
                '1400 1st Ave',
                'Seattle, WA 98101'
              ]
            },
            'phone': '+12069717979',
            'display_phone': '(206) 971-7979',
            'distance': 816.0292860649765
          },
          {
            'id': '6ZKNFPLWRIVWshUkMNlgng',
            'alias': 'starbucks-reserve-roastery-seattle-seattle',
            'name': 'Starbucks Reserve Roastery Seattle',
            'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/Pxq-GrSvmQCjHxPoCLgsfw/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/starbucks-reserve-roastery-seattle-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA',
            'review_count': 3106,
            'categories': [
              {
                'alias': 'coffee',
                'title': 'Coffee & Tea'
              },
              {
                'alias': 'coffeeroasteries',
                'title': 'Coffee Roasteries'
              }
            ],
            'rating': 4.5,
            'coordinates': {
              'latitude': 47.61401,
              'longitude': -122.32811
            },
            'transactions': [
              'delivery'
            ],
            'price': '$$',
            'location': {
              'address1': '1124 Pike St',
              'address2': '',
              'address3': '',
              'city': 'Seattle',
              'zip_code': '98101',
              'country': 'US',
              'state': 'WA',
              'display_address': [
                '1124 Pike St',
                'Seattle, WA 98101'
              ]
            },
            'phone': '+12066240173',
            'display_phone': '(206) 624-0173',
            'distance': 1141.1547869791877
          },
          {
            'id': 'aX2ctpgS9uvFDfdzCXjecA',
            'alias': 'the-crumpet-shop-seattle',
            'name': 'The Crumpet Shop',
            'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/nA5msGED9d3Bn5ldV2UgHA/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/the-crumpet-shop-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA',
            'review_count': 2364,
            'categories': [
              {
                'alias': 'bakeries',
                'title': 'Bakeries'
              },
              {
                'alias': 'coffee',
                'title': 'Coffee & Tea'
              },
              {
                'alias': 'breakfast_brunch',
                'title': 'Breakfast & Brunch'
              }
            ],
            'rating': 4.5,
            'coordinates': {
              'latitude': 47.60899,
              'longitude': -122.34044
            },
            'transactions': [
              'delivery'
            ],
            'price': '$',
            'location': {
              'address1': '1503 1st Ave',
              'address2': '',
              'address3': '',
              'city': 'Seattle',
              'zip_code': '98101',
              'country': 'US',
              'state': 'WA',
              'display_address': [
                '1503 1st Ave',
                'Seattle, WA 98101'
              ]
            },
            'phone': '+12066821598',
            'display_phone': '(206) 682-1598',
            'distance': 972.842611401474
          },
          {
            'id': 'mNdz7zdezTkiuk8S-cIKxg',
            'alias': 'beechers-handmade-cheese-seattle',
            'name': 'Beecher\'s Handmade Cheese',
            'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/hh5CwveJRABseaWt_UxtXA/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/beechers-handmade-cheese-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA',
            'review_count': 3044,
            'categories': [
              {
                'alias': 'cheese',
                'title': 'Cheese Shops'
              },
              {
                'alias': 'sandwiches',
                'title': 'Sandwiches'
              }
            ],
            'rating': 4.5,
            'coordinates': {
              'latitude': 47.60963,
              'longitude': -122.34179
            },
            'transactions': [
              'delivery',
              'pickup'
            ],
            'price': '$',
            'location': {
              'address1': '1600 Pike Pl',
              'address2': '',
              'address3': '',
              'city': 'Seattle',
              'zip_code': '98101',
              'country': 'US',
              'state': 'WA',
              'display_address': [
                '1600 Pike Pl',
                'Seattle, WA 98101'
              ]
            },
            'phone': '+12069561964',
            'display_phone': '(206) 956-1964',
            'distance': 1094.5690987855573
          },
          {
            'id': '09FLRYnePKcUwGDDPIOAkg',
            'alias': 'biscuit-bitch-seattle',
            'name': 'Biscuit Bitch',
            'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/ZxGvVggINkZ_BI3u7OX4CA/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/biscuit-bitch-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA',
            'review_count': 3990,
            'categories': [
              {
                'alias': 'breakfast_brunch',
                'title': 'Breakfast & Brunch'
              },
              {
                'alias': 'coffee',
                'title': 'Coffee & Tea'
              },
              {
                'alias': 'southern',
                'title': 'Southern'
              }
            ],
            'rating': 4.0,
            'coordinates': {
              'latitude': 47.61034,
              'longitude': -122.34167
            },
            'transactions': [
              'delivery'
            ],
            'price': '$',
            'location': {
              'address1': '1909 1st Ave',
              'address2': '',
              'address3': '',
              'city': 'Seattle',
              'zip_code': '98101',
              'country': 'US',
              'state': 'WA',
              'display_address': [
                '1909 1st Ave',
                'Seattle, WA 98101'
              ]
            },
            'phone': '+12064417999',
            'display_phone': '(206) 441-7999',
            'distance': 1144.6740671250118
          },
          {
            'id': 'Eh-7d5coQltQfQWAtWnPyg',
            'alias': 'le-panier-french-bakery-seattle',
            'name': 'Le Panier French Bakery',
            'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/5fmWSH9EoNSFLCRakj8tSw/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/le-panier-french-bakery-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA',
            'review_count': 2456,
            'categories': [
              {
                'alias': 'bakeries',
                'title': 'Bakeries'
              },
              {
                'alias': 'sandwiches',
                'title': 'Sandwiches'
              },
              {
                'alias': 'cakeshop',
                'title': 'Patisserie/Cake Shop'
              }
            ],
            'rating': 4.5,
            'coordinates': {
              'latitude': 47.6098933070898,
              'longitude': -122.342474609613
            },
            'transactions': [
              'delivery'
            ],
            'price': '$',
            'location': {
              'address1': '1902 Pike Pl',
              'address2': '',
              'address3': '',
              'city': 'Seattle',
              'zip_code': '98101',
              'country': 'US',
              'state': 'WA',
              'display_address': [
                '1902 Pike Pl',
                'Seattle, WA 98101'
              ]
            },
            'phone': '+12064413669',
            'display_phone': '(206) 441-3669',
            'distance': 1131.178799592818
          },
          {
            'id': 'T7XmistL2pQrW3hY3oTpng',
            'alias': 'salumi-artisan-cured-meats-seattle-2',
            'name': 'Salumi Artisan Cured Meats',
            'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/qX2VP_ovmhS6NNlO0zi4gA/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/salumi-artisan-cured-meats-seattle-2?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA',
            'review_count': 1384,
            'categories': [
              {
                'alias': 'italian',
                'title': 'Italian'
              },
              {
                'alias': 'sandwiches',
                'title': 'Sandwiches'
              },
              {
                'alias': 'meats',
                'title': 'Meat Shops'
              }
            ],
            'rating': 4.5,
            'coordinates': {
              'latitude': 47.59898,
              'longitude': -122.33269
            },
            'transactions': [
              'delivery',
              'pickup'
            ],
            'price': '$$',
            'location': {
              'address1': '404 Occidental Ave S',
              'address2': '',
              'address3': '',
              'city': 'Seattle',
              'zip_code': '98104',
              'country': 'US',
              'state': 'WA',
              'display_address': [
                '404 Occidental Ave S',
                'Seattle, WA 98104'
              ]
            },
            'phone': '+12066218772',
            'display_phone': '(206) 621-8772',
            'distance': 572.3979208787654
          },
          {
            'id': 'oq5KCmPFKV28BnB4hjpo_g',
            'alias': 'lola-seattle',
            'name': 'Lola',
            'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/y37Xvo70cY1kh6-d1vDdfQ/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/lola-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA',
            'review_count': 3933,
            'categories': [
              {
                'alias': 'greek',
                'title': 'Greek'
              },
              {
                'alias': 'mediterranean',
                'title': 'Mediterranean'
              },
              {
                'alias': 'breakfast_brunch',
                'title': 'Breakfast & Brunch'
              }
            ],
            'rating': 4.0,
            'coordinates': {
              'latitude': 47.6132519777742,
              'longitude': -122.340060726984
            },
            'transactions': [
              'delivery'
            ],
            'price': '$$',
            'location': {
              'address1': '2000 4th Ave',
              'address2': null,
              'address3': '',
              'city': 'Seattle',
              'zip_code': '98121',
              'country': 'US',
              'state': 'WA',
              'display_address': [
                '2000 4th Ave',
                'Seattle, WA 98121'
              ]
            },
            'phone': '+12064411430',
            'display_phone': '(206) 441-1430',
            'distance': 1288.0007211149011
          },
          {
            'id': '-FOAQv22SXtSBs7nptI3UA',
            'alias': 'serious-pie-seattle',
            'name': 'Serious Pie',
            'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/mHyyfLAUge0LjN5t1hYfKw/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/serious-pie-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA',
            'review_count': 4174,
            'categories': [
              {
                'alias': 'pizza',
                'title': 'Pizza'
              }
            ],
            'rating': 4.0,
            'coordinates': {
              'latitude': 47.61296,
              'longitude': -122.34047
            },
            'transactions': [
              'delivery',
              'pickup'
            ],
            'price': '$$',
            'location': {
              'address1': '316 Virginia St',
              'address2': null,
              'address3': '',
              'city': 'Seattle',
              'zip_code': '98121',
              'country': 'US',
              'state': 'WA',
              'display_address': [
                '316 Virginia St',
                'Seattle, WA 98121'
              ]
            },
            'phone': '+12068387388',
            'display_phone': '(206) 838-7388',
            'distance': 1279.7015541496398
          },
          {
            'id': 'lxvncNXJKThTmLmARv72pA',
            'alias': 'metropolitan-grill-seattle',
            'name': 'Metropolitan Grill',
            'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/2Jk8ycCKf7XaSrHdpWxEdw/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/metropolitan-grill-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA',
            'review_count': 1800,
            'categories': [
              {
                'alias': 'tradamerican',
                'title': 'American (Traditional)'
              },
              {
                'alias': 'steak',
                'title': 'Steakhouses'
              }
            ],
            'rating': 4.0,
            'coordinates': {
              'latitude': 47.604438,
              'longitude': -122.334126
            },
            'transactions': [
              'delivery',
              'pickup'
            ],
            'price': '$$$$',
            'location': {
              'address1': '820 2nd Ave',
              'address2': '',
              'address3': '',
              'city': 'Seattle',
              'zip_code': '98104',
              'country': 'US',
              'state': 'WA',
              'display_address': [
                '820 2nd Ave',
                'Seattle, WA 98104'
              ]
            },
            'phone': '+12066243287',
            'display_phone': '(206) 624-3287',
            'distance': 312.0208128156214
          },
          {
            'id': 'xqH038QcquJEMm5LIZHd5w',
            'alias': 'elliotts-oyster-house-seattle-2',
            'name': 'Elliott\'s Oyster House',
            'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/naJ4Nkphiis5M36tGrGHJA/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/elliotts-oyster-house-seattle-2?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA',
            'review_count': 3589,
            'categories': [
              {
                'alias': 'seafood',
                'title': 'Seafood'
              }
            ],
            'rating': 4.0,
            'coordinates': {
              'latitude': 47.6054699,
              'longitude': -122.34092
            },
            'transactions': [
              'delivery'
            ],
            'price': '$$$',
            'location': {
              'address1': '1201 Alaskan Way',
              'address2': '',
              'address3': 'Pier 56',
              'city': 'Seattle',
              'zip_code': '98101',
              'country': 'US',
              'state': 'WA',
              'display_address': [
                '1201 Alaskan Way',
                'Pier 56',
                'Seattle, WA 98101'
              ]
            },
            'phone': '+12066234340',
            'display_phone': '(206) 623-4340',
            'distance': 836.0363533530226
          },
          {
            'id': 'Lw7NmZ3j-WEye97ywEmkXQ',
            'alias': 'vons-1000-spirits-seattle-4',
            'name': 'Von\'s 1000 Spirits',
            'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/iUTo8Vc5is6j5dO358VWTg/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/vons-1000-spirits-seattle-4?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA',
            'review_count': 1802,
            'categories': [
              {
                'alias': 'newamerican',
                'title': 'American (New)'
              },
              {
                'alias': 'burgers',
                'title': 'Burgers'
              },
              {
                'alias': 'pubs',
                'title': 'Pubs'
              }
            ],
            'rating': 4.5,
            'coordinates': {
              'latitude': 47.606565,
              'longitude': -122.338337
            },
            'transactions': [
              'restaurant_reservation',
              'delivery',
              'pickup'
            ],
            'price': '$$',
            'location': {
              'address1': '1225 1st Ave',
              'address2': '',
              'address3': '',
              'city': 'Seattle',
              'zip_code': '98101',
              'country': 'US',
              'state': 'WA',
              'display_address': [
                '1225 1st Ave',
                'Seattle, WA 98101'
              ]
            },
            'phone': '+12066218667',
            'display_phone': '(206) 621-8667',
            'distance': 690.7900253149166
          },
          {
            'id': 'lqxaHsByP4IDsWlrqXhCDQ',
            'alias': 'tats-delicatessen-seattle',
            'name': 'Tat\'s Delicatessen',
            'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/lH44FL3TivTFgJCjDNWnJA/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/tats-delicatessen-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA',
            'review_count': 1150,
            'categories': [
              {
                'alias': 'delis',
                'title': 'Delis'
              },
              {
                'alias': 'cheesesteaks',
                'title': 'Cheesesteaks'
              }
            ],
            'rating': 4.5,
            'coordinates': {
              'latitude': 47.6015989850198,
              'longitude': -122.332317061304
            },
            'transactions': [
              'delivery',
              'pickup'
            ],
            'price': '$$',
            'location': {
              'address1': '159 Yesler Way',
              'address2': '',
              'address3': '',
              'city': 'Seattle',
              'zip_code': '98104',
              'country': 'US',
              'state': 'WA',
              'display_address': [
                '159 Yesler Way',
                'Seattle, WA 98104'
              ]
            },
            'phone': '+12062648287',
            'display_phone': '(206) 264-8287',
            'distance': 300.3895479378003
          },
          {
            'id': 'Mh5o8RtQNNUxhoJe6BxVkg',
            'alias': 'purple-café-and-wine-bar-seattle-3',
            'name': 'Purple Café and Wine Bar',
            'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/21QxhWyYxnlHjOBKUysvYA/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/purple-caf%C3%A9-and-wine-bar-seattle-3?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA',
            'review_count': 2479,
            'categories': [
              {
                'alias': 'newamerican',
                'title': 'American (New)'
              },
              {
                'alias': 'wine_bars',
                'title': 'Wine Bars'
              },
              {
                'alias': 'desserts',
                'title': 'Desserts'
              }
            ],
            'rating': 4.0,
            'coordinates': {
              'latitude': 47.60795,
              'longitude': -122.33508
            },
            'transactions': [
              'delivery'
            ],
            'price': '$$$',
            'location': {
              'address1': '1225 4th Ave',
              'address2': null,
              'address3': '',
              'city': 'Seattle',
              'zip_code': '98101',
              'country': 'US',
              'state': 'WA',
              'display_address': [
                '1225 4th Ave',
                'Seattle, WA 98101'
              ]
            },
            'phone': '+12068292280',
            'display_phone': '(206) 829-2280',
            'distance': 593.8105510194106
          },
          {
            'id': 'ps9ZlLoLYTfK87IjW9REfg',
            'alias': 'radiator-whiskey-seattle',
            'name': 'Radiator Whiskey',
            'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/W9DnG_PyGHOtApxbAoFOqA/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/radiator-whiskey-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA',
            'review_count': 1261,
            'categories': [
              {
                'alias': 'newamerican',
                'title': 'American (New)'
              },
              {
                'alias': 'cocktailbars',
                'title': 'Cocktail Bars'
              },
              {
                'alias': 'comfortfood',
                'title': 'Comfort Food'
              }
            ],
            'rating': 4.5,
            'coordinates': {
              'latitude': 47.608949,
              'longitude': -122.340599
            },
            'transactions': [
              'delivery'
            ],
            'price': '$$',
            'location': {
              'address1': '94 Pike St',
              'address2': 'Ste 30',
              'address3': '',
              'city': 'Seattle',
              'zip_code': '98101',
              'country': 'US',
              'state': 'WA',
              'display_address': [
                '94 Pike St',
                'Ste 30',
                'Seattle, WA 98101'
              ]
            },
            'phone': '+12064674268',
            'display_phone': '(206) 467-4268',
            'distance': 973.5058464656514
          }
        ],
        'total': 2100,
        'region': {
          'center': {
            'longitude': -122.3300624,
            'latitude': 47.6038321
          }
        }
      };
      const actual = mungeRevs(input);

      expect(actual).toEqual(expectation);
    });
    

    test('takes in location data and returns munged information', async() => {
      const expectation =
        {
          'formatted_query': 'Seattle, King County, Washington, USA',
          'latitude': '47.6038321',
          'longitude': '-122.3300624'
        };

      const input = [
        {
          'place_id': '235549103',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'relation',
          'osm_id': '237385',
          'boundingbox': [
            '47.4810022',
            '47.7341357',
            '-122.459696',
            '-122.224433'
          ],
          'lat': '47.6038321',
          'lon': '-122.3300624',
          'display_name': 'Seattle, King County, Washington, USA',
          'class': 'place',
          'type': 'city',
          'importance': 0.772979173564379,
          'icon': 'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
        },
        {
          'place_id': '55417079',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'node',
          'osm_id': '4836954932',
          'boundingbox': [
            '20.7199184',
            '20.7200184',
            '-103.3763786',
            '-103.3762786'
          ],
          'lat': '20.7199684',
          'lon': '-103.3763286',
          'display_name': 'Seattle, Villas de Guadalupe, Zapopan, Jalisco, 38901, Mexico',
          'class': 'place',
          'type': 'neighbourhood',
          'importance': 0.30000000000000004
        },
        {
          'place_id': '156976950',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'way',
          'osm_id': '291707810',
          'boundingbox': [
            '25.1837689',
            '25.1845505',
            '121.4465868',
            '121.4474398'
          ],
          'lat': '25.18415975',
          'lon': '121.446939985985',
          'display_name': 'Seattle, Lanweibu, Beitou Village, Danhai, Tamsui District, New Taipei, Taiwan',
          'class': 'landuse',
          'type': 'residential',
          'importance': 0.30000000000000004
        },
        {
          'place_id': '84138175',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'way',
          'osm_id': '10671266',
          'boundingbox': [
            '41.9611659',
            '41.9657274',
            '-121.9226362',
            '-121.9226043'
          ],
          'lat': '41.9641881',
          'lon': '-121.922629',
          'display_name': 'Seattle, Dorris, Siskiyou County, California, 96058, USA',
          'class': 'highway',
          'type': 'residential',
          'importance': 0.2
        },
        {
          'place_id': '90129562',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'way',
          'osm_id': '22919051',
          'boundingbox': [
            '14.6180684',
            '14.6213139',
            '121.0429669',
            '121.0448923'
          ],
          'lat': '14.6195488',
          'lon': '121.0440164',
          'display_name': 'Seattle, Kaunlaran, Cubao, 4th District, Quezon City, Eastern Manila District, Metro Manila, 1111, Philippines',
          'class': 'highway',
          'type': 'residential',
          'importance': 0.2
        },
        {
          'place_id': '160325077',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'way',
          'osm_id': '307770120',
          'boundingbox': [
            '28.8472264',
            '28.8487875',
            '-111.9789493',
            '-111.9780146'
          ],
          'lat': '28.8481394',
          'lon': '-111.9783605',
          'display_name': 'Seattle, Nuevo Kino, Bahía Kino, Hermosillo, Sonora, Mexico',
          'class': 'highway',
          'type': 'residential',
          'importance': 0.2
        },
        {
          'place_id': '95155603',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'way',
          'osm_id': '29546551',
          'boundingbox': [
            '14.4191845',
            '14.4193677',
            '120.9180883',
            '120.9187908'
          ],
          'lat': '14.4192428',
          'lon': '120.918312',
          'display_name': 'Seattle, ACM Woodstock Homes Ph9, Alapan 1-A, Bayan Luma VI, Imus, Cavite, Calabarzon, 4103, Philippines',
          'class': 'highway',
          'type': 'residential',
          'importance': 0.2
        },
        {
          'place_id': '203034631',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'way',
          'osm_id': '561843639',
          'boundingbox': [
            '47.4112544',
            '47.4112745',
            '-122.2621269',
            '-122.2608738'
          ],
          'lat': '47.4112602',
          'lon': '-122.260923',
          'display_name': 'Seattle, Kent, King County, Washington, 98032, USA',
          'class': 'highway',
          'type': 'service',
          'importance': 0.175
        },
        {
          'place_id': '312432623',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'way',
          'osm_id': '165271257',
          'boundingbox': [
            '14.6696649',
            '14.6703081',
            '121.0988688',
            '121.0994135'
          ],
          'lat': '14.6703081',
          'lon': '121.0994135',
          'display_name': 'Seattle, Vista Real Classica, Batasan Hills, 2nd District, Quezon City, Eastern Manila District, Metro Manila, 1808, Philippines',
          'class': 'highway',
          'type': 'service',
          'importance': 0.175
        },
        {
          'place_id': '6534059',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'node',
          'osm_id': '668442224',
          'boundingbox': [
            '47.6028456',
            '47.6029456',
            '-122.3398908',
            '-122.3397908'
          ],
          'lat': '47.6028956',
          'lon': '-122.3398408',
          'display_name': 'Seattle, Colman Dock, West Edge, Belltown, Seattle, King County, Washington, 98104, USA',
          'class': 'amenity',
          'type': 'ferry_terminal',
          'importance': 0.101
        }
      ];

      const data = mungeLoc(input);

      expect(data).toEqual(expectation);
    });

    test('takes in ridiculous weather array and returns munged weather data', async() => {
      const expectation =   [
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {
          'forecast': expect.any(String),
          'time': expect.any(String)
        },
        {    'forecast': expect.any(String),
          'time': expect.any(String)
        }
      ];

      const input = 
        {
          'data': [
            {
              'moonrise_ts': 1624861649,
              'wind_cdir': 'NE',
              'rh': 52,
              'pres': 1005.16,
              'high_temp': 36.6,
              'sunset_ts': 1624853500,
              'ozone': 291.5,
              'moon_phase': 0.805481,
              'wind_gust_spd': 10.1953,
              'snow_depth': 0,
              'clouds': 0,
              'ts': 1624777260,
              'sunrise_ts': 1624796072,
              'app_min_temp': 22.3,
              'wind_spd': 3.17676,
              'pop': 0,
              'wind_cdir_full': 'northeast',
              'slp': 1009.76,
              'moon_phase_lunation': 0.59,
              'valid_date': '2021-06-27',
              'app_max_temp': 39.7,
              'vis': 24.096,
              'dewpt': 19.1,
              'snow': 0,
              'uv': 1.9461,
              'weather': {
                'icon': 'c01d',
                'code': 800,
                'description': 'Clear Sky'
              },
              'wind_dir': 46,
              'max_dhi': null,
              'clouds_hi': 0,
              'precip': 0,
              'low_temp': 24.5,
              'max_temp': 36.7,
              'moonset_ts': 1624811958,
              'datetime': '2021-06-27',
              'temp': 30.8,
              'min_temp': 21.9,
              'clouds_mid': 0,
              'clouds_low': 0
            },
            {
              'moonrise_ts': 1624863629,
              'wind_cdir': 'ENE',
              'rh': 41,
              'pres': 1000.67,
              'high_temp': 44.9,
              'sunset_ts': 1624939894,
              'ozone': 296.073,
              'moon_phase': 0.709678,
              'wind_gust_spd': 13,
              'snow_depth': 0,
              'clouds': 0,
              'ts': 1624863660,
              'sunrise_ts': 1624882501,
              'app_min_temp': 24.6,
              'wind_spd': 3.13146,
              'pop': 0,
              'wind_cdir_full': 'east-northeast',
              'slp': 1005.12,
              'moon_phase_lunation': 0.63,
              'valid_date': '2021-06-28',
              'app_max_temp': 44.1,
              'vis': 24.096,
              'dewpt': 16.8,
              'snow': 0,
              'uv': 9.21841,
              'weather': {
                'icon': 'c01d',
                'code': 800,
                'description': 'Clear Sky'
              },
              'wind_dir': 75,
              'max_dhi': null,
              'clouds_hi': 0,
              'precip': 0,
              'low_temp': 18.9,
              'max_temp': 44.9,
              'moonset_ts': 1624902784,
              'datetime': '2021-06-28',
              'temp': 34.1,
              'min_temp': 24.5,
              'clouds_mid': 0,
              'clouds_low': 0
            },
            {
              'moonrise_ts': 1624951569,
              'wind_cdir': 'SW',
              'rh': 55,
              'pres': 1002.65,
              'high_temp': 32.8,
              'sunset_ts': 1625026285,
              'ozone': 296.49,
              'moon_phase': 0.607519,
              'wind_gust_spd': 13.6953,
              'snow_depth': 0,
              'clouds': 0,
              'ts': 1624950060,
              'sunrise_ts': 1624968932,
              'app_min_temp': 18.7,
              'wind_spd': 3.20394,
              'pop': 0,
              'wind_cdir_full': 'southwest',
              'slp': 1007.27,
              'moon_phase_lunation': 0.66,
              'valid_date': '2021-06-29',
              'app_max_temp': 33,
              'vis': 24.096,
              'dewpt': 15.1,
              'snow': 0,
              'uv': 9.20661,
              'weather': {
                'icon': 'c01d',
                'code': 800,
                'description': 'Clear Sky'
              },
              'wind_dir': 228,
              'max_dhi': null,
              'clouds_hi': 0,
              'precip': 0,
              'low_temp': 19.6,
              'max_temp': 32.8,
              'moonset_ts': 1624993399,
              'datetime': '2021-06-29',
              'temp': 25.3,
              'min_temp': 18.9,
              'clouds_mid': 0,
              'clouds_low': 0
            },
            {
              'moonrise_ts': 1625039233,
              'wind_cdir': 'SW',
              'rh': 57,
              'pres': 999.333,
              'high_temp': 31.1,
              'sunset_ts': 1625112673,
              'ozone': 301.021,
              'moon_phase': 0.503989,
              'wind_gust_spd': 7.82031,
              'snow_depth': 0,
              'clouds': 6,
              'ts': 1625036460,
              'sunrise_ts': 1625055366,
              'app_min_temp': 16.1,
              'wind_spd': 2.73069,
              'pop': 0,
              'wind_cdir_full': 'southwest',
              'slp': 1009.92,
              'moon_phase_lunation': 0.69,
              'valid_date': '2021-06-30',
              'app_max_temp': 30.2,
              'vis': 24.128,
              'dewpt': 13.5,
              'snow': 0,
              'uv': 9.18125,
              'weather': {
                'icon': 'c02d',
                'code': 801,
                'description': 'Few clouds'
              },
              'wind_dir': 233,
              'max_dhi': null,
              'clouds_hi': 0,
              'precip': 0,
              'low_temp': 14.8,
              'max_temp': 31.1,
              'moonset_ts': 1625083843,
              'datetime': '2021-06-30',
              'temp': 23.1,
              'min_temp': 16,
              'clouds_mid': 0,
              'clouds_low': 6
            },
            {
              'moonrise_ts': 1625126740,
              'wind_cdir': 'SW',
              'rh': 62,
              'pres': 1000.85,
              'high_temp': 30.3,
              'sunset_ts': 1625199059,
              'ozone': 302.531,
              'moon_phase': 0.402977,
              'wind_gust_spd': 4.71094,
              'snow_depth': 0,
              'clouds': 25,
              'ts': 1625122860,
              'sunrise_ts': 1625141802,
              'app_min_temp': 14.8,
              'wind_spd': 2.0929,
              'pop': 0,
              'wind_cdir_full': 'southwest',
              'slp': 1011.42,
              'moon_phase_lunation': 0.73,
              'valid_date': '2021-07-01',
              'app_max_temp': 29.3,
              'vis': 23.966,
              'dewpt': 12.9,
              'snow': 0,
              'uv': 9.16739,
              'weather': {
                'icon': 'c02d',
                'code': 802,
                'description': 'Scattered clouds'
              },
              'wind_dir': 229,
              'max_dhi': null,
              'clouds_hi': 0,
              'precip': 0,
              'low_temp': 14.6,
              'max_temp': 30.3,
              'moonset_ts': 1625174184,
              'datetime': '2021-07-01',
              'temp': 21.4,
              'min_temp': 14.8,
              'clouds_mid': 0,
              'clouds_low': 25
            },
            {
              'moonrise_ts': 1625214179,
              'wind_cdir': 'SW',
              'rh': 65,
              'pres': 1001.69,
              'high_temp': 32.7,
              'sunset_ts': 1625285442,
              'ozone': 299.375,
              'moon_phase': 0.307585,
              'wind_gust_spd': 4.69922,
              'snow_depth': 0,
              'clouds': 7,
              'ts': 1625209260,
              'sunrise_ts': 1625228239,
              'app_min_temp': 14.6,
              'wind_spd': 1.69807,
              'pop': 0,
              'wind_cdir_full': 'southwest',
              'slp': 1012.34,
              'moon_phase_lunation': 0.76,
              'valid_date': '2021-07-02',
              'app_max_temp': 31.5,
              'vis': 24.128,
              'dewpt': 12.7,
              'snow': 0,
              'uv': 8.71257,
              'weather': {
                'icon': 'c02d',
                'code': 801,
                'description': 'Few clouds'
              },
              'wind_dir': 231,
              'max_dhi': null,
              'clouds_hi': 7,
              'precip': 0,
              'low_temp': 15,
              'max_temp': 33,
              'moonset_ts': 1625264487,
              'datetime': '2021-07-02',
              'temp': 20.3,
              'min_temp': 14.5,
              'clouds_mid': 0,
              'clouds_low': 0
            },
            {
              'moonrise_ts': 1625301621,
              'wind_cdir': 'SW',
              'rh': 52,
              'pres': 1001,
              'high_temp': 29.8,
              'sunset_ts': 1625371823,
              'ozone': 313.688,
              'moon_phase': 0.220519,
              'wind_gust_spd': 5.01172,
              'snow_depth': 0,
              'clouds': 22,
              'ts': 1625295660,
              'sunrise_ts': 1625314679,
              'app_min_temp': 15,
              'wind_spd': 2.38769,
              'pop': 0,
              'wind_cdir_full': 'southwest',
              'slp': 1011.62,
              'moon_phase_lunation': 0.8,
              'valid_date': '2021-07-03',
              'app_max_temp': 30,
              'vis': 24.128,
              'dewpt': 10.9,
              'snow': 0,
              'uv': 8.60533,
              'weather': {
                'icon': 'c02d',
                'code': 802,
                'description': 'Scattered clouds'
              },
              'wind_dir': 229,
              'max_dhi': null,
              'clouds_hi': 22,
              'precip': 0,
              'low_temp': 13.3,
              'max_temp': 32.3,
              'moonset_ts': 1625354797,
              'datetime': '2021-07-03',
              'temp': 22.6,
              'min_temp': 14.6,
              'clouds_mid': 1,
              'clouds_low': 0
            },
            {
              'moonrise_ts': 1625389135,
              'wind_cdir': 'SW',
              'rh': 55,
              'pres': 1001.56,
              'high_temp': 28.5,
              'sunset_ts': 1625458201,
              'ozone': 311.188,
              'moon_phase': 0.144393,
              'wind_gust_spd': 5.20312,
              'snow_depth': 0,
              'clouds': 26,
              'ts': 1625382060,
              'sunrise_ts': 1625401121,
              'app_min_temp': 13.3,
              'wind_spd': 2.5385,
              'pop': 0,
              'wind_cdir_full': 'southwest',
              'slp': 1012.25,
              'moon_phase_lunation': 0.83,
              'valid_date': '2021-07-04',
              'app_max_temp': 28.2,
              'vis': 24.128,
              'dewpt': 10,
              'snow': 0,
              'uv': 8.83913,
              'weather': {
                'icon': 'c02d',
                'code': 802,
                'description': 'Scattered clouds'
              },
              'wind_dir': 216,
              'max_dhi': null,
              'clouds_hi': 14,
              'precip': 0,
              'low_temp': 12.2,
              'max_temp': 29.8,
              'moonset_ts': 1625445124,
              'datetime': '2021-07-04',
              'temp': 20.7,
              'min_temp': 12.9,
              'clouds_mid': 25,
              'clouds_low': 3
            },
            {
              'moonrise_ts': 1625476800,
              'wind_cdir': 'WSW',
              'rh': 58,
              'pres': 1000.88,
              'high_temp': 25.5,
              'sunset_ts': 1625544576,
              'ozone': 310.156,
              'moon_phase': 0.144393,
              'wind_gust_spd': 4.21094,
              'snow_depth': 0,
              'clouds': 40,
              'ts': 1625468460,
              'sunrise_ts': 1625487565,
              'app_min_temp': 12.2,
              'wind_spd': 1.847,
              'pop': 0,
              'wind_cdir_full': 'west-southwest',
              'slp': 1011.56,
              'moon_phase_lunation': 0.86,
              'valid_date': '2021-07-05',
              'app_max_temp': 27.4,
              'vis': 24.128,
              'dewpt': 10.1,
              'snow': 0,
              'uv': 8.51247,
              'weather': {
                'icon': 'c02d',
                'code': 802,
                'description': 'Scattered clouds'
              },
              'wind_dir': 247,
              'max_dhi': null,
              'clouds_hi': 26,
              'precip': 0,
              'low_temp': 12.8,
              'max_temp': 28.8,
              'moonset_ts': 1625531524,
              'datetime': '2021-07-05',
              'temp': 19.7,
              'min_temp': 12.1,
              'clouds_mid': 23,
              'clouds_low': 14
            },
            {
              'moonrise_ts': 1625564704,
              'wind_cdir': 'SW',
              'rh': 57,
              'pres': 1001.19,
              'high_temp': 21,
              'sunset_ts': 1625630949,
              'ozone': 330.812,
              'moon_phase': 0.0818814,
              'wind_gust_spd': 5.30859,
              'snow_depth': 0,
              'clouds': 78,
              'ts': 1625554860,
              'sunrise_ts': 1625574011,
              'app_min_temp': 12.8,
              'wind_spd': 2.72295,
              'pop': 0,
              'wind_cdir_full': 'southwest',
              'slp': 1011.81,
              'moon_phase_lunation': 0.9,
              'valid_date': '2021-07-06',
              'app_max_temp': 24.9,
              'vis': 24.128,
              'dewpt': 9.2,
              'snow': 0,
              'uv': 4.00892,
              'weather': {
                'icon': 'c04d',
                'code': 804,
                'description': 'Overcast clouds'
              },
              'wind_dir': 214,
              'max_dhi': null,
              'clouds_hi': 69,
              'precip': 0,
              'low_temp': 12.2,
              'max_temp': 25.5,
              'moonset_ts': 1625621821,
              'datetime': '2021-07-06',
              'temp': 18.8,
              'min_temp': 12.4,
              'clouds_mid': 24,
              'clouds_low': 16
            },
            {
              'moonrise_ts': 1625652960,
              'wind_cdir': 'SSE',
              'rh': 65,
              'pres': 1001,
              'high_temp': 23,
              'sunset_ts': 1625717319,
              'ozone': 338.85,
              'moon_phase': 0.0356518,
              'wind_gust_spd': 3.39844,
              'snow_depth': 0,
              'clouds': 59,
              'ts': 1625641260,
              'sunrise_ts': 1625660458,
              'app_min_temp': 12.2,
              'wind_spd': 1.50629,
              'pop': 0,
              'wind_cdir_full': 'south-southeast',
              'slp': 1011.8,
              'moon_phase_lunation': 0.93,
              'valid_date': '2021-07-07',
              'app_max_temp': 20.3,
              'vis': 24.128,
              'dewpt': 8.5,
              'snow': 0,
              'uv': 6.80258,
              'weather': {
                'icon': 'c03d',
                'code': 803,
                'description': 'Broken clouds'
              },
              'wind_dir': 160,
              'max_dhi': null,
              'clouds_hi': 23,
              'precip': 0,
              'low_temp': 13.4,
              'max_temp': 27.5,
              'moonset_ts': 1625711978,
              'datetime': '2021-07-07',
              'temp': 15.4,
              'min_temp': 10.8,
              'clouds_mid': 45,
              'clouds_low': 0
            },
            {
              'moonrise_ts': 1625741684,
              'wind_cdir': 'SW',
              'rh': 71,
              'pres': 1006,
              'high_temp': 26.5,
              'sunset_ts': 1625803687,
              'ozone': 347.5,
              'moon_phase': 0.00810085,
              'wind_gust_spd': 5.59766,
              'snow_depth': 0,
              'clouds': 72,
              'ts': 1625727660,
              'sunrise_ts': 1625746908,
              'app_min_temp': 14.9,
              'wind_spd': 3.10464,
              'pop': 40,
              'wind_cdir_full': 'southwest',
              'slp': 1016.75,
              'moon_phase_lunation': 0.96,
              'valid_date': '2021-07-08',
              'app_max_temp': 18.1,
              'vis': 24.128,
              'dewpt': 10.7,
              'snow': 0,
              'uv': 3.80622,
              'weather': {
                'icon': 'c04d',
                'code': 804,
                'description': 'Overcast clouds'
              },
              'wind_dir': 214,
              'max_dhi': null,
              'clouds_hi': 2,
              'precip': 0.625,
              'low_temp': 17.8,
              'max_temp': 18.7,
              'moonset_ts': 1625801834,
              'datetime': '2021-07-08',
              'temp': 16.5,
              'min_temp': 11.8,
              'clouds_mid': 0,
              'clouds_low': 72
            },
            {
              'moonrise_ts': 1625830967,
              'wind_cdir': 'SE',
              'rh': 73,
              'pres': 1012.5,
              'high_temp': 18.1,
              'sunset_ts': 1625890052,
              'ozone': 344.875,
              'moon_phase': 0.00101022,
              'wind_gust_spd': 7.21484,
              'snow_depth': 0,
              'clouds': 100,
              'ts': 1625814060,
              'sunrise_ts': 1625833359,
              'app_min_temp': 13.4,
              'wind_spd': 2.51457,
              'pop': 15,
              'wind_cdir_full': 'southeast',
              'slp': 1023.25,
              'moon_phase_lunation': 1,
              'valid_date': '2021-07-09',
              'app_max_temp': 13.8,
              'vis': 24.128,
              'dewpt': 8.8,
              'snow': 0,
              'uv': 2.09547,
              'weather': {
                'icon': 'c04d',
                'code': 804,
                'description': 'Overcast clouds'
              },
              'wind_dir': 124,
              'max_dhi': null,
              'clouds_hi': 0,
              'precip': 0.4375,
              'low_temp': 17.4,
              'max_temp': 22,
              'moonset_ts': 1625891247,
              'datetime': '2021-07-09',
              'temp': 13.6,
              'min_temp': 11.9,
              'clouds_mid': 0,
              'clouds_low': 100
            },
            {
              'moonrise_ts': 1625920819,
              'wind_cdir': 'SSE',
              'rh': 54,
              'pres': 1011,
              'high_temp': 23,
              'sunset_ts': 1625976415,
              'ozone': 354.5,
              'moon_phase': 0.0153056,
              'wind_gust_spd': 6.70312,
              'snow_depth': 0,
              'clouds': 36,
              'ts': 1625900460,
              'sunrise_ts': 1625919812,
              'app_min_temp': 14.7,
              'wind_spd': 1.47431,
              'pop': 0,
              'wind_cdir_full': 'south-southeast',
              'slp': 1021.75,
              'moon_phase_lunation': 0.03,
              'valid_date': '2021-07-10',
              'app_max_temp': 19.8,
              'vis': 24.128,
              'dewpt': 7.9,
              'snow': 0,
              'uv': 4.51758,
              'weather': {
                'icon': 'c02d',
                'code': 802,
                'description': 'Scattered clouds'
              },
              'wind_dir': 158,
              'max_dhi': null,
              'clouds_hi': 12,
              'precip': 0,
              'low_temp': 11.4,
              'max_temp': 23,
              'moonset_ts': 1625980156,
              'datetime': '2021-07-10',
              'temp': 17.6,
              'min_temp': 11.4,
              'clouds_mid': 0,
              'clouds_low': 24
            },
            {
              'moonrise_ts': 1626011138,
              'wind_cdir': 'S',
              'rh': 51,
              'pres': 1006,
              'high_temp': 27.9,
              'sunset_ts': 1626062775,
              'ozone': 335.25,
              'moon_phase': 0.0509948,
              'wind_gust_spd': 3.62109,
              'snow_depth': 0,
              'clouds': 1,
              'ts': 1625986860,
              'sunrise_ts': 1626006266,
              'app_min_temp': 17.8,
              'wind_spd': 2.31634,
              'pop': 0,
              'wind_cdir_full': 'south',
              'slp': 1016.75,
              'moon_phase_lunation': 0.07,
              'valid_date': '2021-07-11',
              'app_max_temp': 22.4,
              'vis': 24.128,
              'dewpt': 9.5,
              'snow': 0,
              'uv': 6.71645,
              'weather': {
                'icon': 'c01d',
                'code': 800,
                'description': 'Clear Sky'
              },
              'wind_dir': 186,
              'max_dhi': null,
              'clouds_hi': 1,
              'precip': 0,
              'low_temp': 13.7,
              'max_temp': 27.9,
              'moonset_ts': 1626068599,
              'datetime': '2021-07-11',
              'temp': 20.4,
              'min_temp': 13.7,
              'clouds_mid': 0,
              'clouds_low': 0
            },
            {
              'moonrise_ts': 1626101754,
              'wind_cdir': 'SW',
              'rh': 50,
              'pres': 1001.75,
              'high_temp': 31.2,
              'sunset_ts': 1626149133,
              'ozone': 315,
              'moon_phase': 0.107207,
              'wind_gust_spd': 4.65234,
              'snow_depth': 0,
              'clouds': 18,
              'ts': 1626073260,
              'sunrise_ts': 1626092722,
              'app_min_temp': 18.1,
              'wind_spd': 1.70781,
              'pop': 0,
              'wind_cdir_full': 'southwest',
              'slp': 1012.25,
              'moon_phase_lunation': 0.1,
              'valid_date': '2021-07-12',
              'app_max_temp': 26,
              'vis': 24.128,
              'dewpt': 10.3,
              'snow': 0,
              'uv': 6.754,
              'weather': {
                'icon': 'c02d',
                'code': 801,
                'description': 'Few clouds'
              },
              'wind_dir': 217,
              'max_dhi': null,
              'clouds_hi': 2,
              'precip': 0,
              'low_temp': 13.4,
              'max_temp': 31.2,
              'moonset_ts': 1626156673,
              'datetime': '2021-07-12',
              'temp': 22.3,
              'min_temp': 13.4,
              'clouds_mid': 0,
              'clouds_low': 18
            }
          ],
          'city_name': 'Seattle',
          'lon': -122.33,
          'timezone': 'America/Los_Angeles',
          'lat': 47.6,
          'country_code': 'US',
          'state_code': 'WA'
        };

      const actual = mungeWea(input);

      expect(actual).toEqual(expectation);
    });

  });
});
