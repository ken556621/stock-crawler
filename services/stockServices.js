const db = require("../models");
const StockDb = db.Stock;
const NewsDb = db.News;
const PricevolumeDb = db.priceVolume;
const IndustryVolumnDb = db.IndustryVolumn;

const stockServices = {
    setStocksInfo: (req, res, callback) => {
        const {
            stockId,
            ceo,
            website,
            startTime,
            location,
            dividend,
            industory,
            rp,
            equity
        } = req;

        StockDb.create({
            stockId,
            ceo,
            website,
            startTime,
            location,
            dividend,
            industory,
            rp,
            equity
        })
    },
    getInfo: (req, res, callback) => {
        return StockDb.findAll({
            raw: true,
            nest: true
        })
            .then(info => {
                callback(info)
            })
            .catch(error => console.log(error))
    },
    setDailyNews: (req, res, callback) => {
        const {
            stockId,
            title,
            source,
            beforeTime
        } = req;

        NewsDb.create({
            stockId,
            title,
            source,
            beforeTime
        })
    },
    getDailyNews: (req, res, callback) => {
        return NewsDb.findAll({
            raw: true,
            nest: true
        })
            .then(news => {
                callback(news)
            })
            .catch(error => console.log(error))
    },
    setStockPriceVolume: (req, res, callback) => {
        const {
            stockId,
            date,
            openPrice,
            top,
            low,
            closePrice,
            spread,
            percentage,
            volume,
            dealPrice,
            pe
        } = req;

        PricevolumeDb.create({
            stockId,
            date,
            openPrice,
            top,
            low,
            closePrice,
            spread,
            percentage,
            volume,
            dealPrice,
            pe
        })
    },
    getPriceVolume: (req, res, callback) => {
        return PriceVolumeDb.findAll({
            raw: true,
            nest: true
        })
            .then(news => {
                callback(news)
            })
            .catch(error => console.log(error))
    },
    setIndustryVolume: (req, res, callback) => {
        const {
            stockId,
            name,
            tradingVolume,
            percentage,
            dataSourceDate
        } = req;

        IndustryVolumnDb.create({
            stockId,
            name,
            tradingVolume,
            percentage,
            dataSourceDate
        })
    },
    getIndustryVolume: (req, res, callback) => {
        return IndustryVolumnDb.findAll({
            raw: true,
            nest: true
        })
            .then(industry => {
                callback(industry)
            })
            .catch(error => console.log(error))
    },
}

module.exports = stockServices