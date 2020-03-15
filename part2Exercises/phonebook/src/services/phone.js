import axios from 'axios'

const baseUrl = '/api/persons'

const addNew = newEntry => {
    const request = axios.post(baseUrl, newEntry)
    return request.then(response => response.data)
}

const deleteEntry = (IDtoDelete) => {
    
    return axios.delete(`${baseUrl}/${IDtoDelete}`)
    
}

const update = (updatedEntry) => {
    const request = axios.put(`${baseUrl}/${updatedEntry.id}`, updatedEntry)
    return request.then(response => response.data)
}


export default { addNew, deleteEntry, update }