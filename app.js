const express = require("express");
const app = express();
const port = 3000

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})