const mongoose = require('mongoose') 
const numOfArgs = process.argv.length

if ( numOfArgs<3 ) {
    console.log('give password argument')
    process.exit(1)
}

const password = process.argv[2]        

const url =
    `mongodb+srv://kuranhaze:${password}@cluster0-9knf1.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if( numOfArgs === 3 ) {
    return(
        Person
        .find({})
        .then(result => {
            console.log('phonebook:')
            result
            .forEach(person => {
                console.log(`${person.name} ${person.number}`)
        })
    mongoose.connection.close()
    })
    )
}

const name = process.argv[3]
const number = process.argv[4]

const person = new Person({
    name: name,
    number: number,
})

person.save().then(response => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
})
