import React, { useState, useEffect } from 'react';
import './App.css'

import axios from 'axios';


const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState({
    request: {
      type: "City",
      query: "Stockholm, Sweden",
      language: "en",
      unit: "m"},
      
      location: {
      name: "Stockholm",
      country: "Sweden",
      region: "Stockholms Lan",
      lat: "59.333",
      lon: "18.050",
      timezone_id: "Europe/Stockholm",
      localtime: "2020-03-08 15:13",
      localtime_epoch: 1583680380,
      utc_offset: "1.0"},

      current: {
      observation_time: "02:13 PM",
      temperature: 7,
      weather_code: 113,
      weather_icons: ["https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"],
      weather_descriptions: ["Sunny"],
      wind_speed: 19,
      wind_degree: 170,
      wind_dir: "S",
      pressure: 1006,
      precip: 0,
      humidity: 70,
      cloudcover: 0,
      feelslike: 4,
      uv_index: 1,
      visibility: 10,
      is_day: "yes"
    }
  })
  
  const [view, setView] = useState('')
  const [countryDisplay, setCountryDisplay] = useState([])
  

  //fetch country data
  const countriesAll = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
      setCountryDisplay(response.data) 
    })
  }
  
  useEffect(countriesAll, [])
  //fetch weather data
  const fetchWeather = () => {
    const capitals = countryDisplay.map(country => 
      country.capital)
    
    if (capitals.length === 1) {
      axios
      .get('http://api.weatherstack.com/current', {
        params : {
          access_key : '4f2f3f56b7924b03b8db29c177f74580',
          query : capitals.toString()
        }
      })
      .then(response => {
        setWeather(response.data) 
      })
    }
  }
  
  //useEffect(fetchWeather)


  const display = () => {
    if (view === 'detail') {
      return (
        countryDisplay.map((country, index) =>
          <div key={index}>
            <h2>{country.name}</h2>
            <div>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
            </div>
            <h3>languages</h3>
            <div>
                {country.languages.map((language, index) =>
                    <li key={index}>{language.name}</li>)}
            </div>
            <div>
                <img src={country.flag} alt='Countries flag'/>
            </div>
            <h3>Weather in {country.capital}</h3>
                <div> temperature: {weather.current.temperature} Celcius</div>
                <div> 
                  wind: {weather.current.windspeed}
                  direction {weather.current.wind_dir}
                </div>
          </div>
        )
      )
    } else 
    if (view === 'simple') {
      return(
        countryDisplay.map((country, index) =>
          <div key={index}>
            {country.name} <button onClick={() => handleButtonClick(country)}>Show</button>
          </div>)
      )
    } else {
      return(
        <div>Please enter a more specific filter</div>
      )
    }
  }
  
  const changeDetail = (results) => {
    if (results.length === 1) {
      setView('detail')
     
    } else if (results.length <= 10) {
      setView('simple')
   
    } else {
      setView('default')
     
    }
  }
    

  const handleSearchChange = (event) => { 
    const value = event.target.value
    const results = countries
    .filter(country => 
    country
    .name
    .toLowerCase()
    .includes(value.toLowerCase()))

    setSearch(value)
    changeDetail(results)
    setCountryDisplay(results)  
  
  }

  const handleButtonClick = (country) => {

      setView('detail')
      setCountryDisplay([country])
        
  }
  
  return (
    <div className="App">
      
      <div>
        find countries <input value={search}  onChange={handleSearchChange}/>
      </div>
      <div>
        {display()}
      </div>
        
    </div>
  );
}

export default App;
