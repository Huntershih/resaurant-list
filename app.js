const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
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

app.get('/', (req, res) => {
  Restaurants.find()
    .lean()
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => console.log(error))
})

app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id

  return Restaurants.findById(id)
    .lean()
    .then(restaurantList => res.render('show', { restaurantList }))
    .catch(error => console.log(error))

})


app.get('/search', (req, res) => {
  const keywords = req.query.keywords
  // const keywordsToLowerCase = keywords.toLowerCase()

  console.log(keywords)
  return Restaurants.find({ name: { $regex: keywords } })
    .lean()
    .then(restaurantList => res.render('index', { restaurantList, record: keywords }))
    .catch(error => console.log(error))



  // const search = restaurants.results.filter((restaurant) => {
  //   return restaurant.name.toLowerCase().includes(keywordsToLowerCase) || restaurant.category.toLowerCase().includes(keywordsToLowerCase)
  // })
  // res.render('index', { restaurantList: search, record: keywords })
})


app.listen(port, () => {
  console.log(`The server is running on localhost:${port}`)
})