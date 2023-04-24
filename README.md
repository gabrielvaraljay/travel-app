# Travel Planner

The travel planner web app allows users to enter a location and a date of their trip, and then displays weather forecasts and other relevant information about their destination. The app uses the Geonames, Weatherbit, and Pixabay APIs to retrieve location, weather, and image data.

## Features

The main features of the travel planner app are:

- User can enter a location and a date of their trip
- If the trip is within a week, the app displays the current weather forecast for the location
- If the trip is in the future, the app displays a predicted forecast for the location
- The app displays an image of the location using the Pixabay API
- User can save and remove their trip information
- The app displays additional information about the trip, such as the number of days until the trip and the temperature and humidity at the destination

## Technologies Used

The travel planner app is built using the following technologies:

- HTML, CSS, and JavaScript for the front-end
- Bootstrap framework for the responsive design
- Node.js and Express.js for the back-end server
- Geonames API for location data
- Weatherbit API for weather data
- Pixabay API for image data

## Installation

To install the travel planner app, follow these steps:

1. Clone the repository to your local machine using the following command:
git clone https://github.com/[USERNAME]/travel-planner.git

2. Install the dependencies using the following command:
npm install

3. Set up environment variables for the Geonames, Weatherbit, and Pixabay API keys. You can do this by creating a .env file in the root directory of the project and adding the following lines:

GEONAMES_USERNAME=[YOUR_GEONAMES_USERNAME]
WEATHERBIT_API_KEY=[YOUR_WEATHERBIT_API_KEY]
PIXABAY_API_KEY=[YOUR_PIXABAY_API_KEY]

4. Start the server using the following command:
npm start

5. Open your browser and navigate to http://localhost:3000 to use the app.

##Future Improvements
The following are some potential improvements that could be made to the travel planner app:

Allow users to select units for temperature and other measurements
Add additional data, such as flight information and hotel recommendations
Improve the UX and design of the app to make it more user-friendly
Implement caching to reduce the number of API calls and improve performance

##License
This project is licensed under the MIT License. See the LICENSE file for details.