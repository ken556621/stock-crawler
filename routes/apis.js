const express = require("express")
const router = express.Router()

const newsController = require("../controllers/apis/newsController");
const userController = require("../controllers/apis/userController");
const stockController = require("../controllers/apis/stockController");



// 整體

// 即時新聞
router.get("/stock/news", newsController.getNews)


// 使用者相關

// 使用者自選股紀錄
router.post("/stock/favarite", userController.saveFavariteList)


// 多個資訊

// 所有股票名稱 代碼 產業資料
router.get("/stock/info", stockController.getAllStocksInfo)

// 所有類股成交量
router.get("/stock/industry-volume", stockController.getIndustryVolume)

// 所有類股資訊
router.post("/stock/industry-list", stockController.getIndustryList)

// 所有股票毛利率
router.get("/stock/all-gross-margin", stockController.getAllGrossMargin)

// 所有股票本益比
router.get("/stock/all-price-earn-ratio", stockController.getAllPriceEarnRatio)


// 個別資訊

// 個股成交量排行
router.get("/stock/volume-rank", stockController.getVolumeRank)

// 個別公司資訊
router.post("/stock/company-detail", stockController.getCompanyDetail)

// 個股多月成交量與成交價
router.post("/stock/price-volumn-year", stockController.getMonthlyPriceAndVolumn)

// 個股多年成交量與成交價
router.post("/stock/price-volumn-multi-year", stockController.getYearlyPriceAndVolumn)

// 個股新聞
router.get("/stock/info", stockController.getAllStocksInfo)


module.exports = router