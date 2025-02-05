const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const User = require('../models/user')

describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const userObject = helper.initialUsers
      .map(user => new User(user))
    const promiseArray = userObject.map(user => user.save())
    await Promise.all(promiseArray)
  })

  test('with missing username returns status code 400 Bad Request', async () => {
    const incompleteEntry = {
      name: 'Test for missing username',
      password: 'abc123'
    }

    await api
      .post('/api/users')
      .send(incompleteEntry)
      .expect(400)
  })

  test('with missing username does not add new user', async () => {
    const incompleteEntry = {
      name: 'Test for missing username',
      password: 'abc123'
    }

    await api
      .post('/api/users')
      .send(incompleteEntry)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)

    const contents = usersAtEnd.map (u => u.name)
    assert(!contents.includes('Test for missing username'))
  })


  test('with missing password returns status code 400 Bad Request', async () => {
    const incompleteEntry = {
      username: 'Test for missing password',
      name: 'test'
    }

    await api
      .post('/api/users')
      .send(incompleteEntry)
      .expect(400)
  })

  test('with missing password does not add new user', async () => {
    const incompleteEntry = {
      username: 'Test for missing password',
      name: 'test'
    }

    await api
      .post('/api/users')
      .send(incompleteEntry)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)

    const contents = usersAtEnd.map (u => u.username)
    assert(!contents.includes('Test for missing username'))
  })

  after(async () => {
    await mongoose.connection.close()
  })

})