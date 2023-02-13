const express = require('express')
const app = express()
const port = 3000
const Controller = require('./controllers/controller')
const {Food, User, Category} = require('./models')


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.post('/foods', Controller.createFood)
app.get('/foods', Controller.showAllFoods)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})