/* eslint-disable consistent-return */
const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post('/', async (request, response) => {
  const { body, token } = request;

  const decodedToken = jwt.verify(token, process.env.SECRET);

  const user = await User.findById(decodedToken.id);

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
  const { token } = request;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  // find blog to be deleted
  const blogToDelete = await Blog.findById(request.params.id);
  // parse user object in blog to see user who created it
  const blogCreator = blogToDelete.user.toString();
  // compare if user making the request is the creator
  // if they aren't return an error
  if (blogCreator !== decodedToken.id) {
    return response.status(401).send({ error: 'Only the creator of a blog can delete it' });
  }
  // if requester is the creator then delete the blog and save blogs and user
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
    user: body.user.id,
  };

  const returnedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    updatedBlog,
    { runValidators: true },
  );
  // updated blog returns the user as a string, this is adding the object back in its place

  response.json(returnedBlog.toJSON());
});

module.exports = blogRouter;
