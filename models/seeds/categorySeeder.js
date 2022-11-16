const Category = require('../category')
const categoryList = [
  {
    id: 1,
    name: '家居'
  },
  {
    id: 2,
    name: '交通'
  },
  {
    id: 3,
    name: '娛樂'
  },
  {
    id: 4,
    name: '餐飲'
  },
  {
    id: 5,
    name: '其他'
  }
]

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('categorySeeder done')
  Promise.all(
    Array.from(
      { length: 5 },
      (_, i) => Category.create({ id: categoryList[i].id, name: categoryList[i].name })
    )
  )
    .then(() => {
      console.log('123')
      process.exit()
    })
    .catch((error) => console.log(error))
})