const { TestScheduler } = require('jest')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

test('api can be pinged', async () => {
  const result = await api
    .get('/ping')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
    expect(result.body.ping).toContain('pong')
})