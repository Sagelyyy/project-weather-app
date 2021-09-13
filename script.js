const cityInput = document.querySelector(".city-input");
const citySubmit = document.querySelector(".btn");
const apiKey = "f9b983c1b948fbd3a11a09e986af5edf";
const error = "Please enter a valid city.";
const myCity = {};


//make this take an arg for the city so I could just call it like: getCityData(boston)?
async function getCityData() {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=imperial`;
  if (cityInput.value != "") {
    try {
      const response = await fetch(url, { mode: "cors" });
      cityInput.value = ''
      return (cityData = await response.json());
    } catch {
      console.log(error);
    }
  }
}

async function processData() {
  try {
    let currCity = await getCityData();
    console.log(currCity);
    myCity.name = currCity.name;
    myCity.temp = currCity.main.temp;
    myCity.temp_min = currCity.main.temp_min;
    myCity.temp_max = currCity.main.temp_max;
    myCity.pressure = currCity.main.pressure;
    myCity.humidity = currCity.main.humidity;
    myCity.feels_like = currCity.main.feels_like;
    myCity.weather = currCity.weather[0].description;
    console.log(myCity);
    displayData()
  } catch {
    console.log(error);
  }
}

function displayData(){
    const cityDisplay = document.querySelector('.city')
    const tempDisplay = document.querySelector('.temp')
    const descDisplay = document.querySelector('.desc')
    const descImgDisplay = document.querySelector('.desc-img')

    cityDisplay.textContent = myCity.name
    tempDisplay.textContent = myCity.temp
    descDisplay.textContent = myCity.weather
}

citySubmit.onclick = processData;
