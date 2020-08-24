const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

describe('when there are initially blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs');

    expect(res.body).toHaveLength(helper.initialBlogs.length);
  });

  test('there is an id field', async () => {
    const res = await api.get('/api/blogs');

    expect(res.body[0].id).toBeDefined();
  });
});

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'New Title',
      author: 'New Person',
      url: 'http://www.newblog.com',
      likes: 1,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map(b => b.title);
    expect(titles).toContain('New Title');
  });

  test('blog added without likes field defaults likes to 0', async () => {
    const newBlog = {
      title: 'New Title',
      author: 'New Person',
      url: 'http://www.newblog.com',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const likes = blogsAtEnd.map(b => b.likes);
    expect(likes[likes.length - 1]).toBe(0);
  });

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'New Person',
      url: 'http://www.newblog.com',
      likes: 1,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('blog without url is not added', async () => {
    const newBlog = {
      title: 'New Title',
      author: 'New Person',
      likes: 1,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map(b => b.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('change data of existing blog', () => {
  test('succeeds with status code 204 if changing likes', async () => {
    const blogsAtStart = await helper.blogsInDb();
    let blogToUpdate = blogsAtStart[0];
    blogToUpdate.likes = 5;

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    expect(updatedBlog.body.likes).toBe(5);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
