import React, {useState} from 'react';
import axios from 'axios';

// What happens if user puts a city that doesnt exist?
// Should it show something or just be an empty screen?
// Button to change from Fahrenheit to Calvin?

function App() {

  const [data,setData] = useState({});
  const [location, setLocation] = useState('')
  const [errors, setErrors] = useState([]);

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=59f8900998b702554f17b5f1d0b9de14`
  
  const searchLocation = (event) => {

    if (event.key === 'Enter') // It will access this statement if the user has pressed the key 'Enter'
    {
      axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
    })
    .catch((error) => {
      // Error, API request fails
      if(error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      //console.log(error.response.status);
      //console.log(error.response.headers);
      }
      else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the 
        // browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    })
    setLocation('') // To empty the placeholder
    }
    
  }

  return (
    <div className="app">
    <div className="search">
      <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Enter Location'
        type="text" />
    </div>
    <div className="container">
      <div className="top">
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className="temp">
          {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
        </div>
        <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
      </div>

      {data.name !== undefined &&
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      }

    </div>
  </div>
  );
}

export default App;
