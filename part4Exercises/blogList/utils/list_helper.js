const dummy = (blogs) => 1;

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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
