const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs
    .map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('creating blog posts with a valid user and authorization', () => {
  const loginResponse = async (user) => {
    const response = await api
      .post('/api/login')
      .send(user);
    return response.body;
  };

  beforeEach(async () => {
    await User.deleteMany({});

    await api.post('/api/users').send(helper.initialUsers[0]);
  });

  test('creates a new blog post', async () => {
    const user = {
      username: 'testing',
      password: 'foobar',
    };

    const newBlog = {
      title: 'test blog',
      author: 'Kelan Mazey',
      url: 'https://github.com/kelanmazey1/fullstackopen',
      likes: 0,
    };
    const responseBody = await loginResponse(user);
    const bearerToken = `bearer ${responseBody.token}`;

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', bearerToken)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const currentBlogs = await helper.blogsInDB();
    // Create new array to test if blog is added as new ID is generate each time
    const blogsWithoutIDs = currentBlogs
      .map(({ id, ...noIds }) => (noIds));

    const testUser = await User.findOne({ username: responseBody.username });
    newBlog.user = testUser._id;

    expect(currentBlogs).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogsWithoutIDs).toContainEqual(newBlog);
  });

  test('assigns 0 to missing likes property', async () => {
    const user = {
      username: 'testing',
      password: 'foobar',
    };

    const responseBody = await loginResponse(user);
    const bearerToken = `bearer ${responseBody.token}`;

    const newBlog = {
      title: 'Test Blog No Likes',
      author: 'Kelan Mazey',
      url: 'https://github.com/kelanmazey1/hello-world',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', bearerToken)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const currentBlogs = await helper.blogsInDB();

    expect(currentBlogs[currentBlogs.length - 1].likes).toBe(0);
  });

  test('blog not created without title and url', async () => {
    const user = {
      username: 'testing',
      password: 'foobar',
    };

    const responseBody = await loginResponse(user);
    const bearerToken = `bearer ${responseBody.token}`;

    const newBlog = {
      author: 'Kelan Mazey',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', bearerToken)
      .expect(400);
  });

  test('blog post not created when no token provided', async () => {
    const newBlog = {
      title: 'test blog',
      author: 'Kelan Mazey',
      url: 'https://github.com/kelanmazey1/fullstackopen',
      likes: 0,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(6);
});

test('blog has id property not _id', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});


test('blog at certain endpoint is deleted', async () => {
  await api
    .delete('/api/blogs/5a422a851b54a676234d17f7')
    .expect(204);

  const currentBlogs = await helper.blogsInDB();
  const currentBlogIDs = currentBlogs.map((blog) => blog.id);

  expect(currentBlogIDs).not.toContainEqual('5a422a851b54a676234d17f7');
});

test('blog is updated with object sent in request', async () => {
  const updatedBlog = {
    title: 'Something funny',
    author: 'Kelan Mazey',
    url: 'https://reactpatterns.com/',
    likes: 58,
  };

  await api
    .put('/api/blogs/5a422a851b54a676234d17f7')
    .send(updatedBlog);

  const blogAfterUpdate = await helper.findBlog('5a422a851b54a676234d17f7');
  const { id, ...blogAfterUpdateNoId } = blogAfterUpdate;

  expect(blogAfterUpdateNoId).toEqual(updatedBlog);
});

afterAll(() => {
  mongoose.connection.close();
});
