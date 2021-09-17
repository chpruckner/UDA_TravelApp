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
  // api keys
  const geoNamesKEY = process.env.GN_USER;
  const weatherKEY = process.env.WB_KEY;
  const pixelbayKEY = process.env.PB_KEY;
  // base urls
  const geoNamesURL = "http://api.geonames.org/searchJSON?";
  const weatherURL = "http://api.weatherbit.io/v2.0/";
  const pixelbayURL = "https://pixabay.com/api/";
  // all data from the api calls
  let name = ""; // city name
  let lat = "";
  let lng = "";
  let countryCode = "";

  const response = await fetch(
    `${geoNamesURL}q=${city}&maxRows=1&username=${geoNamesKEY}`
  );

  try {
    const data1 = await response.json();

    // check if a city with the name was found
    if (data1.totalResultsCount < 1) {
      res.send({name: "not found"});
      return
    } else {
      name = data1.geonames[0].name;
      lat = data1.geonames[0].lat;
      lng = data1.geonames[0].lng;
      countryCode = data1.geonames[0].countryCode;

      currTrip = { name, countryCode };
      console.log({currTrip});
    }
    //res.send(data);
  } catch (err) {
    console.error(err);
  }

  console.log({days});
  if (days < 16) {
    const WBRes1 = await fetch(`${weatherURL}forecast/daily?lat=${lat}&lon=${lng}&key=${weatherKEY}&days=${days+1}`)

    try {
      const WBRes2 = await WBRes1.json();
      console.log(WBRes2);
      const { data } = WBRes2;

      currTrip.max_temp       = data[days].max_temp;
      currTrip.min_temp       = data[days].min_temp;
      currTrip.snow           = data[days].snow;
      currTrip.rh             = data[days].rh;
      currTrip.weather        = data[days].weather;
      currTrip.wind_cdir_full = data[days].wind_cdir_full;
      currTrip.wind_spd       = data[days].wind_spd;
      currTrip.pop            = data[days].pop;

      res.send(currTrip);

    } catch (error) {
      console.error(error);
    }
  } else if (days > 16) {
    alert("Date too far in the future to predict weather")
  }

  /* try {
    
  } catch (err) {
    console.error(err);
  } */
});
