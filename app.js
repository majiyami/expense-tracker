const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const routes = require('./routes')

const usePassport = require('./config/passport')

require('./config/mongoose')


const app = express();

const port = 3000

app.engine('hbs', exphbs({ default: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: "ThisIsMySecret",
  resave: false,
  saveUninitialized: true,
}))
app.use(bodyParser.urlencoded({ exrended: true }))
app.use(methodOverride('_method'))

usePassport(app)

app.use(routes)


app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})