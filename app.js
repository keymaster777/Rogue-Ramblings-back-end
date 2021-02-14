const express = require('express')
const app = express()

const users = [
  {
    id: 1,
    username: 'key777',
    firstname: 'Riley',
    lastname: 'Cleary',
    passwordhash: 'adadsdf'
  },
  {
    id: 2,
    username: 'polio',
    firstname: 'Niki',
    lastname: 'Cleary',
    passwordhash: 'aadsfsaf'
  }
]

app.get('/users', (request, response) => {
  response.json(users)
})

app.get('/ping', (request, response) => {
  response.json({ping: "pong"})
})

module.exports = app