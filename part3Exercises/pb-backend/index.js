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

app.get('/info', (req, res) => {
    const time = new Date()
    const count = persons.length


    res.send(`<div>Phonebook has info for ${count} people</div><br><div>${time}</div>`)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
        
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    if ((!body.name || !body.number)) {
        return res.status(400).json({
            error: 'name or number is missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,   
    })


    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
})



app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number,
    }
    console.log(body)
    console.log(req.params)
    
    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown enpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if(error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message })
    } else if(error.name  === 'TypeError') {
        return res.status(400).json({ error: 'id not found' })
    }
    

    next(error)
}


app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})