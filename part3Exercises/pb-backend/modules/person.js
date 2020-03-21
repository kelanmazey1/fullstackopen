const mongoose = require('mongoose') 
const numOfArgs = process.argv.length

// if ( numOfArgs<3 ) {
//     console.log('give password argument')
//     process.exit(1)
// }

// const password = process.argv[2]

const url =
    `mongodb+srv://kuranhaze:Bkrbrkk5@cluster0-9knf1.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(results => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connectiong to MongoDB', error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (doucment, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// const Person = mongoose.model('Person', personSchema)

// if( numOfArgs === 3 ) {
//     return(
//         Person
//         .find({})
//         .then(result => {
//             console.log('phonebook:')
//             result
//             .forEach(person => {
//                 console.log(`${person.name} ${person.number}`)
//         })
//     mongoose.connection.close()
//     })
//     )
// }

// const name = process.argv[3]
// const number = process.argv[4]



// person.save().then(response => {
//     console.log(`added ${person.name} number ${person.number} to phonebook`)
//     mongoose.connection.close()
// })

module.exports = mongoose.model('Person', personSchema)