const {
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
} = require('../utils/list_helper');
const helper = require('./test_helper');

describe('total likes', () => {
  test('of none the value is 0', () => {
    expect(totalLikes([])).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const result = totalLikes(helper.listWithOneBlog);
    expect(result).toBe(5);
  });

  test('', () => {
    expect(totalLikes(helper.initialBlogs)).toBe(36);
  });
});

describe('blog with the most likes', () => {
  test('returns none if list empty', () => {
    expect(favouriteBlog([])).toBe(null);
  });

  test('blog with highest likes property', () => {
    expect(favouriteBlog(helper.initialBlogs))
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
    expect(mostBlogs(helper.initialBlogs))
      .toEqual({
        author: 'Robert C. Martin',
        blogs: 3,
      });
  });
});

describe('author with the most likes on all blogs', () => {
  test('returns Edsger Dijkstra with 17 likes', () => {
    expect(mostLikes(helper.initialBlogs))
      .toEqual({
        author: 'Edsger W. Dijkstra',
        likes: 17,
      });
  });
});
