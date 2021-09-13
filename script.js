const cityInput = document.querySelector(".city-input");
const citySubmit = document.querySelector(".btn");
const apiKey = "f9b983c1b948fbd3a11a09e986af5edf";

async function getCity() {
  if (cityInput.value != "") {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}`,
      { mode: "cors" }
    );
    const cityData = await response.json();
    console.log(cityData);
  }
}

citySubmit.onclick = getCity;
