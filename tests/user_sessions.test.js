const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
//const User = require('../models/user')
const helper = require('./test_helper')

beforeAll(async (done) => {
  await helper.waitForDBConnection( async () => {
    await api.post('/api/testing/reset')
    done()
  })
})

describe('Login is', () => {
  test('successful when correct password supplied', async () => {
    // Really only username and password are required but it doesnt hurt to test with extra fields
    const newUser = helper.initialUsers[0]
    await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(true).toBe(true)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
