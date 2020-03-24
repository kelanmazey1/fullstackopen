const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./modules/person');

const app = express();
app.use(express.json());
app.use(express.static('build'));
app.use(cors());


// adding log strings to console for requests
morgan.token('obj', (req) => {
  const { body } = req;

  return JSON.stringify(body);
});


app.use(morgan('tiny', {
  skip: (req) => req.method === 'POST',
}));


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :obj', {
  skip: (req) => req.method !== 'POST',
}));

// adding routes

app.get('/info', (req, res, next) => {
  const time = new Date();
  Person
    .countDocuments({})
    .then((count) => res.send(`<div>Phonebook has info for ${count} people</div><br><div>${time}</div>`))
    .catch((error) => next(error));
});

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then((people) => {
      res.json(people.map((person) => person.toJSON()));
    });
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (req, res, next) => {
  const { body } = req;

  const person = new Person({
    name: body.name,
    number: body.number,
  });


  person
    .save()
    .then((savedPerson) => res.json(savedPerson.toJSON()))
    .catch((error) => next(error));
});


app.put('/api/persons/:id', (req, res, next) => {
  const { body } = req;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson.toJSON());
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown enpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).json({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  if (error.name === 'TypeError') {
    return res.status(400).json({ error: 'id not found' });
  }
  return next(error);
};


app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
