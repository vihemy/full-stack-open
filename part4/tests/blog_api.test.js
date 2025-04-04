const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')

describe('when entries already exists in database', () => {
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

  test('unique identifier property of blogs is named "id"', async ()  => {
    const response = await api.get('/api/blogs')

    const getIdentifierKey = (array) => {
      if ('id' in array[0]) {
        return 'id'
      } else if ('_id' in array[0]){
        return '_id'}
    }

    assert.strictEqual(getIdentifierKey(response.body), 'id')
  })

  describe('addition of a new blog entry', () => {
    test('succedes', async () => {
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

    test('with missing likes-property defaults to 0', async () => {
      const incompleteEntry = {
        title: 'entry with no likes',
        author: 'victor',
        url: 'victor.com',
      }
      const completedEntry = await api
        .post('/api/blogs')
        .send(incompleteEntry)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(completedEntry.body.likes, 0)
    })

    test('with missing title-property results in status code 400 Bad Request', async () => {
      const incompleteEntry = {
        author: 'Jones',
        url: 'jones.nu',
        likes: 250
      }

      await api
        .post('/api/blogs')
        .send(incompleteEntry)
        .expect(400)
    })

    test('with missing URL-property results in status code 400 Bad Request', async () => {
      const incompleteEntry = {
        title: 'entry with no URL',
        author: 'Jones',
        likes: 250
      }

      await api
        .post('/api/blogs')
        .send(incompleteEntry)
        .expect(400)
    })
  })

  describe('deleting a blog entry', () => {
    test('returns 204', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    })

    test('is removes entry from database', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length -1)

      const ids = blogsAtEnd.map(r => r.id)
      assert(!ids.includes(blogToDelete.id))
    })
  })

  describe('updating a blog entry', () => {
    test('with a valid put will update succesfully', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = {
        title: 'updated blog',
        author: 'Mike',
        url: 'mike.gov',
        likes: 394
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const blogAfterUpdate = blogsAtEnd[0]

      assert(blogAfterUpdate.likes !== blogToUpdate.likes)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})