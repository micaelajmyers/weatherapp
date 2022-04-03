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
  }

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-bar");

form.addEventListener("submit", search);
// Get Weather from API for Searched City

//fahrenheit to celsius
function ftoc(event) {
  event.preventDefault();
  let link = document.querySelector("#msbutton");

  if (link.innerHTML == "°F | °C") {
    link.innerHTML = "°C | °F";
  } else {
    link.innerHTML = "°F | °C";
  }
  // if (link == "°F | °C") {
  // link.innerHTML = "°C | °F"
  //} else {
  //link.innerHTML = "°F | °C"
}
let ftocLink = document.querySelector("#msbutton");
ftocLink.addEventListener("click", ftoc);
//fahrenheit to celsius

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
