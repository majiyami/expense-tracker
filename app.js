const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const routes = require('./routes')

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
app.use(methodOverride('_method'))

app.use(routes)


app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})