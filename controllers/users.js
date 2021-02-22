const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.post('/', async (request, response) => {
  const body = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    firstname: body.firstname,
    passwordHash: passwordHash
  })
  if(process.env.NODE_ENV === 'test') {
    user['role'] = body.role
  }
  const savedUser = await user.save()
  response.json(savedUser)
})

module.exports = router