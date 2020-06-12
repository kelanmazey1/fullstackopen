/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const { body } = request;

  if (body.password.length < 3) {
    return response.status(400).send({ error: 'password needs to be 3 or more characters' });
  }

  if (body.username.length < 3) {
    return response.status(400).send({ error: 'username needs to be 3 or more characters' });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const newUser = await user.save();

  response.status(200).json(newUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 });

  response.json(users.map((u) => u.toJSON()));
});

module.exports = usersRouter;
