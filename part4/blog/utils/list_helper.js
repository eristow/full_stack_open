var _ = require('lodash');
// eslint-disable-next-line no-unused-vars
const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = blogs => {
  const reducer = (prev, current) =>
    prev.likes > current.likes ? prev : current;

  return blogs.length === 0 ? {} : blogs.reduce(reducer, 0);
};

// return: author who has largest amount of blogs
// { author: "author_name", blogs: num_blogs }
const mostBlogs = blogs => {
  console.log(blogs);
  const authors = ;

  return {
    author: '',
    blogs: -1,
  };
};

// return: author whose blog posts have largest amount of likes
// { author: "author_name", likes: total_likes }
const mostLikes = blogs => {
  return {
    author: '',
    likes: -1,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
