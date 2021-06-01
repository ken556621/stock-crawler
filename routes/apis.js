const express = require("express")
const router = express.Router()

const newsController = require("../controllers/apis/newsController");
const userController = require("../controllers/apis/userController");
const stockController = require("../controllers/apis/stockController");


// News
router.get("/stock/news", newsController.getNews)




// User Preference
router.post("/stock/favarite", userController.saveFavariteList)




// Volume Rank
router.get("/stock/volume-rank", stockController.getVolumeRank)

// Industry Volume
router.get("/stock/industry-volume", stockController.getIndustryVolume)

// Company Detail
router.post("/stock/company-detail", stockController.getCompanyDetail)

// Stock this year price and volumn
router.post("/stock/price-volumn-year", stockController.getYearlyPriceAndVolumn)


module.exports = router