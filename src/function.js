//Prompt that occurs when you reload page
let weather = [
  {
    city: "Paris",
    temp: 19.7,
    humidity: 80,
  },
  {
    city: "Tokyo",
    temp: 17.3,
    humidity: 50,
  },
  {
    city: "Lisbon",
    temp: 30.2,
    humidity: 20,
  },
  {
    city: "San Francisco",
    temp: 20.9,
    humidity: 100,
  },
  {
    city: "Oslo",
    temp: -5,
    humidity: 20,
  },
];
let cityTemperature = prompt("Enter a city!");
if (cityTemperature === "Paris") {
  alert(
    `It is currently ${Math.round(weather[0].temp)}°C ${Math.round(
      (weather[0].temp * 9) / 5 + 32
    )}°F in ${weather[0].city}, with a humidity of ${weather[0].humidity}%.`
  );
} else if (cityTemperature === "Tokyo") {
  alert(
    `It is currently ${Math.round(weather[1].temp)}°C ${Math.round(
      (weather[1].temp * 9) / 5 + 32
    )}°F in ${weather[1].city}, with a humidity of ${weather[1].humidity}%.`
  );
} else if (cityTemperature === "Lisbon") {
  alert(
    `It is currently ${Math.round(weather[2].temp)}°C ${Math.round(
      (weather[2].temp * 9) / 5 + 32
    )}°F in ${weather[2].city}, with a humidity of ${weather[2].humidity}%.`
  );
} else if (cityTemperature === "San Francisco") {
  alert(
    `It is currently ${Math.round(weather[3].temp)}°C ${Math.round(
      (weather[3].temp * 9) / 5 + 32
    )}°F in ${weather[3].city}, with a humidity of ${weather[3].humidity}%.`
  );
} else if (cityTemperature === "Oslo") {
  alert(
    `It is currently ${Math.round(weather[4].temp)}°C ${Math.round(
      (weather[4].temp * 9) / 5 + 32
    )}°F in ${weather[4].city}, with a humidity of ${weather[4].humidity}%.`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https:www.google.com/search?q=weather+"${cityTemperature}`
  );
}

function celcius() {
  let cel = document.querySelector("#measurement");
  cel.innerHTML = "24°C";
}
let clickC = document.querySelector("#cToF");
clickC.addEventListener("click", celcius);

function farenheight() {
  let far = document.querySelector("#measurement");
  far.innerHTML = "76°F";
}
let clickF = document.querySelector("#fToC");
clickF.addEventListener("click", farenheight);

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
  let apiKey = "be81f193e065bf5feb2d944c7336968b";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citay}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}
function current() {
  function displayWeather(response) {
    //location
    let cities = document.querySelector("#location");
    cities.innerHTML = response.data.name;
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
  function currentSpot(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "be81f193e065bf5feb2d944c7336968b";
    let units = "metric";
    let currentLocationApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(currentLocationApiUrl).then(displayWeather);
  }
  navigator.geolocation.getCurrentPosition(currentSpot);
}
let pin = document.querySelector("#currentLocationButton");
pin.addEventListener("click", current);

let city = document.querySelector("#searchCityForm");
city.addEventListener("submit", searchedCity);
