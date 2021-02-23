const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
//const bcrypt = require('bcrypt')
const api = supertest(app)
const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

beforeAll(async (done) => {
  if(mongoose.connection.readyState !== 1){
    await mongoose.connection.on('connected', () => done())
  } else {
    done()
  }
})

describe('API can', () => {
  const route = '/api'

  test('api can be pinged', async () => {
    const result = await api
      .get(route+'/ping')
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
    const usersBeforeTest = await usersInDb()
    const newUser = {
      username: 'User1',
      firstname: 'John Dorian',
      role: 'editor',
      password: 'sekret',
      userCreateCode: 'sekret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterTest = await usersInDb()
    expect(usersAfterTest).toHaveLength(usersBeforeTest.length + 1)
  })

  test('fails to create with bad user creation code', async () => {
    const usersBeforeTest = await usersInDb()
    const newUser = {
      username: 'User1',
      firstname: 'John Dorian',
      role: 'editor',
      password: 'sekret'
    }

    //No user create code in request
    await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    //User create code is empty in request
    newUser['createUserCode'] = ''
    await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const usersAfterTest = await usersInDb()
    expect(usersAfterTest).toHaveLength(usersBeforeTest.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

