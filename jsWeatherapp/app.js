menuActive = document.querySelectorAll(".menu-btn");

const city = document.querySelector(".city");
const tempA = document.querySelector(".current");
const Description = document.querySelector(".description");
const feelsLike = document.querySelector(".feels-like");
const wind = document.querySelector(".wind");
const Humidity = document.querySelector(".humidity");
const Pressure = document.querySelector(".pressure");

let active = false;

const api = {
  key: "6dc03e881dc8b962bc1a29daeb884c5b",
  base: "https://api.openweathermap.org/data/2.5/",
};

const locationIcon = document.querySelector(".weather-icon");

menuActive[0].addEventListener("click", () => {
  if (!active) {
    menuActive[0].classList.add("active");
    active = true;
  } else {
    active = false;
    menuActive[0].classList.remove("active");
  }
});

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      fetch(`${api.base}weather?lat=${lat}&lon=${long}&appid=${api.key}`)
        .then((weather) => {
          return weather.json();
        })
        .then(passingData);

      fetch(`${api.base}find?lat=${lat}&lon=${long}&cnt=4&appid=${api.key}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
    });
  }
});

function passingData(weather) {
  const name = `${weather.name}`;
  const country = `${weather.sys.country}`;
  city.textContent = name + ", " + country;

  const { temp, feels_like, humidity, pressure } = weather.main;
  let temperature = Math.round(temp - 273);
  let feels = Math.round(feels_like - 273);

  tempA.textContent = temperature;
  feelsLike.textContent = feels;
  Humidity.textContent = humidity + " %";
  Pressure.textContent = pressure + " hpa";

  const { id, description } = weather.weather[0];
  Description.textContent = description;

  const { icon } = weather.weather[0];
  locationIcon.innerHTML = `<img src="icons/${icon}.png">`;

  const { speed } = weather.wind;
  wind.textContent = speed + " mt/s";
}
