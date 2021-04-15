const db = require("../models");
const StockDb = db.Stock;
const NewsDb = db.News;

const stockServices = {
    setStocks: (req, res, callback) => {
        StockDb.create({
            stockId: req.stockId,
            name: "test",
            industory: "test Industory"
        })
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