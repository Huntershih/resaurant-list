const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const restaurant = require('./models/restaurant')
const app = express()
const port = 3000
const Restaurants = require('./models/restaurant')

mongoose.connect('mongodb://localhost/restaurant-list')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb ERROR!')
}
)

db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 讀取所有資料庫並渲染資料
app.get('/', (req, res) => {
  Restaurants.find()
    .lean()
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => console.log(error))
})

//新增資料頁面
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

//取得搜尋頁面
app.get('/restaurants/search', (req, res) => {
  const keywords = req.query.keywords

  console.log(keywords)
  return Restaurants.find({ $or: [{ name: { $regex: keywords } }, { category: { $regex: keywords } }] })
    .lean()
    .then(restaurantList => res.render('index', { restaurantList, record: keywords }))
    .catch(error => console.log(error))
})

//取得指定資料頁面
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id

  return Restaurants.findById(id)
    .lean()
    .then(restaurantList => res.render('show', { restaurantList }))
    .catch(error => console.log(error))
})

//取得編輯頁面
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurants.findById(id)
    .lean()
    .then(restaurantList => res.render('edit', { restaurantList }))
    .catch(error => console.log(error))
})

//更新編輯資料
app.post('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const data = req.body

  return Restaurants.findById(id)
    .then((restaurantList) => {
      for (const [key, value] of Object.entries(data)) {
        restaurantList[key] = value
      }
      return restaurantList.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//新增一筆資料
app.post('/restaurants', (req, res) => {

  const data = req.body

  Restaurants.create(data)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//刪除一筆資料
app.post('/restaurants/:id/delete', (req, res) => {

  const id = req.params.id

  return Restaurants.findById(id)
    .then(restaurantList => restaurantList.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})

//監聽伺服器
app.listen(port, () => {
  console.log(`The server is running on localhost:${port}`)
})