import { weather } from "./getWeather.js";


const cityForm = document.getElementById('city-form');
const inputCityName = document.getElementById('input-city-name');
const cityNameSubmit = document.getElementById('city-name-submit');

const weatherDisplay = document.getElementById('display-container');
const locationW = document.getElementById("locationW")
const conditionW = document.getElementById("conditionW")
const detailedW = document.getElementById("detailedW")

function capitalizeWords(str) {
  if (!str) return ''; // Handle empty or null strings
  return str
    .toLowerCase() // 1. Convert the entire string to lowercase
    .split(' ')    // 2. Split the string into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // 3. Capitalize the first letter of each word
    .join(' ');   // 4. Join the words back into a string
}

export function initializeUIEverything(){
  cityForm.addEventListener('submit',async (event)=>{
    event.preventDefault();
    const rawCityName = inputCityName.value;
    if (!rawCityName){
      console.error("City not found!")
      return;
    }
    inputCityName.value="";
    const cityName = capitalizeWords(rawCityName);
    const weatherData = await weather(cityName);
    renderWeather(weatherData);
  })
}
export function renderWeather(weatherData){
  clearWeatherData(); // Clear previous data
  renderLocation(weatherData);
  renderCondition(weatherData);
  renderDetailed(weatherData);
}

function renderLocation(weatherData){
  const cityName = weatherData.location.name;
  const regionName  =weatherData.location.region;
  const countryName = weatherData.location.country;
  const timezoneID = weatherData.location.tz_id;
  const localTime = weatherData.location.localtime;


  const cityH2 = document.createElement("h2");
  cityH2.textContent = cityName;

  const regionCountryH4 = document.createElement("h4");
  regionCountryH4.textContent =`${regionName}, ${countryName}`;

  const localTimeP = document.createElement("p");
  localTimeP.textContent = `Local Time: ${localTime}`;

  const tzIDH5 = document.createElement("h5");
  tzIDH5.textContent = `Timezone: ${timezoneID}`;

  locationW.appendChild(cityH2);
  locationW.appendChild(regionCountryH4);
  locationW.appendChild(localTimeP);
  locationW.appendChild(tzIDH5);
}

function renderCondition(weatherData) {
  const current = weatherData.current;
  const condition = current.condition;

  const tempH1 = document.createElement("h1");
  tempH1.textContent = `${current.temp_c}°C`;

  const conditionTextP = document.createElement("p");
  conditionTextP.textContent = condition.text;

  const conditionIconImg = document.createElement("img");
  conditionIconImg.src = condition.icon.startsWith('//') ? `https:${condition.icon}` : condition.icon;
  conditionIconImg.alt = condition.text;

  conditionW.appendChild(tempH1);
  conditionW.appendChild(conditionIconImg);
  conditionW.appendChild(conditionTextP);
}

function renderDetailed(weatherData) {
  const current = weatherData.current;

  const feelsLikeP = document.createElement("p");
  feelsLikeP.textContent = `Feels like: ${current.feelslike_c}°C`;

  const windP = document.createElement("p");
  windP.textContent = `Wind: ${current.wind_kph} kph, ${current.wind_dir}`;

  const humidityP = document.createElement("p");
  humidityP.textContent = `Humidity: ${current.humidity}%`;

  const pressureP = document.createElement("p");
  pressureP.textContent = `Pressure: ${current.pressure_mb} mb`;

  const precipitationP = document.createElement("p");
  precipitationP.textContent = `Precipitation: ${current.precip_mm} mm`;

  const visibilityP = document.createElement("p");
  visibilityP.textContent = `Visibility: ${current.vis_km} km`;

  const lastUpdatedP = document.createElement("p");
  lastUpdatedP.textContent = `Last updated: ${current.last_updated}`;


  detailedW.appendChild(feelsLikeP);
  detailedW.appendChild(windP);
  detailedW.appendChild(humidityP);
  detailedW.appendChild(pressureP);
  detailedW.appendChild(precipitationP);
  detailedW.appendChild(visibilityP);
  detailedW.appendChild(lastUpdatedP);
}

function clearWeatherData(){
  locationW.innerHTML="";
  conditionW.innerHTML="";
  detailedW.innerHTML="";
}