const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const expenses = require('./modules/expenses')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

router.use('/expenses', authenticator, expenses)
router.use('/auth', auth)
router.use('/users', users)
router.use('/', authenticator, home)




module.exports = router