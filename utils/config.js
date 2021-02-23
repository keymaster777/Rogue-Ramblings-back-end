require('dotenv').config()

const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let USER_CREATION_CODE = process.env.USER_CREATION_CODE

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
  USER_CREATION_CODE = process.env.TEST_USER_CREATION_CODE
}

module.exports = {
  USER_CREATION_CODE,
  MONGODB_URI,
  PORT
}