const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
const port = 3000

require('./config/mongoose')

const router = require('./routes')


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(router)

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    equal: (a, b) => {
      if (a === b) return 'selected'
    }
  }
}))
app.set('view engine', 'handlebars')

//監聽伺服器
app.listen(port, () => {
  console.log(`The server is running on localhost:${port}`)
})