const fetch = require('node-fetch');

// Require the config file to access API keys
const apiKeys = require('./config.js');

// Define the base URLs for each API
const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const geonamesBaseUrl = 'http://api.geonames.org/searchJSON';
const pixabayBaseUrl = 'https://pixabay.com/api/';

// Function to make a GET request to the OpenWeatherMap API
const getWeatherData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching weather data', error);
  }
};

// Function to make a GET request to the Geonames API
const getGeonamesData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching Geonames data', error);
  }
};

// Function to make a GET request to the Pixabay API
const getPixabayData = async (city, country) => {
  const url = `${pixabayBaseUrl}?key=${apiKeys.pixabay}&q=${city}+${country}&image_type=photo`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching Pixabay data', error);
  }
};


// Event listener for the generate button
document.getElementById('generate').addEventListener('click', async () => {
  const zipCode = document.getElementById('zip').value;
  const location = document.getElementById('location').value;
  const geonamesUrl = `${geonamesBaseUrl}?q=${zipCode}&maxRows=1&username=${apiKeys.geonames}`;
  const geonamesData = await getGeonamesData(geonamesUrl);
  const lat = geonamesData.geonames[0].lat;
  const lng = geonamesData.geonames[0].lng;
  const weatherUrl = `${weatherBaseUrl}?lat=${lat}&lon=${lng}&units=metric&appid=${apiKeys.openWeatherMap}`;
  const weatherData = await getWeatherData(weatherUrl);
  const city = geonamesData.geonames[0].name;
  const country = geonamesData.geonames[0].countryName;
  const pixabayUrl = `${pixabayBaseUrl}?key=${apiKeys.pixabay}&q=${city}+${country}&image_type=photo`;
  const pixabayData = await getPixabayData(pixabayUrl);
  const imageUrl = pixabayData.hits[0].webformatURL;
  const cityImage = document.getElementById('city-image');
cityImage.src = imageUrl
  const date = new Date().toLocaleDateString();
  const tripDate = document.getElementById('trip-date').value;
  const feelings = document.getElementById('feelings').value;
  const postData = {
    temperature: weatherData.main.temp,
    date: date,
    tripDate: tripDate,
    feelings: feelings,
    location: location
  };
  const postUrl = '/addData';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  };
  const response = await fetch(postUrl, options);
  const data = await response.json();
  console.log('Data added to app:', data);
  updateUI();
});

// Function to update the UI with the new data
async function updateUI() {
  const response = await fetch('/getData');
  const data = await response.json();
  const temperature = document.getElementById('temperature');
  const humidity = document.getElementById('humidity');
  const location = document.querySelector('.trip-location');
  temperature.innerHTML = `${data.temperature}°C`;
  humidity.innerHTML = `${data.humidity}%`;
}