const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((error) => response.status(400).json(error));
});

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => response.status(400).json(error));
});

module.exports = blogRouter;
