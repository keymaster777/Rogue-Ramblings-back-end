const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

beforeAll(async (done) => {
  await helper.waitForDBConnection( async () => {
    await api.post('/api/testing/reset')
    done()
  })
})

describe('API can', () => {
  test('api can be pinged', async () => {
    const result = await api
      .get('/api/ping')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body.ping).toContain('pong')
  })
})

describe('User can', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })
  test('be created', async () => {
    const usersBeforeTest = await helper.usersInDb()
    const newUser = { ...helper.initialUsers[0] }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterTest = await helper.usersInDb()
    expect(usersAfterTest).toHaveLength(usersBeforeTest.length + 1)
  })

  test('fails to create with bad user creation code', async () => {
    const usersBeforeTest = await helper.usersInDb()
    const newUser = { ...helper.initialUsers[0] }

    const expectToFailApiBecauseOfBadAuth = async (user) => {
      await api
        .post('/api/users')
        .send(user)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    }

    //No user create code in request
    newUser['userCreateCode'] = undefined
    await expectToFailApiBecauseOfBadAuth(newUser)

    //User create code is empty in request
    newUser['userCreateCode'] = ''
    await expectToFailApiBecauseOfBadAuth(newUser)

    //User create code is incorrect
    newUser['userCreateCode'] = 'incorrect'
    await expectToFailApiBecauseOfBadAuth(newUser)

    const usersAfterTest = await helper.usersInDb()
    expect(usersAfterTest).toHaveLength(usersBeforeTest.length)
  })

  test('fails to create when given non unique username', async () => {
    const usersBeforeTest = await helper.usersInDb()
    const newUser = { ...helper.initialUsers[0] }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    let usersAfterTest = await helper.usersInDb()
    expect(usersAfterTest).toHaveLength(usersBeforeTest.length+1)

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')
    usersAfterTest = await helper.usersInDb()
    // This may look like its checking for another addition but its still checking for just the one
    expect(usersAfterTest).toHaveLength(usersBeforeTest.length+1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

