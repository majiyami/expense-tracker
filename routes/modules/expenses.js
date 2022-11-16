const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')

//建立資料頁面
router.get('/new', (req, res) => {
  return res.render('new')
})
//資料庫建立新的資料


router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, categoryId, amount } = req.body
  return Expense.create({ name, date, categoryId, amount, userId })     // 存入資料庫
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Expense.findOne({ _id, userId })
    .lean()
    .then(expense => res.render('edit', { expense }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, categoryId, amount } = req.body
  return Expense.findOne({ _id, userId })
    .then(expense => {
      expense.name = name
      expense.date = date
      expense.amount = amount
      expense.categoryId = categoryId
      return expense.save()
    })
    //回到
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Expense.findOne({ _id, userId })
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router
