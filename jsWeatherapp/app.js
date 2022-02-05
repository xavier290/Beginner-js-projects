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

const locationIcon = document.querySelector(".weather-icon");
const grid = document.querySelector(".more-cities");

window.addEventListener("load", () => {
  theDate();
  if(!navigator.geolocation) return geoError(true);

  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    geoSuccess(lat, long).then(data => {
      passingData(data);

      getMoreGeoData(lat, long).then(data => {
          console.log(data);
      })
    })
  }, () => {
    geoError(false);
  })
});

const geoSuccess = async(lat, long) => {
  try {
    let res = await fetch(`${api.base}weather?lat=${lat}&lon=${long}&units=metric&appid=${api.key}`);
    let data = await res.json();
    
    return(data);
  } 
  catch (error) {
    console.error(error);
  }
}

const getMoreGeoData = async(lat, long) => {
  try {
    let res = await fetch(`${api.base}find?lat=${lat}&lon=${long}&units=metric&cnt=4&appid=${api.key}`);
    let data = await res.json();
    
    return(data);
  }
  catch (error) {
    console.error(error);
  }
}

const message = document.querySelector(".no-available");

function geoError(show) {
  show ? message.classList.add("failed") : message.classList.add("open");
  alert("Sorry, no position available.");
};

function theDate() {
  let date = document.querySelector(".location .date");
  let now = new Date();
  
  date.innerText = dateBuilder(now);
}

function passingData(weather) {
  const name = `${weather.name}`;
  const country = `${weather.sys.country}`;
  city.textContent = name + ", " + country;

  const { temp, feels_like, humidity, pressure } = weather.main;

  tempA.textContent = temp;
  feelsLike.textContent = feels_like;
  Humidity.textContent = humidity + " %";
  Pressure.textContent = pressure + " hpa";

  const { description } = weather.weather[0];
  Description.textContent = description;

  const { icon } = weather.weather[0];
  locationIcon.innerHTML = `<img src="icons/${icon}.png">`;

  const { speed } = weather.wind;
  wind.textContent = speed + " mt/s";
}

function dateBuilder(d) {
  let months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December",
  ];
  let days = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

const searchbox = document.querySelector(".search-box")

searchbox.addEventListener('keydown', function(e) {
  // console.log(e);
  if(e.code == 'Enter') {
    // console.log("did it!")
    getResults(this.value);
  }
});

function getResults(query) {
	fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
		.then((results) => {
			return results.json();
		})
		.then(passingData);
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