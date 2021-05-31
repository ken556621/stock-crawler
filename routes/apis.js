const express = require("express")
const router = express.Router()

const newsController = require("../controllers/apis/newsController");
const priceVolumeController = require("../controllers/apis/priceVolumeController");
const userController = require("../controllers/apis/userController");
const stockController = require("../controllers/apis/stockController");


// Info
router.get("/stock/info", stockController.getInfo)

// News
router.get("/stock/news", newsController.getNews)

// Price and Volume
router.get("/stock/price-volume", priceVolumeController.getPriceVolume)

// User Preference
router.post("/stock/favarite", userController.saveFavariteList)

// Volume Rank
router.get("/stock/volume-rank", stockController.getVolumeRank)

// Industry Volume
router.get("/stock/industry-volume", stockController.getIndustryVolume)

// Company Detail
router.get("/stock/company-detail", stockController.getCompanyDetail)


module.exports = router