let cityWeather = {};
let weatherDescription = "";
let imgLink;

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
      console.log(response);
      if (response.cod === "404") {
        alert(response.message);
        return;
      }
      cityWeather = {
        name: response.name,
        weather: {
          description: response.weather[0].description,
          main: response.weather[0].main,
          icon: response.weather[0].icon,
        },
        temperature: response.main,
        wind: response.wind,
      };
      imgLink =
        "https://openweathermap.org/img/wn/" +
        cityWeather.weather.icon +
        "@2x.png";
      document.getElementById("weatherElements").innerHTML =
        "<div><img src=" +
        imgLink +
        "><h3>The weather in " +
        cityWeather.name +
        "</h3><p>Weather : " +
        cityWeather.weather.description +
        "</p><p>Temperature : " +
        cityWeather.temperature.temp +
        " K</p><p>Feels like : " +
        cityWeather.temperature.feels_like +
        " K</p><p>Wind : " +
        cityWeather.wind.speed +
        "</p></div>";

      return cityWeather;
    })
    .catch(function (er) {
      console.log("Error");
    });
}

document.getElementById("search").addEventListener("click", function () {
  getWeather();

  document.getElementById("weatherElements").style.display = "block";
  document.getElementById("deg").style.display = "flex";

  document.getElementById("cityName").value = "";
});

document
  .getElementById("cityName")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("search").click();
    }
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
    "<div><img src=" +
    imgLink +
    "><h3>The weather in " +
    cityWeather.name +
    "</h3><p>Weather : " +
    cityWeather.weather.description +
    "</p><p>Temperature : " +
    kelvinToCelsius(cityWeather.temperature.temp) +
    " &#176C</p><p>Feels like : " +
    kelvinToCelsius(cityWeather.temperature.feels_like) +
    " &#176C</p><p>Wind : " +
    cityWeather.wind.speed +
    "</p></div>";
});

document.getElementById("fahr").addEventListener("click", function () {
  document.getElementById("weatherElements").innerHTML =
    "<div><img src=" +
    imgLink +
    "><h3>The weather in " +
    cityWeather.name +
    "</h3><p>Weather : " +
    cityWeather.weather.description +
    "</p><p>Temperature : " +
    kelvinToFahr(cityWeather.temperature.temp) +
    " &#176F</p><p>Feels like : " +
    kelvinToFahr(cityWeather.temperature.feels_like) +
    " &#176F</p><p>Wind : " +
    cityWeather.wind.speed +
    "</p></div>";
});
