// Import node-fetch
const fetch = require('node-fetch-commonjs');

// Require dotenv to access environment variables
require('dotenv').config();

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
const getGeonamesData = async (location) => {
  const url = `${geonamesBaseUrl}?q=${location}&maxRows=1&username=${process.env.API_KEY_GEONAMES}`;
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
  const url = `${pixabayBaseUrl}?key=${process.env.API_KEY_PIXABAY}&q=${city}%20${country}&image_type=photo`;
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
  const locationInput = document.getElementById('location');
  const dateInput = document.getElementById('trip-date');
  const location = locationInput.value;
  const geonamesData = await getGeonamesData(location);
  const lat = geonamesData.geonames[0].lat;
  const lng = geonamesData.geonames[0].lng;
  const weatherUrl = `${weatherBaseUrl}?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.API_KEY_OPENWEATHERMAP}`;
  const weatherData = await getWeatherData(weatherUrl);
  const city = geonamesData.geonames[0].name;
  const country = geonamesData.geonames[0].countryName;
  const pixabayData = await getPixabayData(city, country);
  const imageUrl = pixabayData.hits[0].webformatURL;
  const cityImage = document.getElementById('city-image');
  cityImage.src = imageUrl;
  cityImage.onload = () => updateUI();
  const date = new Date().toLocaleDateString();
  const tripDate = dateInput.value;
  const postData = {
    temperature: weatherData.main.temp,
    humidity: weatherData.main.humidity,
    date: date,
    tripDate: tripDate,
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
console.log(data);
async function updateUI() {
  const response = await fetch('/all');
  const data = await response.json();
  const temperature = document.getElementById('temperature');
  const humidity = document.getElementById('humidity');
  const location = document.getElementById('location-display');
  const tripDate = document.getElementById('trip-date-display');
  const daysToTrip = document.getElementById('days-to-trip');
  const tripDateValue = new Date(document.getElementById('trip-date').value);
  const today = new Date();
  const timeDiff = Math.abs(tripDateValue.getTime() - today.getTime());
  const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  daysToTrip.innerHTML = `Days until trip: ${days}`;
  location.innerHTML = `${data.location}`;
  tripDate.innerHTML = `${data.tripDate}`;
  temperature.innerHTML = `${data.temperature}°C`;
  humidity.innerHTML = `${data.humidity}%`;
}
