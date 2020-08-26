const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'Test Man',
    url: 'http://www.FirstUrl.com',
    likes: 4,
  },
  {
    title: 'Second Blog',
    author: 'Test Woman',
    url: 'http://www.SecondUrl.com',
    likes: 5,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'nobody',
    url: 'http://www.nothing.com',
    likes: 0,
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
