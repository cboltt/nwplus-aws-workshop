var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var request = require("request");

var weatherData = require("./data/weather.json");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* GET home page. */
app.get("/", function(req, res, next) {
  res.render("index");
});

/* GET weather page. */
app.get("/weather/:city", function(req, res, next) {
  var matchingCityData = weatherData.find(item => item.name == req.params.city);

  if (matchingCityData) {
    res.json(matchingCityData);
  } else {
    res.status(404).json({ message: "City not found" });
  }
});

module.exports = app;
