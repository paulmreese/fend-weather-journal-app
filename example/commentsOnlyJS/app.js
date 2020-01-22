const dotenv = require('dotenv');

//setup the variables in the .env file
dotenv.config();

// Personal API Key for OpenWeatherMap API
const apiKey = process.env.API_KEY

// API endpoint address
const apiAddress = 'http://api.openweathermap.org/data/2.5/'

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("submit", handleSubmit)

/* Function called by event listener */
/* Thanks to
 * https://dev.to/shoupn/javascript-fetch-api-and-using-asyncawait-47mp
 * for better async syntax vs. Promises
 */

const handleSubmit = async(e) => {
    e.preventDefault()
    getWeatherData();
    saveDataToSever();
    updateClientFromServer();
}

/* Function to GET Web API Data*/
const getWeatherData = () => {

}

/* Function to POST data */
const saveDataToServer = () => {

}


/* Function to GET Project Data */
const updateClientFromServer = () => {

}
