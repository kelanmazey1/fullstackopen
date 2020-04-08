const {
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
} = require('../utils/list_helper');

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  }, {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  }, {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  }, {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  }, {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

describe('total likes', () => {
  test('of none the value is 0', () => {
    expect(totalLikes([])).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('', () => {
    expect(totalLikes(blogs)).toBe(36);
  });
});

describe('blog with the most likes', () => {
  test('returns none if list empty', () => {
    expect(favouriteBlog([])).toBe(null);
  });

  test('blog with highest likes property', () => {
    expect(favouriteBlog(blogs))
      .toEqual({
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0,
      });
  });
});

describe('author with the most blogs', () => {
  test('returns Robert Martin with 3 blogs', () => {
    expect(mostBlogs(blogs))
      .toEqual({
        author: 'Robert C. Martin',
        blogs: 3,
      });
  });
});

describe('author with the most likes on all blogs', () => {
  test('returns Edsger Dijkstra with 17 likes', () => {
    expect(mostLikes(blogs))
      .toEqual({
        author: 'Edsger W. Dijkstra',
        likes: 17,
      });
  });
});