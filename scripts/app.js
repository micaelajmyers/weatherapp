// Time and Day
function renderTime() {
  //date
  let now = new Date();
  let date = now.getDate();
  let year = now.getFullYear();
  if (year < 1000) {
    year += 1900;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  //date

  //time
  let currentTime = new Date();
  let h = currentTime.getHours();
  let m = currentTime.getMinutes();
  let ante = "AM";
  if (h > 12) {
    ante = "PM";
  }
  if (h == 24) {
    h = 0;
  } else if (h > 12) {
    h = h - 12;
  }

  if (m < 10) {
    m = "0" + m;
  }

  let myClock = document.querySelector("#today");
  myClock.innerHTML = "" + day + ", " + h + ":" + m + " " + ante;

  setTimeout("renderTime()", 1000);
}
renderTime();
// Time and Day

function getForecast(coordinates) {
  let apiKey = `182670c1e112ae39e969dc43c877351c`;
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//Weather Forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      let forecastIconid = forecastDay.weather[0].icon;
      //Emoji Array
      var emo = [
        { id: "01d", type: "fa-solid fa-sun" },
        { id: "01n", type: "fa-solid fa-moon" },
        { id: "02d", type: "fa-solid fa-cloud-sun" },
        { id: "02n", type: "fa-solid fa-cloud-moon" },
        { id: "03d", type: "fa-solid fa-cloud" },
        { id: "03n", type: "fa-solid fa-cloud-moon" },
        { id: "04d", type: "fa-solid fa-cloud" },
        { id: "04n", type: "fa-solid fa-cloud-moon" },
        { id: "09d", type: "fa-solid fa-cloud-showers-heavy" },
        { id: "09n", type: "fa-solid fa-cloud-moon-rain" },
        { id: "10d", type: "fa-solid fa-cloud-showers-heavy" },
        { id: "10n", type: "fa-solid fa-cloud-moon-rain" },
        { id: "11d", type: "fa-solid fa-cloud-bolt" },
        { id: "11n", type: "fa-solid fa-cloud-bolt" },
        { id: "13d", type: "fa-solid fa-snowflake" },
        { id: "13n", type: "fa-solid fa-snowflake" },
        { id: "50d", type: "fa-solid fa-smog" },
        { id: "50n", type: "fa-solid fa-smog" },
      ];
      //Emoji Array
      var foundTwo = emo.find(function (emo, index) {
        if (emo.id == forecastIconid) return true;
      });
      let forecastEmojiname = foundTwo.type;
      forecastHTML =
        forecastHTML +
        `     <div class="col-2">
            <div class="forecast-date"> ${formatDay(forecastDay.dt)}</div>
            <div class="mini-icon">
              <i class="${forecastEmojiname}"></i>
            </div>
            <div class="forecast-temp">
              <span class="weather-forecast-max">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="weather-forecast-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
              </div>
              </div>
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Weather Forecast

// Get Weather from API for Searched City
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let cityName = searchInput.value;
  let apiKey = `182670c1e112ae39e969dc43c877351c`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;

  function showTemperature(response) {
    let largeCity = document.querySelector("#city");
    let apiCity = response.data.name;
    if (searchInput.value) {
      largeCity.innerHTML = apiCity;
    } else {
      largeCity.innerHTML = null;
      alert("Please type a city.");
    }
    let temperature = Math.round(response.data.main.temp);
    let largeTemp = document.querySelector("#current-temperature");
    largeTemp.innerHTML = `${temperature}`;
    let mainWeather = response.data.weather[0].description;
    let largeWeather = document.querySelector("#current-weather");
    largeWeather.innerHTML = mainWeather.toUpperCase();
    let humidity = response.data.main.humidity;
    let largeHumidity = document.querySelector("#humidity");
    largeHumidity.innerHTML = `${humidity}%`;
    let windSpeed = Math.round(response.data.wind.speed);
    let largeWind = document.querySelector("#wind");
    largeWind.innerHTML = `${windSpeed} mph`;
    let iconid = response.data.weather[0].icon;
    let largeEmoji = document.querySelector("#large-icon");

    ftemp = response.data.main.temp;
    //Emoji Array
    var emo = [
      { id: "01d", type: "fa-solid fa-sun" },
      { id: "01n", type: "fa-solid fa-moon" },
      { id: "02d", type: "fa-solid fa-cloud-sun" },
      { id: "02n", type: "fa-solid fa-cloud-moon" },
      { id: "03d", type: "fa-solid fa-cloud" },
      { id: "03n", type: "fa-solid fa-cloud-moon" },
      { id: "04d", type: "fa-solid fa-cloud" },
      { id: "04n", type: "fa-solid fa-cloud-moon" },
      { id: "09d", type: "fa-solid fa-cloud-showers-heavy" },
      { id: "09n", type: "fa-solid fa-cloud-moon-rain" },
      { id: "10d", type: "fa-solid fa-cloud-showers-heavy" },
      { id: "10n", type: "fa-solid fa-cloud-moon-rain" },
      { id: "11d", type: "fa-solid fa-cloud-bolt" },
      { id: "11n", type: "fa-solid fa-cloud-bolt" },
      { id: "13d", type: "fa-solid fa-snowflake" },
      { id: "13n", type: "fa-solid fa-snowflake" },
      { id: "50d", type: "fa-solid fa-smog" },
      { id: "50n", type: "fa-solid fa-smog" },
    ];
    //Emoji Array
    var found = emo.find(function (emo, index) {
      if (emo.id == iconid) return true;
    });
    let emojiname = found.type;
    largeEmoji.className += emojiname;
    largeEmoji.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
  }

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-bar");

form.addEventListener("submit", search);
// Get Weather from API for Searched City

//Get Current Location Weather with API
function showCurrentTemperature(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `182670c1e112ae39e969dc43c877351c`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  function showTemperature(response) {
    let largeCity = document.querySelector("#city");
    let apiCity = response.data.name;
    largeCity.innerHTML = apiCity;
    let temperature = Math.round(response.data.main.temp);
    let largeTemp = document.querySelector("#current-temperature");
    largeTemp.innerHTML = `${temperature}`;
    let mainWeather = response.data.weather[0].description;
    let largeWeather = document.querySelector("#current-weather");
    largeWeather.innerHTML = mainWeather.toUpperCase();
    let humidity = response.data.main.humidity;
    let largeHumidity = document.querySelector("#humidity");
    largeHumidity.innerHTML = `${humidity}%`;
    let windSpeed = Math.round(response.data.wind.speed);
    let largeWind = document.querySelector("#wind");
    largeWind.innerHTML = `${windSpeed} mph`;
    let iconid = response.data.weather[0].icon;
    let largeEmoji = document.querySelector("#large-icon");

    ftemp = response.data.main.temp;

    //Emoji Array
    var emo = [
      { id: "01d", type: "fa-solid fa-sun" },
      { id: "01n", type: "fa-solid fa-moon" },
      { id: "02d", type: "fa-solid fa-cloud-sun" },
      { id: "02n", type: "fa-solid fa-cloud-moon" },
      { id: "03d", type: "fa-solid fa-cloud" },
      { id: "03n", type: "fa-solid fa-cloud-moon" },
      { id: "04d", type: "fa-solid fa-cloud" },
      { id: "04n", type: "fa-solid fa-cloud-moon" },
      { id: "09d", type: "fa-solid fa-cloud-showers-heavy" },
      { id: "09n", type: "fa-solid fa-cloud-moon-rain" },
      { id: "10d", type: "fa-solid fa-cloud-showers-heavy" },
      { id: "10n", type: "fa-solid fa-cloud-moon-rain" },
      { id: "11d", type: "fa-solid fa-cloud-bolt" },
      { id: "11n", type: "fa-solid fa-cloud-bolt" },
      { id: "13d", type: "fa-solid fa-snowflake" },
      { id: "13n", type: "fa-solid fa-snowflake" },
      { id: "50d", type: "fa-solid fa-smog" },
      { id: "50n", type: "fa-solid fa-smog" },
    ];
    //Emoji Array
    var found = emo.find(function (emo, index) {
      if (emo.id == iconid) return true;
    });
    let emojiname = found.type;
    largeEmoji.className += emojiname;
    largeEmoji.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
  }

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentTemperature);
}

getCurrentPosition();

//Get Current Location Weather with API
//Current Button
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);
//Current Button

function displayCTemp(event) {
  event.preventDefault();
  let celsiusTemp = ((ftemp - 32) * 5) / 9;
  let temperatureElement = document.querySelector("#current-temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

function displayFTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(ftemp);
}
let ftemp = null;

let celsiusLink = document.querySelector("#clink");
celsiusLink.addEventListener("click", displayCTemp);

let fahrenheitLink = document.querySelector("#flink");
fahrenheitLink.addEventListener("click", displayFTemp);
