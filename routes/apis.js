const express = require("express")
const router = express.Router()

const infoController = require("../controllers/apis/stockController");
const newsController = require("../controllers/apis/newsController");
const priceVolumeController = require("../controllers/apis/priceVolumeController");


// Info
router.get("/stock/info", infoController.getInfo)

// News
router.get("/stock/news", newsController.getNews)

// Price and Volume
router.get("/stock/price-volume", priceVolumeController.getPriceVolume)

module.exports = router