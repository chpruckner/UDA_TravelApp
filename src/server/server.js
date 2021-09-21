const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const port = 3000;
const app = express();
let tripList = [];
let currTrip = {};

dotenv.config();
app.use(express.static("dist"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Server setup
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

// GET Route
app.get("/", (req, res) => {
  res.sendFile("dist/index.html");
  // res.sendFile(path.resolve('src/client/views/index.html'))
});

// POST route
app.post("/travel", async (req, res) => {
  console.log("Request received");
  const {city, date, days} = req.body;

  // dealing with blanks or other special characters in city name
  const city_q = encodeURI(city);

  // api keys
  const geoNamesKEY = process.env.GN_USER;
  const weatherKEY = process.env.WB_KEY;
  const pixelbayKEY = process.env.PB_KEY;
  // base urls
  const geoNamesURL = "http://api.geonames.org/searchJSON?";
  const weatherURL = "http://api.weatherbit.io/v2.0/";
  const pixelbayURL = "https://pixabay.com/api/";

  let name = ""; // city name
  let lat = "";
  let lng = "";
  let countryCode = "";
  let countryName = "";

  // fetching data from geonames.org API
  const GNRes1 = await fetch(
    `${geoNamesURL}q=${city_q}&maxRows=1&username=${geoNamesKEY}`
  );

  try {
    const GNRes2 = await GNRes1.json();

    // check if a city with the name was found
    if (GNRes2.totalResultsCount > 0) {
      name = GNRes2.geonames[0].name;
      lat = GNRes2.geonames[0].lat;
      lng = GNRes2.geonames[0].lng;
      countryCode = GNRes2.geonames[0].countryCode;
      countryName = GNRes2.geonames[0].countryName;

      currTrip = { name, countryCode, countryName, date };

    } else {
      res.send({name: "not found"});
      return
    }
  } catch (err) {
    console.error(err);
  }

  // fetch weather from weatherbit.io 
  if (days < 16) {
    const WBRes1 = await fetch(`${weatherURL}forecast/daily?lat=${lat}&lon=${lng}&key=${weatherKEY}&days=${days+1}`)

    try {
      const WBRes2 = await WBRes1.json();
      const { data } = WBRes2;

      currTrip.max_temp       = data[days].max_temp;
      currTrip.min_temp       = data[days].min_temp;
      currTrip.snow           = data[days].snow;
      currTrip.rh             = data[days].rh;
      currTrip.weather_icon   = data[days].weather.icon;
      currTrip.weather_desc   = data[days].weather.description;
      currTrip.wind_cdir_full = data[days].wind_cdir_full;
      currTrip.wind_spd       = data[days].wind_spd;
      currTrip.pop            = data[days].pop;

    } catch (error) {
      console.error(error);
    }

  } else if (days > 16) {
    currTrip.max_temp = "n/a";
    currTrip.min_temp = "n/a";
    currTrip.snow = "n/a";
    currTrip.rh = "n/a";
    currTrip.weather_icon = "n/a";
    currTrip.weather_desc = "too far in the future to predict";
    currTrip.wind_cdir_full = "n/a";
    currTrip.wind_spd = "n/a";
    currTrip.pop = "n/a";
  }

  // deal with whitespaces in "name"
  let name_q = name.split(" ").join("+");
  name_q = encodeURI(name_q);

  // fetch picture of city (or country) from pixabay.com
  const PBRes1 = await fetch(`${pixelbayURL}?key=${pixelbayKEY}&q=${name_q}&image_type=photo`);

  try {
    const PBRes2 = await PBRes1.json();

    if (PBRes2.totalHits > 0) {
      currTrip.picUrl    = PBRes2.hits[0].webformatURL;
      currTrip.picHeight = PBRes2.hits[0].webformatHeight;
      currTrip.picWidth  = PBRes2.hits[0].webformatWidth;
    } else {
      // if the city has no result look for pics of country
      const PBRes3 = await fetch(`${pixelbayURL}?key=${pixelbayKEY}&q=${countryName}&image_type=photo`);

      try {
        const PBRes4 = await PBRes3.json();
        currTrip.picUrl    = PBRes4.hits[0].webformatURL;
        currTrip.picHeight = PBRes4.hits[0].webformatHeight;
        currTrip.picWidth  = PBRes4.hits[0].webformatWidth;

      } catch (err) {
        console.error(err);
      }
    }
    
    // push current trip in tripList array
    tripList.push(currTrip);
    res.send(tripList);
    console.log("Response sent");

  } catch (err) {
    console.error(err);
  }
});
