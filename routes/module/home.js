const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurants.find()
    .lean()
    .then(restaurantList => res.render('index', { restaurantList }))
    .catch(error => console.log(error))
})


module.exports = router