//Document Elements we will be interacting with
//Form
zipCode = document.getElementById('zip');
journalFeelings = document.getElementById('feelings');
submitButton = document.getElementById('generate');

//Retrieved Entries
entryDate = document.getElementById('date');
entryTemp = document.getElementById('temp');
entryContent = document.getElementById('content');

// Format today's date for journal entries
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = '07783588e0eda68834adb6ec91f11719';

// OpenWeather API endpoint address
const apiAddress = 'http://api.openweathermap.org/data/2.5/';

// Local endpoint address
const localEndpoint = 'http://localhost:3000/all';

/* Function called by event listener */
/* Thanks to
 * https://dev.to/shoupn/javascript-fetch-api-and-using-asyncawait-47mp
 * for better async syntax vs. Promises
 */

/* Function to GET Web API Data*/
const getWeatherData = async (apiAddress, zipCode, apiKey) => {
    try {
        let res = await fetch(`${apiAddress}weather?zip=${zipCode.value}` +
                              `&units=imperial&appid=${apiKey}`)
        let data = await res.json()
        return data.main.temp
    } catch (error) {
        throw error
    }
}

/* Function to combine 3 data points into entry data in the right format*/
const formatData = (temp) => {
    return {temp, date: newDate, userResponse: journalFeelings.value}
}

/* Function to POST data */
const saveDataToServer = async (path, data) => {
    try {
        await fetch(path, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return data;
    } catch (error) {
        throw error
    }
}


/* Function to GET Project Data */
const retrieveDataFromServer = async (path) => {
    try {
        await fetch(path)
        .then(res => res.json());
    } catch (error) {
        throw error
    }
}

/* Take values and update the client view */
const updateClient = (temp, date, userResponse) => {
    entryDate.innerText = date;
    entryTemp.innerText = temp + '°F';
    entryContent.innerText = userResponse;
}

const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        getWeatherData(apiAddress, zipCode, apiKey)
        .then(temp => formatData(temp))
        .then(data => saveDataToServer(localEndpoint, data))
        /* I'm currently using the results of the data being saved directly to
         * update the client's view, which precludes the need to access the
         * express server with another fetch using retrieveDataFromServer()
         */
        .then(({temp, date, userResponse}) => {
            updateClient(temp, date, userResponse)
        });
    } catch (error) {
      console.error(error)
    }
}

// Event listener to add function to existing HTML DOM element
submitButton.addEventListener("click", handleSubmit);
