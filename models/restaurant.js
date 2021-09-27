const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  id: {
    type: "Number",
    required: true
  }, name: {
    type: 'string',
    required: true
  }, name_en: {
    type: 'string',
    required: true
  }, category: {
    type: 'string',
    required: true
  }, image: {
    type: 'string',
    required: true
  }, location: {
    type: 'string',
    required: true
  }, phone: {
    type: 'string',
    required: true
  }, google_map: {
    type: 'string',
    required: true
  }, rating: {
    type: 'number',
    required: true
  }, description: {
    type: 'string',
    required: true
  }
})

module.exports = mongoose.exports('restaurants', restaurantSchema)
