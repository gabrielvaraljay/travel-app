// Require dotenv to access environment variables
require('dotenv').config();

// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = process.env.PORT || 3000;
const server = app.listen(port, listening);

function listening() {
  console.log(`Server running on localhost: ${port}`);
}

// GET route
app.get('/all', (req, res) => {
  res.send(projectData);
});

// POST route
app.post('/addData', (req, res) => {
  projectData.temperature = req.body.temperature;
  projectData.humidity = req.body.humidity;
  projectData.date = req.body.date;
  projectData.tripDate = req.body.tripDate;
  projectData.location = req.body.location;
  res.send(projectData);
});

