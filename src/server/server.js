const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const port = 3000;
const app = express();

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
  const url = req.body.url;
  const apiKey = process.env.API_KEY;
  const inputLang = "auto"; // detects input language
  const outputLang = "en";
  const verbose = "y";
  const response = await fetch(
    `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=${inputLang}&ilang=${outputLang}&verbose=${verbose}&url=${url}`
  );

  try {
    const data = await response.json();
    console.log("Response send");
    res.send(data);
  } catch (err) {
    console.error(err);
  }
});
