const express = require("express")
const router = express.Router()

const infoController = require("../controllers/apis/stockController")
const newsController = require("../controllers/apis/newsController");


// Info
router.get("/stock/info", infoController.getInfo)

// News
router.get("/stock/news", newsController.getNews)


module.exports = router