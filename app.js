const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const restaurants = require('./restaurant.json')

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

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/restaurant/:id', (req, res) => {
  const restaurant = restaurants.results.find(restaurant => restaurant.id === Number(req.params.id))
  res.render('show', { restaurantList: restaurant })
})

app.get('/', (req, res) => {
  res.render('index', { restaurantList: restaurants.results })
})

app.get('/restaurant/search', (req, res) => {
  const keywords = req.query.keywords
  const keywordsToLowerCase = keywords.toLowerCase()
  const search = restaurants.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(keywordsToLowerCase) || restaurant.category.toLowerCase().includes(keywordsToLowerCase)
  })
  res.render('index', { restaurantList: search, record: keywords })
})


app.listen(port, () => {
  console.log(`The server is running on localhost:${port}`)
})