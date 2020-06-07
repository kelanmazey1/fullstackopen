import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  // using useRef to disable on initial render so a message or country isn't displayed until the form is submitted
  const isFirstRender = useRef(true);

  useEffect(() => {
    // handle if is it's the first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // get country from endpoint using axios  
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`);
        // setCountry adding found attribute
        setCountry({
          data: response.data[0],
          found: true,
        });
        // setCountry with found as false to return 'not found...' div
      } catch {
        setCountry({
          found: false,
        })
      };
    };
    fetchData();
  }, [name]);
  return country;
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }
  
  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App