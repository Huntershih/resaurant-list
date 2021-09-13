const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000
const shops = require('./restaurant.json')

app.use(express.static('public'))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/shop/:id', (req, res) => {
  const shop = shops.results.find(shop => shop.id === Number(req.params.id))
  res.render('show', { shopList: shop })
})

app.get('/', (req, res) => {
  res.render('index', { shopList: shops.results })
})

app.get('/restaurant/search', (req, res) => {
  const keywords = req.query.keywords
  const keywordsToLowerCase = keywords.toLowerCase()
  const search = shops.results.filter((shop) => {
    return shop.name.toLowerCase().includes(keywordsToLowerCase) || shop.category.toLowerCase().includes(keywordsToLowerCase)
  })
  res.render('index', { shopList: search, record: keywords })
})


app.listen(port, () => {
  console.log(`The server is running on localhost:${port}`)
})