const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
//const config = require('../utils/config')

router.post('/login', async (request, response) => {
  const body = request.body
  const user = await User.findOne({ username: body.username })
  const correctPassword = user === null
    ? false
    : await bcrypt.compare(body.password ?? '', user.passwordHash)

  if (correctPassword) {
    response.status(200).json({ 'status': 'success' })
  } else {
    response.status(401).json({ 'status': 'failed', 'message': 'Invalid username or password.' })
  }
})

module.exports = router