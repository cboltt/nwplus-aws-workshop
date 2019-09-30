var express = require("express");
var router = express.Router();
var weatherData = require("../data/weather.json");

/* GET weather page. */
router.get("/:city", function(req, res, next) {
  var matchingCityData = weatherData.find(item => item.name == req.params.city);

  if (matchingCityData) {
    res.json(matchingCityData);
  } else {
    res.status(404).json({ error: "City not found" });
  }
});

module.exports = router;
