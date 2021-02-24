const User = require('../models/user')
const mongoose = require('mongoose')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const initialUser = {
  username: 'User1',
  firstname: 'John Dorian',
  role: 'editor',
  password: 'sekret'
}

const waitForDBConnection = async (done) => {
  if(mongoose.connection.readyState !== 1){
    await mongoose.connection.on('connected', () => done())
  } else {
    done()
  }
}

module.exports = {
  usersInDb,
  initialUser,
  waitForDBConnection
}