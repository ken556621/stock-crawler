const express = require("express")
const router = express.Router()

const newsController = require("../controllers/apis/newsController");
const userController = require("../controllers/apis/userController");
const stockController = require("../controllers/apis/stockController");


// News
router.get("/stock/news", newsController.getNews)




// User Preference
router.post("/stock/favarite", userController.saveFavariteList)




// Volume rank
router.get("/stock/volume-rank", stockController.getVolumeRank)

// Industry volume
router.get("/stock/industry-volume", stockController.getIndustryVolume)

// Get industry list
router.post("/stock/industry-list", stockController.getIndustryList)

// Get all gross margin
router.get("/stock/all-gross-margin", stockController.getAllGrossMargin)

// Get all price earn ratio
router.get("/stock/all-price-earn-ratio", stockController.getAllPriceEarnRatio)

// Company Detail
router.post("/stock/company-detail", stockController.getCompanyDetail)

// Stock this year all month price and volumn
router.post("/stock/price-volumn-year", stockController.getMonthlyPriceAndVolumn)

// Stock serveral years price and volumn
router.post("/stock/price-volumn-multi-year", stockController.getYearlyPriceAndVolumn)

// Stock info, name, id, industry category
router.get("/stock/info", stockController.getAllStocksInfo)


module.exports = router