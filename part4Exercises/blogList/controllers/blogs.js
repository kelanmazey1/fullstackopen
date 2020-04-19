const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  const { body } = request;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
  });

  const newBlog = await blog.save();
  response.status(201).json(newBlog);
});

blogRouter.delete('/:id', async (request, response) => {
  
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();

});

module.exports = blogRouter;
