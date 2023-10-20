let cityWeather = {};
let weatherDescription = "";

function getWeather() {
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      document.getElementById("cityName").value +
      "&APPID=cffdf24a584727db8fc3af422dcf5b01"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      cityWeather = {
        name: response.name,
        weather: {
          description: response.weather[0].description,
          main: response.weather[0].main,
        },
        temperature: response.main,
        wind: response.wind,
      };
      document.getElementById("weatherElements").innerHTML =
        "The weather in " +
        cityWeather.name +
        ": " +
        cityWeather.weather.description +
        ". The temperature is " +
        cityWeather.temperature.temp +
        " K, with feeling of " +
        cityWeather.temperature.feels_like +
        " K.";
      return cityWeather;
    })
    .catch(function (er) {
      console.log("Error");
    });
}

document.getElementById("search").addEventListener("click", function () {
  getWeather();
  document.getElementById("cityName").value = "";
});

function kelvinToCelsius(number) {
  let celsius = number - 273.15;
  return celsius.toFixed(2);
}

function kelvinToFahr(number) {
  let fahr = ((number - 273.15) * 9) / 5 + 32;
  return fahr.toFixed(2);
}

document.getElementById("celsius").addEventListener("click", function () {
  document.getElementById("weatherElements").innerHTML =
    "The weather in " +
    cityWeather.name +
    ": " +
    cityWeather.weather.description +
    ". The temperature is " +
    kelvinToCelsius(cityWeather.temperature.temp) +
    " C, with feeling of " +
    kelvinToCelsius(cityWeather.temperature.feels_like) +
    " C.";
});

document.getElementById("fahr").addEventListener("click", function () {
  document.getElementById("weatherElements").innerHTML =
    "The weather in " +
    cityWeather.name +
    ": " +
    cityWeather.weather.description +
    ". The temperature is " +
    kelvinToFahr(cityWeather.temperature.temp) +
    " F, with feeling of " +
    kelvinToFahr(cityWeather.temperature.feels_like) +
    " F.";
});
