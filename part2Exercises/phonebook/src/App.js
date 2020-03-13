import React, {useState, useEffect} from 'react';
import Entry from './components/entry';
import Search from './components/search'
import PersonForm from './components/personForm';
import pbServices from './services/phone';


import axios from 'axios';


const App = () => {
  
  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        // console.log(response.data)
        setPersons(response.data)
      })
  }

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(hook, [])



  const addName = (event) => {
    event.preventDefault()
    
    const addPerson = () => 
      pbServices
        .addNew(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        })

    const updatePerson = () => 
      pbServices
        .update(personObject)
        .then(updatedPerson => {
          console.log(updatedPerson)
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
        })

    const matchingName = persons.find(person => person.name === newName)
    const matchNameAndNumber = persons.find(person => person.name === newName && person.number === newNumber)
    
    const personObject = {
      name : newName,
      number: newNumber,
      id: newName
    }

    if (typeof matchNameAndNumber === 'object') {
                      window.alert( `${personObject.name} is already in the phonebook with the same number`)
      } else if (typeof matchingName === 'object') {
        // ask to update
        window.confirm(`${newName} is already in the phonebook, do you want to update their number?` ) 
        updatePerson()
      } else {
        addPerson()
      }
    

    setNewName('')
    setNewNumber('')  
      
  }

  const deleteName = id => {
    
    const person = persons.find(p => p.id === id)
    
    if (window.confirm(`Are you sure you want to delete ${person.name}`)) {
      pbServices
        .deleteEntry(person.id, person.name)
        .then(response => {
          console.log('deletion response', response.data)
        })
      setPersons(persons.filter(person => person.id !== id))
      }
  }

  const entries = () =>
  persons
  .filter(person => person.name.includes(filter))
  .map(person =>
    <Entry 
      key={person.id}
      deleteName={() => deleteName(person.id)}
      person={person}
    />
  )
  
  const handleAddName = (event) => {
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Search filter={filter} handler={handleFilterChange}/>
      <h3>add new</h3>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber}
          handleAddName={handleAddName} handleAddNumber={handleAddNumber} />
      <h3>Numbers</h3>
      <div>{entries()}</div>
    </div>
  )
}



export default App;
