  
import React, { useState, useEffect } from 'react'
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

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  // pulls all resources and sets 
  const getAll = async () => {
    const response = await axios.get(baseUrl);
    setResources(response.data);
  }

  // set initial resources in db
  useEffect(() => {
    const fetchInitialData = async () => {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    };
    fetchInitialData();
  }, [baseUrl])
  
  const create = async (resource) => {
    // send http method
    const response = await axios.post(baseUrl, resource);
    // update dislay with new resource
    setResources(resources.concat(response.data));
    console.log('resources', resources);
  }
  // assumes the resource contains an ID and an update object to pass to the db
  const update = async (resource) => {
    // sent http request to endpoint
    const response = await axios.put(`${ baseUrl }/${resource.id}`, resource.updatedObject);
    // map out all unchanged objects and one updates obj
    const updateResources = resources.map(resourceInDB =>
      resourceInDB.id !== resource.id ? resourceInDB : response.data);
    // set resource state with updates array
    setResources(updateResources);
  };


  // list all services as object
  const service = {
    create,
    getAll,
    update,
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App