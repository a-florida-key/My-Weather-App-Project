function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let time = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  let currentCondition = document.querySelector("#condition");
  let icon = document.querySelector("#weatherIcon");

  cityElement.innerHTML = response.data.city;
  time.innerHTML = formatDate(date);
  humidity.innerHTML = response.data.temperature.humidity;
  windSpeed.innerHTML = response.data.wind.speed;
  currentCondition.innerHTML = response.data.condition.description;
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon"/>`;
  temperatureElement.innerHTML = temperature;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios(apiURL).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-day">
              <div class="weather-forecast-date">${day}</div>
              <div class="weather-forecasst-icon"><img
                src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/mist-night.png" /></div>
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"><strong>84°</strong></span>
                <span class="weather-forecast-temperature-min">72°</span>
              </div>
              </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Paris");
