if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const Expense = require('../expense')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: '123',
  email: '123@123',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: 5 },
        (_, i) => Expense.create({ name: '123', date: `2022-11-11`, categoryId: i + 1,  amount: 123, userId })
      ))
    })
    .then(() => {
      console.log('User123 done')
      process.exit()
    })
})