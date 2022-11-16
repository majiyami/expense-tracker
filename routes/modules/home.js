const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')

router.get('/', (req, res) => {
  const userId = req.user._id
  Expense.find({ userId })
    .lean()
    .sort({ _id: 'asc' })  //desc
    .then(expense => {
      let total = 0
      for (let i = 0; i < expense.length; i++) {
        total += expense[i].amount
      }
      return res.render('index', { expense, total })
    })
    .catch(error => console.error(error))
})

module.exports = router
