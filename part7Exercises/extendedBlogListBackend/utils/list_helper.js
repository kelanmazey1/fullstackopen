const _ = require('lodash');

const totalLikes = (blogs) => {
  const reducer = (likes, blog) => likes + blog.likes;

  return blogs.reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const reducer = (previous, current) => (previous.likes > current.likes
    ? previous
    : current);

  return blogs.reduce(reducer);
};

const mostBlogs = (blogs) => _
  .chain(blogs)
// group blogs by author
  .groupBy('author')
// maps authors out into desired output
  .map((authorsBlogs, author) => ({
    author,
    blogs: authorsBlogs.length,
  }))
  .value()
// selects author object with the most articles
  .reduce((previous, current) => (previous.articles > current.articles
    ? previous
    : current));

const mostLikes = (blogs) => _
  .chain(blogs)
// group blogs by author
  .groupBy('author')
// map new array of authors and summed likes
  .map((authorsBlogs, author) => ({
    author,
    likes: _.sumBy(authorsBlogs, 'likes'),
  }))
  .value()
// select author with the most likes
  .reduce((previous, current) => (previous.likes > current.likes
    ? previous
    : current));

module.exports = {
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
