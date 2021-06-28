require('dotenv').config();

const fakeRequest = require('supertest');
const app = require('../lib/app');
const { mungeLoc } = require('../lib/munge');

describe('app routes and mungeing', () => {
  describe('routes', () => {

    test('returns city location data', async() => {
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

    test('returns reviews data', async() => {
      const expectation =
      [{ 'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/ZyQjV-wJQ2GHyX7l3jfbyg/o.jpg', 'name': 'Pike Place Chowder', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/pike-place-chowder-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/qGlIuj5yn6i82DK8kxw4Uw/o.jpg', 'name': 'Piroshky Piroshky', 'price': '$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/piroshky-piroshky-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/jsZkRaDQ6aEa6jwRGWDi5Q/o.jpg', 'name': 'Ellenos Real Greek Yogurt', 'price': '$', 'rating': 5, 'url': 'https://www.yelp.com/biz/ellenos-real-greek-yogurt-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/SdnJM6TCUmlKlpN6bnP-Rg/o.jpg', 'name': 'The Pink Door', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/the-pink-door-seattle-4?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/nJgiyjMZ7sglAtc5wyKSLQ/o.jpg', 'name': 'Storyville Coffee Company', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/storyville-coffee-company-seattle-9?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/vucCrknnlu1RRvRaKWwovQ/o.jpg', 'name': 'Japonessa Sushi Cocina', 'price': '$$', 'rating': 4, 'url': 'https://www.yelp.com/biz/japonessa-sushi-cocina-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/Pxq-GrSvmQCjHxPoCLgsfw/o.jpg', 'name': 'Starbucks Reserve Roastery Seattle', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/starbucks-reserve-roastery-seattle-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/nA5msGED9d3Bn5ldV2UgHA/o.jpg', 'name': 'The Crumpet Shop', 'price': '$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/the-crumpet-shop-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/hh5CwveJRABseaWt_UxtXA/o.jpg', 'name': 'Beecher\'s Handmade Cheese', 'price': '$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/beechers-handmade-cheese-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/ZxGvVggINkZ_BI3u7OX4CA/o.jpg', 'name': 'Biscuit Bitch', 'price': '$', 'rating': 4, 'url': 'https://www.yelp.com/biz/biscuit-bitch-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/5fmWSH9EoNSFLCRakj8tSw/o.jpg', 'name': 'Le Panier French Bakery', 'price': '$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/le-panier-french-bakery-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media2.fl.yelpcdn.com/bphoto/qX2VP_ovmhS6NNlO0zi4gA/o.jpg', 'name': 'Salumi Artisan Cured Meats', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/salumi-artisan-cured-meats-seattle-2?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/y37Xvo70cY1kh6-d1vDdfQ/o.jpg', 'name': 'Lola', 'price': '$$', 'rating': 4, 'url': 'https://www.yelp.com/biz/lola-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/mHyyfLAUge0LjN5t1hYfKw/o.jpg', 'name': 'Serious Pie', 'price': '$$', 'rating': 4, 'url': 'https://www.yelp.com/biz/serious-pie-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/2Jk8ycCKf7XaSrHdpWxEdw/o.jpg', 'name': 'Metropolitan Grill', 'price': '$$$$', 'rating': 4, 'url': 'https://www.yelp.com/biz/metropolitan-grill-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/naJ4Nkphiis5M36tGrGHJA/o.jpg', 'name': 'Elliott\'s Oyster House', 'price': '$$$', 'rating': 4, 'url': 'https://www.yelp.com/biz/elliotts-oyster-house-seattle-2?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/iUTo8Vc5is6j5dO358VWTg/o.jpg', 'name': 'Von\'s 1000 Spirits', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/vons-1000-spirits-seattle-4?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/lH44FL3TivTFgJCjDNWnJA/o.jpg', 'name': 'Tat\'s Delicatessen', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/tats-delicatessen-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/21QxhWyYxnlHjOBKUysvYA/o.jpg', 'name': 'Purple Café and Wine Bar', 'price': '$$$', 'rating': 4, 'url': 'https://www.yelp.com/biz/purple-caf%C3%A9-and-wine-bar-seattle-3?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }, { 'image_url': 'https://s3-media3.fl.yelpcdn.com/bphoto/W9DnG_PyGHOtApxbAoFOqA/o.jpg', 'name': 'Radiator Whiskey', 'price': '$$', 'rating': 4.5, 'url': 'https://www.yelp.com/biz/radiator-whiskey-seattle?adjust_creative=qj4R2GIM24WjeQW0DGGetA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qj4R2GIM24WjeQW0DGGetA' }];

      const data = await fakeRequest(app)
        .get('/reviews?latitude=47.6038321&longitude=-122.3300624')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });
    

    test('takes in location data and return it in a prettier format', async() => {
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

    test('returns weather data based on latitude and longitude', async() => {
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
        .get('/weather?lat=47.6038321&lon=-122.3300624')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

  });
});
