import React, { useState, useEffect } from 'react';
import './App.css'
import Display from './components/viewSimple'
import ViewDetailed from './components/viewDetailed'
// import './App.css';

import axios from 'axios';



const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
 

  const countriesAll = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      // console.log(response.data)
      setCountries(response.data)
       
    })
  }
  
  useEffect(countriesAll, [])

  const searchResults = countries
    .filter(country => 
      country
      .name
      .toLowerCase()
      .includes(search.toLowerCase())
      )

  // const display = () =>
  //   searchResults.map((country, index) =>
  //       <Display 
  //         key = {index}
  //         country = {country} 
  //         results = {searchResults}
  //       />
  //   )


  
  const displayHandler = (searchResults) => {
    if (searchResults.length === 1) { 
      return (searchResults.map((country, index) => 
      <ViewDetailed
        key={index} 
        country={country}
      /> ))
      
    } else if (searchResults.length <=10) {
      return (searchResults.map((country, index) =>
        <Display 
          key = {index}
          country = {country} 
        />)
    )
    } else {
      return <div>Too many results, please specify a different filter</div>
    }
  }  

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  console.log(searchResults)
  return (
    <div className="App">
      <div>
        find countries <input value={search}  onChange={handleSearchChange}/>
      </div>
      <div>{displayHandler(searchResults)}</div>
    </div>
  );
}

export default App;
