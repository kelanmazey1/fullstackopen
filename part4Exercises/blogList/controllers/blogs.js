const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post('/', async (request, response) => {
  const { body } = request;

  const user = await User.findOne({});

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes ? body.likes : 0,
  });

  const newBlog = await blog.save();

  user.blogs = user.blogs.concat(newBlog._id);
  await user.save();
  response.status(201).json(newBlog);
});

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
  const { body } = request;

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true, runValidators: true });

  response.json(updatedBlog.toJSON());
});

module.exports = blogRouter;
