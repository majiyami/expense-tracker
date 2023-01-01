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

router.get('/search', (req, res) => {
  const userId = req.user._id
  const id = req.query.categoryId
  Expense.find({ userId })
    .lean()
    .then(expenses => {
      const findexpense = expenses.filter(data =>
        data.categoryId === Number(id) //將id轉為數字
      )
      let total = 0
      for (let i = 0; i < findexpense.length; i++) {
        total += findexpense[i].amount
      }
      res.render('index', { expense: findexpense, id, total })
    })
    .catch(err => console.log(err))
})


module.exports = router
