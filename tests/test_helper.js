const User = require('../models/user')
const mongoose = require('mongoose')
const app = require('../app')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const initialUsers = [
  {
    username: 'User1',
    firstname: 'John Dorian',
    role: 'editor',
    password: 'sekret',
    passwordHash: '$2b$10$DtKlk5sT12HQzzH4ZzN5JOX1ETE1WQwUu9VydmqdTvRbwmY0JKmQO',
    userCreateCode: 'sekret'
  },
  {
    username: 'User2',
    firstname: 'Jane Doe',
    role: 'editor',
    password: 'alsosekret',
    passwordHash: '$2b$10$DtKlk5sT12HQzzH4ZzN5JOX1ETE1WQwUu9VydmqdTvRbwmY0JKmQO',
    userCreateCode: 'sekret'
  }
]

const waitForDBConnection = async (done) => {
  if(mongoose.connection.readyState !== 1){
    app.on('ready', () => {
      console.log('db connected for tests')
      done()
    })
  }
}

module.exports = {
  usersInDb,
  initialUsers,
  waitForDBConnection
}