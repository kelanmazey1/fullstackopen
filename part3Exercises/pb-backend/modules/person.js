/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false);

const url = process.env.MONGODB_URI;


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log('error connectiong to MongoDB', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
  },
});

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-param-reassign
    returnedObject.id = returnedObject._id.toString();
    // eslint-disable-next-line no-param-reassign
    delete returnedObject._id;
    // eslint-disable-next-line no-param-reassign
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
