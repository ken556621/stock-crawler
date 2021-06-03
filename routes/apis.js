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

// Company Detail
router.post("/stock/company-detail", stockController.getCompanyDetail)

// Stock this year price and volumn
router.post("/stock/price-volumn-year", stockController.getYearlyPriceAndVolumn)


module.exports = router