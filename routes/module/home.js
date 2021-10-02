const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurants.find()
    .lean()
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => console.log(error))
})

router.put('/filter', (req, res) => {
  const { sort } = req.body
  const filterData = {
    default: { _id: 'asc' },
    'name-asc': { name: 'asc' },
    'name-desc': { name: 'desc' },
    'rating-asc': { rating: 'asc' },
    'rating-desc': { rating: 'desc' },
    category: { category: 'asc' },
    location: { location: 'asc' }
  }

  Restaurants.find()
    .lean()
    .sort(filterData[sort])
    .then(restaurantList => res.render('index', { restaurantList, sort }))
    .catch(error => console.log(error))
})


module.exports = router