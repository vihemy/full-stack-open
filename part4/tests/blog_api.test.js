const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are a correct amount of blogs ', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier property is named "id"', async ()  => {
  const response = await api.get('/api/blogs')

  const getIdentifierKey = (array) => {
    if ('id' in array[0]) {
      return 'id'
    } else if ('_id' in array[0]){
      return '_id'}
  }

  assert.strictEqual(getIdentifierKey(response.body), 'id')
})

test('a valid entry can be added', async () => {
  const newBlog = {
    title: 'new entry',
    author: 'victor',
    url: 'victor.com',
    likes: 999
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(b => b.title)
  assert(contents.includes('new entry'))
})

test('if missing likes-property defaults to 0', async () => {
  const incompleteEntry = {
    title: 'new entry',
    author: 'victor',
    url: 'victor.com',
  }
  const completedEntry = await api
    .post('/api/blogs')
    .send(incompleteEntry)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  console.log(completedEntry.body)


  assert.strictEqual(completedEntry.body.likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})