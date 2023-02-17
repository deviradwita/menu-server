
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  }
const express = require("express");
const app = express();
const cors = require('cors')


const port = process.env.PORT || 3000;
const Controller = require("./controllers/controller");
const errorHandler = require("./middleware/errorHandler");
const { Food, User, Category } = require("./models");
const router = require("./routes");

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
