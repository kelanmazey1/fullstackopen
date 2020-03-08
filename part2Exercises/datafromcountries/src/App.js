import React, { useState, useEffect } from 'react';
import './App.css'
// import View from './components/View'
// import ViewDetailed from './components/viewDetailed';

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
      // console.log(response.data)
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
        <div>Oogaly boogaly</div>
      )
    }
  }
  
  const changeDetail = (results) => {
    if (results.length === 1) {
      setView('detail')
      console.log('detailed')
    } else if (results.length <= 10) {
      setView('simple')
      console.log('simple')
    } else {
      setView('default')
      console.log('default')
    }
  }
  //changes whether or not detailed view of country is shown
 
  //handle button clic
    

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

  console.log('countryDisplay', countryDisplay)
  console.log('view', view)
  return (
    <div className="App">
      
      <div>{countryDisplay.length}</div>
      {/* <div>{searchResults.length}</div> */}
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
