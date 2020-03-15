const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        name: 'Arto Hellas',
        number: '040-123456',
        id: 1
    },
    {
        name: 'Ada Lovelace',
        number: '39-44-5323523',
        id: 2
    },
    {
        name: 'Dan Abramov',
        number: '12-43-234345',
        id: 3
    },
    {
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
        id: 4
    }
]


app.get('/', (req, res) => {
    res.send('<h1>This is working</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    
    const person = persons.find(person => person.id === id)
      
    if (person) {
        res.json(person)
        
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    
    persons = persons.filter(person => person.id !== id)
      
    res.status(204).end()
})

const generateID = () => Math.floor(Math.random() * 200)

app.post('/api/persons', (req,res) => {
    const body = req.body
    
    if( !(body.name||body.numer) ) {
        return res.status(400).json({
            error: 'name or number is missing'
        })
    }

    if ( persons.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateID()
    }

    
    persons = persons.concat(person)
    
    res.json(person)
})

app.get('/info', (req, res) => {
    const time = new Date()
    const count = persons.length


    res.send(`<div>Phonebook has info for ${count} people</div><br><div>${time}</div>`)
})

const PORT = 3001

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})