const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const usersRouter = require('./controllers/users')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.json())
app.use('/api/users', usersRouter)
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.get('/api/ping', (request, response) => {
  response.json({ ping: 'pong' })
})

module.exports = app