const express = require('express')
const router = express.Router()
const home = require('./module/home')
const restaurants = require('./module/restaurants')

router.use('/', home)
router.use('/restaurants', restaurants)

module.exports = router