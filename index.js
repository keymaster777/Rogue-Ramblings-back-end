const express = require('express')
const app = express()
const http = require('http')

const server = http.createServer(app)
const users = [
  {
    id: 1,
    username: 'key777',
    firstname: 'Riley',
    lastname: 'Cleary'
  },
  {
    id: 2,
    username: 'polio',
    firstname: 'Niki',
    lastname: 'Cleary'
  }
]

app.get('/', (request, response) => {
  response.json(users)
})

server.listen(3001, () => {
  console.log('Server running on port 3001')
})