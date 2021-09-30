const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurants = require('./models/restaurant')
const app = express()
const port = 3000

const router = require('./routes')

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
app.use(router)

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')




//監聽伺服器
app.listen(port, () => {
  console.log(`The server is running on localhost:${port}`)
})