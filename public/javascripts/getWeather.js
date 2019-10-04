// Outputs reponse to page with given class name and message
// if output element exists
function outputResponse(className, message) {
  var outputElement = document.querySelector("#response-output");

  if (!outputElement) {
    return;
  }

  outputElement.classList = className;
  outputElement.innerHTML = message;
}

// Handles the response of the weather API call
function handleFormResponse(data) {
  if (data.weather) {
    // DONE: Add temperature to response output
    var temperature = data.main.temp.toFixed(1);
    var description = data.weather[0].description;

    var weatherOutput = `${temperature}°C ${description}`;

    outputResponse("weather", weatherOutput);
  } else {
    var errorOutput = data.message;

    outputResponse("error", errorOutput);
  }
}

// Returns the value of the city name input if it exists
// (returns empty string otherwise)
function getCityInputValue() {
  var cityInputElement = document.querySelector("input[name='city']");

  if (!cityInputElement) {
    return "";
  }

  return cityInputElement.value;
}

// Handles form submission by making API call to weather endpoint
// with given city name
function handleFormSubmit(event) {
  event.preventDefault();
  document.activeElement.blur();

  // TODO: Add loading state output
  fetch(`/weather/${getCityInputValue()}`, {
    method: "get",
    headers: { "Content-Type": "application/json" }
  })
    .then(r => r.json())
    .then(data => handleFormResponse(data));
}

// Creates event listener for form submission once the page
// has loaded and form element exists
document.addEventListener("DOMContentLoaded", function() {
  var weatherFormElement = document.querySelector("#weather-form");

  if (weatherFormElement) {
    weatherFormElement.addEventListener("submit", handleFormSubmit);
  }
});
