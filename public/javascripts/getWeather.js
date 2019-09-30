function outputResponse(className, text) {
  var outputElement = document.querySelector("#response-output");

  outputElement.classList = className;
  outputElement.innerHTML = text;
  document.activeElement.blur();
}

document.addEventListener("DOMContentLoaded", function() {
  document
    .querySelector("#weather-form")
    .addEventListener("submit", function(event) {
      event.preventDefault();

      var city = document.querySelector("input[name='city']").value;
      var options = {
        method: "get",
        headers: { "Content-Type": "application/json" }
      };

      fetch("/weather/" + city, options)
        .then(r => r.json())
        .then(data => {
          if (data.error) {
            outputResponse("error", "City not found");
          } else if (data.weather) {
            outputResponse("weather", data.weather[0].description);
          }
        });
    });
});
