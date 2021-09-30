const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

require('./config/mongoose')

const router = require('./routes')


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(router)

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//監聽伺服器
app.listen(port, () => {
  console.log(`The server is running on localhost:${port}`)
})