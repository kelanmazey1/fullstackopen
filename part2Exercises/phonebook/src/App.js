import React, {useState} from 'react';
import Entry from './components/entry';
import Search from './components/search'
import PersonForm from './components/personForm';


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  const entries = () =>
    persons
    .filter(person => person.name.includes(filter))
    .map(person =>
      <Entry 
        key={person.id}
        person={person}
      />
    )


  const addName = (event) => {
    event.preventDefault()
    
    const personObject = {
      name : newName,
      number: newNumber,
      id: newName
    }

    //if find returns an object, then there must be a match 
    typeof (persons.find(({ name }) => name === personObject.name)) === 'object'
    ? window.alert( `${personObject.name} is already in the phonebook!`)
    : setPersons(persons.concat(personObject))

    setNewName('')
    setNewNumber('')  
      
  }
  
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
