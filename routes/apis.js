const express = require("express")
const router = express.Router()

const infoController = require("../controllers/apis/stockController");
const newsController = require("../controllers/apis/newsController");
const priceVolumeController = require("../controllers/apis/priceVolumeController");
const userController = require("../controllers/apis/userController");
const stockController = require("../controllers/apis/stockController");


// Info
router.get("/stock/info", infoController.getInfo)

// News
router.get("/stock/news", newsController.getNews)

// Price and Volume
router.get("/stock/price-volume", priceVolumeController.getPriceVolume)

// User Preference
router.post("/stock/favarite", userController.saveFavariteList)

// Volume Rank
router.get("/stock/volume-rank", stockController.getVolumeRank)


module.exports = router