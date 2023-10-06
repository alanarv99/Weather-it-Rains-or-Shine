//Prompt that occurs when you reload page
//Day and Time
let now = new Date();
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
let hour = now.getHours();
let minutes = now.getMinutes();
let currentInfo = document.querySelector("#current");
currentInfo.innerHTML = `${day} ${hour}:${minutes}`;
//Day and Time

//Search Engine //Open Weather
function searchedCity(event) {
  event.preventDefault();
  let cityEntered = document.querySelector("#weatherSearch");
  let cities = document.querySelector("#location");
  cities.innerHTML = `${cityEntered.value}`;
  let citay = `${cityEntered.value}`;
  function displayWeather(response) {
    //temp
    let weatherTemp = document.querySelector("#measurement");
    let temperature = Math.round(response.data.main.temp);
    weatherTemp.innerHTML = `${temperature}°C`;
    //humidity
    let weatherHumidity = document.querySelector("#humidity");
    let humidityRounded = Math.round(response.data.main.humidity);
    weatherHumidity.innerHTML = `${humidityRounded}`;
    //wind speed
    let weatherWind = document.querySelector("#wind");
    let windRounded = Math.round(response.data.wind.speed);
    weatherWind.innerHTML = `${windRounded}`;
    //daily card description
    let weatherDescription = document.querySelector("#weatherDescriptor");
    let description = response.data.weather[0].main;
    weatherDescription.innerHTML = `${description}`;
  }
}

let apiKey = "be81f193e065bf5feb2d944c7336968b";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citay}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(displayWeather);

function getCurrentPosition(position) {
  let apiKey = "be81f193e065bf5feb2d944c7336968b";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let currentLocationApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(currentLocationApiUrl).then(displayWeather);
}

let city = document.querySelector("#searchCityForm");
city.addEventListener("submit", searchedCity);

let pin = document.querySelector("#currentLocationButton");
pin.addEventListener("submit", getCurrentPosition);
