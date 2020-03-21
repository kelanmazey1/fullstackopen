const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./modules/person')

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
//adding log strings to console for requests
morgan.token('obj', getName = (req, res) => {
    const body = req.body

    return JSON.stringify(body)

})


app.use(morgan('tiny', {
    skip: (req, res) => { return req.method === 'POST' }
}))


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :obj', {
    skip: (req, res) => { return req.method !== 'POST' }
}))

//adding routes
app.get('/', (req, res) => {
    res.send('<h1>This is working</h1>')
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            res.json(person.toJSON())
        })
        // .catch(error => {
        //     res.status(404).end()
        // })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!(body.name || body.numer)) {
        return res.status(400).json({
            error: 'name or number is missing'
        })
    }

    // if (persons.find(person => person.name === body.name)) {
    //     return res.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

    const person = new Person({
        name: body.name,
        number: body.number,   
    })


    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    })
})

app.get('/info', (req, res) => {
    const time = new Date()
    const count = persons.length


    res.send(`<div>Phonebook has info for ${count} people</div><br><div>${time}</div>`)
})


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})