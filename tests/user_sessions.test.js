const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

beforeAll(async (done) => {
  await helper.waitForDBConnection( async () => {
    await api.post('/api/testing/reset')
    const userObjects = helper.initialUsers
      .map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
    done()
  })
})

describe('Login is', () => {
  test('successful when correct password supplied', async () => {
    // Really only username and password are required but it doesnt hurt to test with extra fields
    const newUser = { ...helper.initialUsers[0] }
    await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('unsuccessful when no password is given or wrong pass given', async () => {
    const newUser = { ...helper.initialUsers[0] }
    newUser.password = undefined
    const result = await api
      .post('/api/login')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.message).toContain('Invalid username or password.')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
