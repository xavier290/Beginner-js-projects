menuActive = document.querySelectorAll(".menu-btn");

const city = document.querySelector(".city");
const tempA = document.querySelector(".current");
const Description = document.querySelector(".description");
const feelsLike = document.querySelector(".feels-like");
const wind = document.querySelector(".wind");
const Humidity = document.querySelector(".humidity");
const Pressure = document.querySelector(".pressure");

const api = {
  key: "6dc03e881dc8b962bc1a29daeb884c5b",
  base: "https://api.openweathermap.org/data/2.5/",
};

const locationIcon = document.querySelector(".weather-icon")

const grid = document.querySelector(".more-cities")
let active = false

menuActive[0].addEventListener("click", () => {
  const menu = document.querySelector(".menu")

  if (!active) {
    menuActive[0].classList.add("active")
    menu.classList.add("opened")
    active = true;

  } else {
    active = false
    menuActive[0].classList.remove("active")
    menu.classList.remove("opened")
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

const message = document.querySelector(".no-available");

function geo_error() {
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


const searchbox = document.querySelector(".search-box")

searchbox.addEventListener("keypress", (evt) => {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    message.classList.remove("open");
    show = false;

    const text = document.querySelector(".more-cities h1")
    const cardsText = document.querySelectorAll(".card")

    grid.removeChild(text);
    for(let i = 0; i<2; i++) {
      grid.removeChild(cardsText[i]);
    }
  }
});

function getResults(query) {
	fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
		.then((results) => {
			return results.json();
		})
		.then(displayResults);
}

function displayResults(weather) {
  theDate()
  const name = `${weather.name}`;
  const country = `${weather.sys.country}`;
  city.textContent = name + ", " + country;

  const { temp, feels_like, humidity, pressure } = weather.main;
  let temperature = Math.round(temp);
  let feels = Math.round(feels_like);

  tempA.textContent = temperature;
  feelsLike.textContent = feels;
  Humidity.textContent = humidity + " %";
  Pressure.textContent = pressure + " hpa";

  const { description } = weather.weather[0];
  Description.textContent = description;

  const { icon } = weather.weather[0];
  locationIcon.innerHTML = `<img src="icons/${icon}.png">`;

  const { speed } = weather.wind;
  wind.textContent = speed + " mt/s";
}

const tempMetric = document.querySelector(".toggle-item")
let fahrenheit = false;

tempMetric.addEventListener("click", () => {
  
  let value1 = parseInt(tempA.textContent, 10)
  let value2 = parseInt(feelsLike.textContent, 10)

  if (!fahrenheit) {
    tempConverterCtoF(value1, value2)
    changingTempSymbol()
    fahrenheit = true
  } else {
    tempConverterFtoC(value1, value2)
    changingTempSymbol()
    fahrenheit = false
  }
})

function tempConverterCtoF(valueTemp, feelsvalue) {
  valueTemp = (valueTemp * 9/5) + 32
  feelsvalue = (feelsvalue * 9/5) + 32
  valueTemp.toFixed(2)
  feelsvalue.toFixed(2)
  tempA.textContent = valueTemp
  feelsLike.textContent = feelsvalue
}

function tempConverterFtoC(valueTemp, feelsvalue) {
  valueTemp = (valueTemp - 32) * 5/9
  feelsvalue = (feelsvalue - 32) * 5/9;
  valueTemp.toFixed(2) 
  feelsvalue.toFixed(2) 
  tempA.textContent = valueTemp
  feelsLike.textContent = feelsvalue
}

function changingTempSymbol() {
  const tempSymbol = document.querySelectorAll(".temp-symbol")

  for(let i=0; i<2; i++) {
    if(tempSymbol[i].textContent == "°C") {
      tempSymbol[i].textContent = "°F";
    } else {
      tempSymbol[i].textContent = "°C"
    }
  }
}