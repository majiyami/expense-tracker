const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const bodyParser = require('body-parser')



if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')

const usePassport = require('./config/passport')

require('./config/mongoose')


const app = express();

const port = process.env.PORT || 3000

//引入handlebars-helper
app.engine('hbs', exphbs({ default: 'main', extname: '.hbs', helpers: {
  dateFormat(date) {
    return `${date.getFullYear()}-` + `${`0${date.getMonth() + 1}`.slice(-2)}-` + `${`0${date.getDate()}`.slice(-2)}`
  },
  ifEquals: (a, b, options) =>
    String(a) === String(b) ? options.fn(this) : options.inverse(this)
} }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ exrended: true }))
app.use(methodOverride('_method'))

usePassport(app)

app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)


app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})