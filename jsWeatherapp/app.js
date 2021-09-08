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

const grid = document.querySelector(".more-cities");

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
    navigator.geolocation.getCurrentPosition(
      geo_success,
      geo_error,
      geo_options
    );
  } else {
    alert("Sorry, looks like geo-location is not available");
  }
});

function geo_success(position) {
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
    .then(weatherInCitiesNearU);
}

function geo_error() {
  const message = document.querySelector(".no-available");
  let show = false;

  if (!show) {
    message.classList.add("open");
    show = true;
  } else {
    message.classList.remove("open");
    show = false;
  }
  alert("Sorry, no position available.");
}

var geo_options = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000,
};

function theDate() {
  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);
}

function passingData(weather) {
  theDate();
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

function createCards() {
  for (let i = 0; i < 2; i++) {
    const elements = document.createElement("div");
    grid.appendChild(elements);
  }

  const cards = document.querySelectorAll(".more-cities div");
  cards.forEach((card) => {
    card.classList.add("card");
  });
}

function cardsTitle(response) {
  let Allnames = [];

  for (i = 1; i < 3; i++) {
    const name = `${response.list[i].name}`;

    Allnames.push(name);
  }

  const cards = document.querySelectorAll(".card");

  for (i = 0; i < 2; i++) {
    cards[i].innerHTML = Allnames[i] + `<img src="icons/arrow.svg">`;
  }
}

let open = false;

function openingInfoCard() {
  if (!open) {
    this.classList.add("open");
    open = true;
  } else {
    this.classList.remove("open");
    open = false;
  }
}

function gettingInfo(response) {
  placingDataContainers();

  let TempInfo = [];
  let DescriptionInfo = [];

  for (let i = 1; i < 3; i++) {
    const infT = `${response.list[i].main.temp}`;
    let temp = Math.round(infT - 273);
    TempInfo.push(temp);

    const infD = `${response.list[i].weather[0].description}`;
    DescriptionInfo.push(infD);
  }

  const Data = document.querySelectorAll(".data");

  for (let j = 0; j < 2; j++) {
    Data[j].innerHTML = TempInfo[j] + "°C " + DescriptionInfo[j];
  }
}

function placingDataContainers() {
  const cards = document.querySelectorAll(".card");
  for (let j = 0; j < 1; j++) {
    for (let i = 0; i < 2; i++) {
      const elements = document.createElement("div");
      cards[i].appendChild(elements);
    }
  }
  const info = document.querySelectorAll(".card div");
  info.forEach((data) => {
    data.classList.add("data");
  });
}

function weatherInCitiesNearU(response) {
  createCards();
  cardsTitle(response);
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.addEventListener("click", openingInfoCard));
  gettingInfo(response);
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
