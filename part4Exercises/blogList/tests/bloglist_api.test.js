const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs
    .map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(6);
});

test('blog has id property not _id', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

test('creates a new blog post', async () => {
  const newBlog = {
    title: 'test blog',
    author: 'Kelan Mazey',
    url: 'https://github.com/kelanmazey1/fullstackopen',
    likes: 0,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const currentBlogs = await helper.blogsInDB();
  // Create new array to test if blog is added as new ID is generate each time
  const blogsWithoutIDs = currentBlogs
    .map(({ id, ...noIds }) => (noIds));

  expect(currentBlogs).toHaveLength(helper.initialBlogs.length + 1);
  expect(blogsWithoutIDs).toContainEqual(newBlog);
});

test('assigns 0 to missing likes property', async () => {
  const newBlog = {
    title: 'Test Blog No Likes',
    author: 'Kelan Mazey',
    url: 'https://github.com/kelanmazey1/hello-world',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const currentBlogs = await helper.blogsInDB();

  expect(currentBlogs[currentBlogs.length - 1].likes).toBe(0);
});

test('blog not created without title and url', async () => {
  const newBlog = {
    author: 'Kelan Mazey',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

test('blog at certain endpoint is deleted', async () => {
  await api
    .delete('/api/blogs/5a422a851b54a676234d17f7')
    .expect(204);

  const currentBlogs = await helper.blogsInDB();
  const currentBlogIDs = currentBlogs.map(blog => blog.id);
  
  expect(currentBlogIDs).not.toContainEqual('5a422a851b54a676234d17f7');
})

afterAll(() => {
  mongoose.connection.close();
});
