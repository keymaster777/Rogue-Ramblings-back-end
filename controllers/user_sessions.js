const router = require('express').Router()
//const bcrypt = require('bcrypt')
//const User = require('../models/user')
//const config = require('../utils/config')

router.post('/login', async (request, response, next) => {
  response.status(200).json({ 'status': 'success' })
})

module.exports = router