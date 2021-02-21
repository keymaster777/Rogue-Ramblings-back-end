const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
//const bcrypt = require('bcrypt')
const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

//app.get('/api/users/:id', (request, response) => {
  //const id = request.params.id
  //response.json(users[id])
//})

app.get('/api/ping', (request, response) => {
  response.json({ping: "pong"})
})

module.exports = app