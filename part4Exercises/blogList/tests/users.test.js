const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);

describe('when there are no users in the db', () => {
  test('creation succeeds with valid username and password', async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: 'test',
      name: 'test',
      password: 'test',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDB();

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
  });

  test('username under 3 characters returns error', async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: 'no',
      name: 'userTooSmall',
      password: 'notTooSmall',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username needs to be 3 or more characters');

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('password under 3 characters returns error', async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      username: 'notTooSmall',
      name: 'passwordTooSmall',
      password: 'no',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('password needs to be 3 or more characters');

    const usersAtEnd = await helper.usersInDB();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
