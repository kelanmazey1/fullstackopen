import React, {useState} from 'react';
import Entry from './components/entry'


const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas',
     id: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('')


  const entries = () =>
    persons.map(person =>
      <Entry 
        key={person.id}
        person={person}
      />
    )


  const addName = (event) => {
    event.preventDefault()
    

    console.log(persons.map(person => person.name))
    const personObject = {
      name : newName,
      id: newName
    }
    //if find returns an object, then there must be a match 
    typeof (persons.find(({ name }) => name === personObject.name)) === 'object'
    ? window.alert( `${personObject.name} is already in the phonebook!`)
    : setPersons(persons.concat(personObject))
    
    console.log(persons)

    setNewName('')
      
      
  }
  
  const handleAddName = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleAddName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{entries()}</div>
    </div>
  )
}



export default App;
