const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const routes = require('./routes')

require('./config/mongoose')


const app = express();

const port = 3000

app.engine('hbs', exphbs({ default: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ exrended: true }))
app.use(methodOverride('_method'))

app.use(routes)


app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})