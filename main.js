const app = document.querySelector(".weather-app");
const deteils = document.querySelector(".container_div");
const temp = document.querySelector(".temp");
const name = document.querySelector(".name");
const waether = document.querySelector(".waether");
const icon = document.querySelector(".icon");
const form = document.querySelector("#locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const weatherDetails = document.querySelector(".weather details");
const cloud = document.querySelector(".cloud");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
let cities = document.querySelector(".cities");
let city = document.querySelector("#city");
let country = document.querySelector("#country");

const KEY = "96b947a45d33d7dc1c49af3203966408";

const getData = async (city) => {
  const base = "https://api.openweathermap.org/data/2.5/weather/";
  const query = `?q=${city}&units=metric&appid=${KEY}`;

  const req = await fetch(base + query);
  const data = await req.json();

  return data;
};

const result = getData("london").then((datas) => console.log(datas));

const updateUi = (weather) => {
  console.log(weather);
  deteils.innerHTML = `
    <h1 class="temp">${Math.round(weather.main.temp)}&#176;</h1>
            <div class="city-time">
                <h1 class="name">${weather.name}</h1>
            </div>

            <div class="waether">
                <img src="https://openweathermap.org/img/wn/${
                  weather.weather[0].icon
                }@2x.png" class="icon" width="60" height="60" alt="icon" class="icon" width="30" height="30" alt="icon">
                <span class="condition">${weather.weather[0].description}</span>
            </div>`;
  cloud.innerHTML = `<span>${Math.round(weather.clouds.all)}%</span>`;
  humidity.innerHTML = `<span>${Math.round(weather.main.humidity)}%</span>`;
  wind.innerHTML = `<span>${Math.round(weather.wind.speed)}km/h</span>`;

  function convertCountryCode(country) {
    let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(country);
  }

  city.innerHTML = weather.name;
  country.innerHTML = convertCountryCode(weather.sys.country);
};

//get weather
const getWeather = async (city) => {
  const weatherdata = await getData(city);
  return weatherdata;
};

form.city.focus();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityName = form.city.value.trim();

  form.reset();
  getWeather(cityName).then((data) => updateUi(data));
});
