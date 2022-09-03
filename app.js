const express = require("express");
const mongoose = require('mongoose')
const app = express();
const port = 3000

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('opne', () => {
  console.log('mobgodb 111111111111')
})

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})