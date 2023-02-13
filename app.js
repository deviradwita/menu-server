const express = require('express')
const app = express()
const port = 3000
const Controller = require('./controllers/controller')
const {Food, User, Category} = require('./models')
const router = require('./routes')


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(router);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})