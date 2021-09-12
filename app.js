const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000
const shops = require('./restaurant.json')

app.use(express.static('public'))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/shop/:id', (req, res) => {
  const shop = shops.results.filter(shop => shop.id === Number(req.params.id))
  res.render('show', { shopList: shop[0] })
})

app.get('/', (req, res) => {
  res.render('index', { shopList: shops.results })
})

app.get('/search', (req, res) => {
  const search = shops.results.filter((shop) => {
    return shop.name.toLowerCase().includes(req.query.keywords.toLowerCase()) || shop.category.toLowerCase().includes(req.query.keywords.toLowerCase())
  })
  res.render('index', { shopList: search, record: req.query.keywords })
})


app.listen(port, () => {
  console.log(`The server is running on localhost:${port}`)
})