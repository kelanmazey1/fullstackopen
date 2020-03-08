import React, { useState, useEffect } from 'react';
import './App.css'

import axios from 'axios';


const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  
  const [view, setView] = useState('')
  const [countryDisplay, setCountryDisplay] = useState([])
  
  const countriesAll = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
      setCountryDisplay(response.data) 
    })
  }
  
  useEffect(countriesAll, [])

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
