//Document Elements we will be interacting with
zipCode = document.getElementById('zip');
journalFeelings = document.getElementById('feelings');
submitButton = document.getElementById('generate');

// Format today's date for journal entries
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = '07783588e0eda68834adb6ec91f11719';

// API endpoint address
const apiAddress = 'http://api.openweathermap.org/data/2.5/';

/* Function called by event listener */
/* Thanks to
 * https://dev.to/shoupn/javascript-fetch-api-and-using-asyncawait-47mp
 * for better async syntax vs. Promises
 */

const handleSubmit = async (e) => {
    e.preventDefault()
    getWeatherData(apiAddress, zipCode, apiKey)
    .then(data => saveDataToSever(data, newDate, journalFeelings.value))
    .then(updateClientFromServer());
}

// Event listener to add function to existing HTML DOM element
submitButton.addEventListener("submit", handleSubmit);

/* Function to GET Web API Data*/
const getWeatherData = async (apiAddress, zipCode, apiKey) => {
    let res = await fetch(`${apiAddress}weather?zip=${zipCode.value}&appid=${apiKey}`)
    let data = await res.json()
    console.log(data)
    return data.main
}

/* Function to POST data */
const saveDataToServer = async (temp, date, userResponse) => {

}


/* Function to GET Project Data */
const updateClientFromServer = () => {

}
