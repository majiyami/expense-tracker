const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const bodyParser = require('body-parser')

const Todo = require('./models/todo')

const app = express();
const port = 3000

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ default: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ exrended: true }))

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
   .lean()
   .then(todo => res.render('detail', {todo}))
   .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})