const db = require("../models");
const StockDb = db.Stock;
const NewsDb = db.News;

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
    }
}

module.exports = stockServices