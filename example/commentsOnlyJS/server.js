const bodyParser = require('body-parser');
const cors = require('cors');

// Setup empty JS object to act as endpoint for all routes
let projectData = {}

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());


// Initialize the main project folder
app.use(express.static(''));

// Spin up the server
// Callback to debug
app.listen(3000, function () {
    console.log('Listening on port 8080!')
});

// Initialize all route with a callback function
app.get('/all', getProjectData)

// Callback function to complete GET '/all'
getProjectData = (req, res) => {
    return res.status(200).send(projectData)
}

// Post Route
app.post('/all', (req, res) => {
    { temp, date, userResponse } = req.body
    projectData[date] = { temp, userResponse }
    res.status(200).send()
})
