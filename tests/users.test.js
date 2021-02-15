const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const saltRounds = 10
const api = supertest(app)

describe('API can', () => {
  const route = '/api'

  test('api can be pinged', async () => {
    const result = await api
      .get(route+'/ping')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
      expect(result.body.ping).toContain('pong')
  })

  test('can hash a password', async () => {
    const password = "sekret"
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const result = await api
      .get(route+'/hash/'+password)
      .expect(200)

    const passwordsMatch = await bcrypt.compare(password, result.text) 
    expect(passwordsMatch).toBe(true);
  })
})

describe('User can', () => {
  test('be retrieved from DB', async () => {
    const result = await api
      .get('/api/users/1')
      .expect(200)
  })
})

