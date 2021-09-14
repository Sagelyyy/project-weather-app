const cityInput = document.querySelector(".city-input");
const citySubmit = document.querySelector(".btn");
const apiKey = "f9b983c1b948fbd3a11a09e986af5edf";
const error = "Please enter a valid city.";
const myCity = {};

cityInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      processData(cityInput.value);
    }
  });


async function getCityData(cityName) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  console.log(url);
  if (cityName != "") {
    try {
      const response = await fetch(url, { mode: "cors" });
      cityInput.value = "";
      return (cityData = await response.json());
    } catch {
      console.log(error);
    }
  }
}

async function processData(cityName) {
  try {
    let currCity = await getCityData(cityName);
    let today = new Date();
    console.log(currCity);
    myCity.name = currCity.name;
    myCity.temp = currCity.main.temp;
    myCity.temp_min = currCity.main.temp_min;
    myCity.temp_max = currCity.main.temp_max;
    myCity.pressure = currCity.main.pressure;
    myCity.humidity = currCity.main.humidity;
    myCity.feels_like = currCity.main.feels_like;
    myCity.weather = currCity.weather[0].description;
    myCity.asOf = convertTimeStamp(currCity.dt);
    myCity.sunrise = convertTimeStamp(currCity.sys.sunrise);
    myCity.sunset = convertTimeStamp(currCity.sys.sunset);
    console.log(myCity);
    displayData();
    selectWeatherImage();
  } catch {
    console.log(error);
  }
}

function selectWeatherImage() {
  const svg = document.querySelector("#weather");
  switch (myCity.weather) {
    case "clear sky":
      svg.className = "wi wi-day-sunny";
      svg.style.color = 'yellow'
      break;
    case "few clouds":
      svg.className = "wi wi-day-cloudy";
      svg.style.color = 'gray'
      break;
    case "scattered clouds":
      svg.className = "wi wi-day-cloudy";
      svg.style.color = 'gray'
      break;
    case "broken clouds":
      svg.className = "wi wi-day-cloudy";
      svg.style.color = 'gray'
      break;
    case "shower rain":
      svg.className = "wi wi-day-sprinkle";
      svg.style.color = 'gray'
      break;
    case "rain":
      svg.className = "wi wi-day-rain";
      svg.style.color = 'gray'
      break;
    case "thunderstorm":
      svg.className = "wi wi-day-thunderstorm";
      svg.style.color = 'gray'
      break;
    case "snow":
      svg.className = "wi wi-day-snow";
      svg.style.color = 'white'
      break;
    case "mist":
      svg.className = "wi wi-day-rain";
      svg.style.color = 'gray'
      break;
  }
}

function convertTimeStamp(timestamp) {
  let d = new Date(timestamp * 1000),
    yyyy = d.getFullYear(),
    mm = ("0" + (d.getMonth() + 1)).slice(-2),
    dd = ("0" + d.getDate()).slice(-2),
    hh = d.getHours(),
    h = hh,
    min = ("0" + d.getMinutes()).slice(-2),
    ampm = "AM",
    time;

  if (hh > 12) {
    h = hh - 12;
    ampm = "PM";
  } else if (hh === 12) {
    h = 12;
    ampm = "PM";
  } else if (hh == 0) {
    h = 12;
  }

  time = h + ":" + min + " " + ampm;
  return time;
}

function displayData() {
  const cityDisplay = document.querySelector(".city");
  const tempDisplay = document.querySelector(".temp");
  const descImgDisplay = document.querySelector(".desc-img");
  const asOfTime = document.querySelector(".time");

  cityDisplay.textContent = myCity.name;
  tempDisplay.textContent = `${Math.round(myCity.temp)}°`;
  asOfTime.textContent = `As of ${myCity.asOf}`;
}

citySubmit.addEventListener("click", (e) => {
  processData(cityInput.value);
});

processData("boston");
