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

app.get('/', (req, res) => {
  Restaurants.find()
    .lean()
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => console.log(error))
})

app.get('/restaurants/new', (req, res) => {

  res.render('new')
})


app.get('/restaurants/search', (req, res) => {
  const keywords = req.query.keywords

  console.log(keywords)
  return Restaurants.find({ name: { $regex: keywords } })
    .lean()
    .then(restaurantList => res.render('index', { restaurantList, record: keywords }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id

  return Restaurants.findById(id)
    .lean()
    .then(restaurantList => res.render('show', { restaurantList }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurants.findById(id)
    .lean()
    .then(restaurantList => res.render('edit', { restaurantList }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const data = req.body

  return Restaurants.findById(id)
    .then((restaurant) => {
      for (const [key, value] of Object.entries(req.body)) {
        restaurant[key] = value
      }
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.post('/restaurants', (req, res) => {

  const data = req.body

  Restaurants.create(data)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



app.listen(port, () => {
  console.log(`The server is running on localhost:${port}`)
})