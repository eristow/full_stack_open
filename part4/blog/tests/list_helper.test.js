const listHelper = require('../utils/list_helper');

const blog1 = {
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url:
    'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0,
};
const blog2 = {
  _id: '5a422aa71b54a676234d17f9',
  title: 'Go To Statement Considered Great',
  author: 'Edsger W. MAN',
  url:
    'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Great.html',
  likes: 6,
  __v: 0,
};
const listWithOneBlog = [blog1];
const listWithTwoBlogs = [blog1, blog1];
const listWithDiffBlogs = [blog1, blog2];

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated correctly', () => {
    const result = listHelper.totalLikes(listWithTwoBlogs);
    expect(result).toBe(10);
  });
});

describe('favorite blog', () => {
  test('of empty is empty object', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual({});
  });

  test('of a list with one blog is calculated correctly', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(blog1);
  });

  test('of a list with two same blogs is calculated correctly', () => {
    const result = listHelper.favoriteBlog(listWithTwoBlogs);
    expect(result).toEqual(blog1);
  });

  test('of a list with two blog is calculated correctly', () => {
    const result = listHelper.favoriteBlog(listWithDiffBlogs);
    expect(result).toEqual(blog2);
  });
});
