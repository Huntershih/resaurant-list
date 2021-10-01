const express = require('express')
const router = express.Router()
const Restaurants = require('../../models/restaurant')

//新增資料頁面
router.get('/new', (req, res) => {
  res.render('new')
})

//取得搜尋頁面
router.get('/search', (req, res) => {
  const keywords = req.query.keywords

  console.log(keywords)
  return Restaurants.find({ $or: [{ name: { $regex: keywords } }, { category: { $regex: keywords } }] })
    .lean()
    .then(restaurantList => res.render('index', { restaurantList, record: keywords }))
    .catch(error => console.log(error))
})

//取得指定資料頁面
router.get('/:id', (req, res) => {
  const id = req.params.id

  return Restaurants.findById(id)
    .lean()
    .then(restaurantList => res.render('show', { restaurantList }))
    .catch(error => console.log(error))
})

//取得編輯頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurants.findById(id)
    .lean()
    .then(restaurantList => res.render('edit', { restaurantList }))
    .catch(error => console.log(error))
})

//更新編輯資料
router.put('/:id', (req, res) => {
  const id = req.params.id
  const data = req.body

  return Restaurants.findById(id)
    .then((restaurantList) => {
      for (const [key, value] of Object.entries(data)) {
        restaurantList[key] = value
      }
      return restaurantList.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//新增一筆資料
router.post('/', (req, res) => {

  const data = req.body

  Restaurants.create(data)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//刪除一筆資料
router.delete('/:id', (req, res) => {

  const id = req.params.id

  return Restaurants.findById(id)
    .then(restaurantList => restaurantList.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})


module.exports = router